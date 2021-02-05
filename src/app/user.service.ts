import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class UserService {
  canImpersonate: BehaviorSubject<boolean> = new BehaviorSubject(false);

  changeCanImpersonate() {
    this.canImpersonate.next(!this.canImpersonate.getValue());
  }

  canImpersonator(): boolean {
    return this.canImpersonate.getValue();
  }
}
