export enum TimeClass {
  FAST,
  OK,
  TOO_SLOW
}

export class TestSample {

    ordinal: number;
    correct: boolean;
    time: number;
    timeClass: TimeClass;
    startTime: number;
    showDotOnNeutralFace: boolean;

}
