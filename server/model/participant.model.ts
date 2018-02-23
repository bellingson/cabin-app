
export interface Participant {

  participantId: string;
  created:  number;
  startTime: number;
  endTime: number;
  level: number;

  lastSessionTime: number;
  sessionCount: number;
  sessionsMissing: number;
  sessionsToday: number;

  levels: Array<Level>;

}

export interface Level {

  level: number;
  startTime: number;
  endTime: number;
  sessionCount: number;
  sessionsToDo: number;
  sessionsMissing: number;
}
