import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class UserService {
  impersonatorAllowed$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  changeimpersonatorAllowed() {
    this.impersonatorAllowed$.next(!this.impersonatorAllowed$.getValue());
  }

  isImpersonatorAllowed(): boolean {
    return this.impersonatorAllowed$.getValue();
  }
}
