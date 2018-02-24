
import {FaceTestDao} from "./face-test-dao.service";
import {GenericDao} from "./generic-dao.service";

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/observable/forkJoin';

import * as moment from 'moment';
import * as _ from 'lodash';
import {Level, Participant} from "../model/participant.model";


const participantCollection = 'participant';

export class ParticipantDao extends GenericDao {

  faceTestDao = new FaceTestDao()


  create(participantId: string, start?: any) : Participant {

     const startTime = moment(start);
     startTime.day('Monday');

     const now = moment();
     if(now.isAfter(startTime)) {
       startTime.add(7, 'days');
     }

     const endTime = moment(startTime.toDate());
     endTime.add(6, 'weeks');
     endTime.day('Sunday');
     endTime.hour(23);
     endTime.minute(59);
     endTime.second(59);

    console.log('start: ' + startTime.format('LLLL MM/DD/YYYY') + ' end: ' + endTime.format('LLLL MM/DD/YYYY'));

     const participant: Participant = {
                                participantId: participantId,
                                created: Date.now(),
                                startTime: startTime.toDate().getTime(),
                                endTime: endTime.toDate().getTime(),
                                level: 1,
                                levels: [],
                                lastSessionTime: null,
                                sessionCount: 0,
                                sessionsMissing: 0,
                                sessionsToday: 0
                                };

     participant.levels = _.map(_.range(0, 6), i => {

       let levelStartTime = moment(startTime).add(i,'week');
       levelStartTime.day('Monday');
       levelStartTime.hour(0);
       levelStartTime.minute(0);
       levelStartTime.second(1);

       let levelEndTime = moment(levelStartTime.toDate());
       levelEndTime.add(6,'days');
       levelEndTime.hour(23);
       levelEndTime.minute(59);
       levelEndTime.second(59);

       // console.log('end: ' + levelEndTime.format('LLLL MM/DD/YYYY hh:mm a'));
       // console.log('level' + i + ': ' + levelStartTime.format('LLLL MM/DD/YYYY hh:mm a') + ' -> ' + levelEndTime.format('LLLL MM/DD/YYYY hh:mm a'));

       return { level: (i + 1),
                startTime: levelStartTime.toDate().getTime(),
                endTime: levelEndTime.toDate().getTime(),
                sessionCount: 0,
                sessionsToDo: 6,
                sessionsMissing: null } as Level;
     });

     return participant;
  }

  query() : Observable<Array<Participant>> {
    return super.query(participantCollection, {});
  }

  get(id: string) : Observable<any> {

    return super.get(participantCollection, id);

  }

  findByParticipantId(participantId: string) : Observable<Participant> {

    const response = new Subject<any>();

    super.query(participantCollection, { participantId: participantId})
      .subscribe(data => {

        if(data.length == 0) {
          response.next(null);
          response.complete();
          return;
        }

        response.next(data[0]);
        response.complete();
      }, err => {
        console.log(err);
        response.error(err);
        response.complete();
      });


    return response;

  }


  save(participant: any) : Observable<boolean> {

     if(participant._id) {
       return super.save(participantCollection, participant);
     } else {
       return super.insertOne(participantCollection, participant);
     }

  }

  updateParticipantStats(participantId: string) : Observable<boolean> {

    const response = new Subject<boolean>();
    const handleError = err => {
      response.error(err);
      response.complete();
    };

    Observable.forkJoin(
      this.findByParticipantId(participantId),
      this.faceTestDao.sessionSummary(participantId)
    ).subscribe(data => {
      const participant = data[0];
      const sessions = data[1];

      // console.log('got participant');
      // console.log(participant);

      this.formatParticipantStats(participant, sessions);

      this.save(participant).subscribe(r => {
        response.next(true);
        response.complete();
      }, handleError);

    }, handleError);

    return response;
  }

  private formatParticipantStats(participant: Participant, sessions: Array<any>) {

    this.updateLevel(participant, sessions);

    const lastSession = _.maxBy(sessions, 'startTime');
    if(lastSession) {
      participant.lastSessionTime = lastSession.startTime;
    }

    participant.sessionCount = sessions.length;

    const byLevel = _.groupBy(sessions,'level');
    for(let level in byLevel) {
      let sessionsByLevel = byLevel[level];
      let _level: Level = _.find(participant.levels,{ level: +level });
      if(_level) {
        _level.sessionCount = sessionsByLevel.length;
      }
    }

    _.each(participant.levels, level => {

       if(this.isPast(level) == false) {
         level.sessionsMissing = 0;
       } else {
         level.sessionsMissing = 6 - level.sessionCount;
       }

      level.sessionsToDo = level.sessionCount >= 6 ? 0 : (6 - level.sessionCount);
    });

    participant.sessionsMissing = _(participant.levels).map('sessionsMissing').sum();

    participant.sessionsToday = _.filter(sessions, session => this.isToday(session.startTime)).length;

    // console.log('today: ' + participant.sessionsToday);

  }

  private updateLevel(participant: any, sessions: Array<any>) {

    if(participant.startTime == null) {
      const firstSession = _.minBy(sessions, 'startTime');
      participant.startTime = firstSession ? firstSession.startTime : Date.now();
    }

    participant.level = this.calculateLevel(participant);

  }

  private calculateLevel(participant: any) : number {
    return moment().diff(moment(participant.startTime),'weeks') + 1;
  }

  isPast(level: any) : boolean {

    let now = Date.now();
    return level.endTime < now;
  }

  isCurrent(level: any) : boolean {

    let now = Date.now();
    return now >= level.startTime && now <= level.endTime
  }

  isFuture(level: any) : boolean {

    let now = Date.now();
    return level.startTime > now;
  }

  isToday(time: number) {
    return moment(time).format('MM/DD/YYYY') == moment().format('MM/DD/YYYY');
  }

  startOfDay(time: number) : number {
    let _start = moment(time);
    _start.hour(0);
    _start.minute(0);
    _start.second(0);
    return _start.toDate().getTime();
  }

  endOfDay(time: number) : number {
    let _end = moment(time);
    _end.hour(23);
    _end.minute(59);
    _end.second(59);
    return _end.toDate().getTime();
  }



}
