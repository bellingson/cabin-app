export interface User {

  participantId: string;
  pin: string;

  controlVersion: boolean;
  restrictSessions: boolean;

  startTime: number;
  level: number;

  admin: boolean;

  token: string;

}
