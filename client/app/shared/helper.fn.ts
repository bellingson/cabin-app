
import {Subject} from 'rxjs';

export function rxErrorHandler(response: Subject<any>) : any {
  return err => {
    response.error(err);
    response.complete();
  }
}
