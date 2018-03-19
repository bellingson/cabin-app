
import {TestSample} from "./test-sample.model";
import {Mood} from "./mood";

export interface TestSession {

    _id: string;
    clientId: number;

    participantId: string;

    controlVersion: boolean;

    testNumber: number;
    level: number;

    stimuli: string;

    startTime: number;
    samples: Array<TestSample>;

    sampleCount: number;
    correctCount: number;
    incorrectCount: number;
    percentCorrect: string;

    averageResponseMilli: number;
    averageResponseSeconds: string;

    moods: Array<any>;

    uploadComplete: boolean;


}
