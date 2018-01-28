
import {TestSample} from "./test-sample.model";
import {Mood} from "./mood";

export interface TestSession {

    _id: string;
    clientId: number;

    patientId: string;

    testNumber: number;
    level: number;

    startTime: number;
    samples: Array<TestSample>;

    sampleCount: number;
    correctCount: number;
    incorrectCount: number;
    percentCorrect: string;

    averageResponseMilli: number;
    averageResponseSeconds: string;

    active: Mood;
    afraid: Mood;

    moods: Array<any>;


}
