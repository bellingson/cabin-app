

import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

import {TestSession} from "./test-session.model";

export const testOptions = {"_id":"5a788dcd089dcab0aba0a7fe","timeClass":{"fast":600,"tooSlow":1000},"display":{"showFaces":1000,"hideFaces":300,"showShapes":1000,"timeOut":3000}};

export const testSessionSummaries = [{"_id":"5a8f1382516b381c6d334f44","clientId":1519326055903,"participantId":"-1","startTime":1519326055903,"level":1,"sampleCount":7,"correctCount":7,"incorrectCount":0,"percentCorrect":"100","testNumber":1,"averageResponseMilli":815.4285714285714,"averageResponseSeconds":"0.8"},{"_id":"5a8f1460f2447b1cab8a0342","clientId":1519326055903,"participantId":"-1","startTime":1519326055903,"level":1,"sampleCount":7,"correctCount":7,"incorrectCount":0,"percentCorrect":"100","testNumber":1,"averageResponseMilli":815.4285714285714,"averageResponseSeconds":"0.8"},{"_id":"5a8f147dcf086e1cb1a44cff","clientId":1519326055903,"participantId":"-1","startTime":1519326055903,"level":1,"sampleCount":7,"correctCount":7,"incorrectCount":0,"percentCorrect":"100","testNumber":1,"averageResponseMilli":815.4285714285714,"averageResponseSeconds":"0.8"},{"_id":"5a8f2160972b861eb8b771ae","clientId":1519329609446,"participantId":"-1","startTime":1519329609446,"level":2,"sampleCount":6,"correctCount":6,"incorrectCount":0,"percentCorrect":"100","testNumber":2,"averageResponseMilli":782.6666666666666,"averageResponseSeconds":"0.8"},{"_id":"5a8f21a3972b861eb8b771af","clientId":1519329667887,"participantId":"-1","startTime":1519329667887,"level":2,"sampleCount":8,"correctCount":8,"incorrectCount":0,"percentCorrect":"100","testNumber":3,"averageResponseMilli":923.75,"averageResponseSeconds":"0.9"},{"_id":"5a9072564b01205f6f0d76a0","clientId":1519415872639,"participantId":"-1","startTime":1519415872639,"level":1,"sampleCount":6,"correctCount":6,"incorrectCount":0,"percentCorrect":"100","testNumber":4,"averageResponseMilli":551,"averageResponseSeconds":"0.6"},{"_id":"5a9174214b01205f6f0d76a1","clientId":1519481856428,"participantId":"-1","startTime":1519481856428,"level":1,"stimuli":"faces","sampleCount":8,"correctCount":7,"incorrectCount":1,"percentCorrect":"88","testNumber":5,"averageResponseMilli":828.5,"averageResponseSeconds":"0.8"},{"_id":"5a9174594b01205f6f0d76a2","clientId":1519481916239,"participantId":"-1","startTime":1519481916239,"level":1,"stimuli":"faces","sampleCount":7,"correctCount":7,"incorrectCount":0,"percentCorrect":"100","testNumber":6,"averageResponseMilli":858,"averageResponseSeconds":"0.9"},{"_id":"5a9174944b01205f6f0d76a3","clientId":1519481973479,"participantId":"-1","startTime":1519481973479,"level":2,"stimuli":"words","sampleCount":8,"correctCount":8,"incorrectCount":0,"percentCorrect":"100","testNumber":7,"averageResponseMilli":972.875,"averageResponseSeconds":"1.0"},{"_id":"5a9174c24b01205f6f0d76a4","clientId":1519482029677,"participantId":"-1","startTime":1519482029677,"level":2,"stimuli":"faces","sampleCount":6,"correctCount":6,"incorrectCount":0,"percentCorrect":"100","testNumber":8,"averageResponseMilli":541.1666666666666,"averageResponseSeconds":"0.5"},{"_id":"5a9174eb4b01205f6f0d76a5","clientId":1519482058708,"participantId":"-1","startTime":1519482058708,"level":2,"stimuli":"words","sampleCount":9,"correctCount":9,"incorrectCount":0,"percentCorrect":"100","testNumber":9,"averageResponseMilli":873.7777777777778,"averageResponseSeconds":"0.9"},{"_id":"5a9177db4b01205f6f0d76a6","clientId":1519482820355,"participantId":"-1","startTime":1519482820355,"level":2,"stimuli":"faces","sampleCount":6,"correctCount":5,"incorrectCount":1,"percentCorrect":"83","testNumber":10,"averageResponseMilli":619.6666666666666,"averageResponseSeconds":"0.6"},{"_id":"5a9178244b01205f6f0d76a7","clientId":1519482847449,"participantId":"-1","startTime":1519482847449,"level":2,"stimuli":"words","sampleCount":10,"correctCount":9,"incorrectCount":1,"percentCorrect":"90","testNumber":11,"averageResponseMilli":1113.7,"averageResponseSeconds":"1.1"},{"_id":"5a9178494b01205f6f0d76a8","clientId":1519482920088,"participantId":"-1","startTime":1519482920088,"level":2,"stimuli":"faces","sampleCount":8,"correctCount":5,"incorrectCount":3,"percentCorrect":"63","testNumber":12,"averageResponseMilli":1026.875,"averageResponseSeconds":"1.0"},{"_id":"5a9180d34b01205f6f0d76a9","clientId":1519485122335,"participantId":"-1","startTime":1519485122335,"level":2,"stimuli":"words","sampleCount":6,"correctCount":5,"incorrectCount":1,"percentCorrect":"83","testNumber":13,"averageResponseMilli":609.1666666666666,"averageResponseSeconds":"0.6"},{"_id":"5a91816c4b01205f6f0d76aa","clientId":1519485268056,"participantId":"-1","startTime":1519485268056,"level":2,"stimuli":"faces","sampleCount":8,"correctCount":8,"incorrectCount":0,"percentCorrect":"100","testNumber":14,"averageResponseMilli":708.375,"averageResponseSeconds":"0.7"},{"_id":"5a91824c4b01205f6f0d76ab","clientId":1519485495177,"participantId":"-1","startTime":1519485495177,"level":2,"stimuli":"words","sampleCount":7,"correctCount":7,"incorrectCount":0,"percentCorrect":"100","testNumber":15,"averageResponseMilli":765.7142857142857,"averageResponseSeconds":"0.8"},{"_id":"5a9187eda56b5d6ddb0f5ce5","clientId":1519486933317,"participantId":"-1","startTime":1519486933317,"level":2,"stimuli":"faces","sampleCount":7,"correctCount":6,"incorrectCount":1,"percentCorrect":"86","testNumber":16,"averageResponseMilli":687.8571428571429,"averageResponseSeconds":"0.7"},{"_id":"5a91887e1d5a756dffe4462f","clientId":1519487080961,"participantId":"-1","startTime":1519487080961,"level":2,"stimuli":"words","sampleCount":6,"correctCount":4,"incorrectCount":2,"percentCorrect":"67","testNumber":17,"averageResponseMilli":475.1666666666667,"averageResponseSeconds":"0.5"}] as Array<TestSession>;

export class TestDataServiceMock  {

  fetchSummaries(): Observable<Array<TestSession>> {
    return Observable.of(testSessionSummaries);
  }

  uploadResults(session?: TestSession): Observable<boolean> {
    return Observable.of(true)
  }

  fetchOptions(): Observable<boolean> {

    return Observable.of(true);
  }


}