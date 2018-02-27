
import {Subject} from "rxjs/Subject";

export function rxErrorHandler(response: Subject<any>) : any {
  return err => {
    response.error(err);
    response.complete();
  }
}
