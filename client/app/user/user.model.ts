export interface User {

  patientId: string;
  pin: string;

  controlVersion: boolean;

  startTime: number;
  level: number;

  admin: boolean;

  token: string;

}
