export interface User {

  _id: string;
  participantId: string;

  controlVersion: boolean;
  restrictSessions: boolean;

  startTime: number;
  endTime: number;

  level: number;

  admin: boolean;

}

