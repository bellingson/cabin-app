
import {TestSample} from "./test-sample.model";

export class TestSession {

    startTime: number;
    samples: Array<TestSample>;

    sampleCount: number;
    correctCount: number;
    incorrectCount: number;
    percentCorrect: string;

    averageResponseSeconds: string;
    
}