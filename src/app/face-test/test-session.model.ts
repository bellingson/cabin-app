
import {TestSample} from "./test-sample.model";
import {Mood} from "./mood";

export class TestSession {

    level: number;

    startTime: number;
    samples: Array<TestSample>;

    sampleCount: number;
    correctCount: number;
    incorrectCount: number;
    percentCorrect: string;

    averageResponseSeconds: string;

    active: Mood;
    afraid: Mood;

}
