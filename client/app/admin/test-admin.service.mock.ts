

import {Observable} from "rxjs/Observable";

import 'rxjs/add/observable/of';

import {TestSession} from "../testing/face-test/test-session.model";

import {ReplaySubject} from "rxjs/ReplaySubject";
import {OK} from "../testing/face-test/test.helper.spec";

const testSession = {"_id":"5a91887e1d5a756dffe4462f","clientId":1519487080961,"participantId":"-1","startTime":1519487080961,"level":2,"stimuli":"words","moods":[{"mood":"Active","value":1},{"mood":"Determined","value":1},{"mood":"Attentive","value":1},{"mood":"Inspired","value":1},{"mood":"Alert","value":1},{"mood":"Afraid","value":1},{"mood":"Nervous","value":1},{"mood":"Upset","value":1},{"mood":"Hostile","value":1},{"mood":"Ashamed","value":1}],"samples":[{"ordinal":0,"showDotOnNeutralFace":true,"startTime":1519487087027,"correct":false,"time":291,"timeClass":0},{"ordinal":1,"showDotOnNeutralFace":true,"startTime":1519487089621,"correct":true,"time":730,"timeClass":1},{"ordinal":2,"showDotOnNeutralFace":true,"startTime":1519487092654,"correct":true,"time":667,"timeClass":1},{"ordinal":3,"showDotOnNeutralFace":true,"startTime":1519487095636,"correct":false,"time":413,"timeClass":0},{"ordinal":4,"showDotOnNeutralFace":true,"startTime":1519487098359,"correct":true,"time":465,"timeClass":0},{"ordinal":5,"showDotOnNeutralFace":true,"startTime":1519487101137,"correct":true,"time":285,"timeClass":0}],"sampleCount":6,"correctCount":4,"incorrectCount":2,"percentCorrect":"67","testNumber":17,"averageResponseMilli":475.1666666666667,"averageResponseSeconds":"0.5","ip":"::ffff:127.0.0.1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36"};

const testParticipants = [{"_id":"5a8f25de0a971d202600ee1d","participantId":"-1","created":1519330782983,"startTime":1519676382979,"endTime":1523246399979,"level":1,"levels":[{"level":1,"startTime":1519621201979,"endTime":1520225999979,"sessionCount":6,"sessionsToDo":0,"sessionsMissing":0},{"level":2,"startTime":1520226001979,"endTime":1520827199979,"sessionCount":13,"sessionsToDo":0,"sessionsMissing":0},{"level":3,"startTime":1520827201979,"endTime":1521431999979,"sessionCount":0,"sessionsMissing":0,"sessionsToDo":6},{"level":4,"startTime":1521432001979,"endTime":1522036799979,"sessionCount":0,"sessionsMissing":0,"sessionsToDo":6},{"level":5,"startTime":1522036801979,"endTime":1522641599979,"sessionCount":0,"sessionsMissing":0,"sessionsToDo":6},{"level":6,"startTime":1522641601979,"endTime":1523246399979,"sessionCount":0,"sessionsMissing":0,"sessionsToDo":6}],"lastSessionTime":1519487080961,"sessionCount":19,"sessionsMissing":0,"sessionsToday":13}];
const testParticipant = testParticipants[0];

const testOptions = {"_id":"5a788dcd089dcab0aba0a7fe","timeClass":{"fast":600,"tooSlow":1000},"display":{"showFaces":1000,"hideFaces":300,"showShapes":1000,"timeOut":3000}};

export class TestAdminServiceMock  {

  options = new ReplaySubject<any>();

  get(id: string): Observable<TestSession> {
    return Observable.of(testSession);
  }

  query(findText?: string): Observable<Array<TestSession>> {
    return Observable.of([testSession]);
  }

  delete(testSession: TestSession): Observable<any> {
    return Observable.of(OK);
  }

  patients(): Observable<Array<any>> {
    return Observable.of(testParticipants);
  }

  settings(): Observable<any> {
    return Observable.of(testOptions);
  }

  updateOptions(options: any): Observable<any> {

    this.options.next(testOptions);

    return Observable.of(OK);
  }

  updateParticipantStats(participant: any): Observable<any> {
    return Observable.of(OK);
  }

  updateAllParticipants(): Observable<any> {
    return Observable.of(OK);
  }

}
