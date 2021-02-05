import { Component, OnDestroy, OnInit, VERSION } from "@angular/core";
import { Subscription } from "rxjs";
import { UserService } from "./user.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  description = "You are in Impersonator mode";
  buttonName = "";
  subscriptions: Subscription[] = [];

  constructor(public userService: UserService) {}
  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.impersonatorAllowed$.subscribe(isAllowed => {
        if (isAllowed) {
          this.buttonName = "prevent operations";
          this.description = "You can do all operations in impersonator mode";
        } else {
          this.buttonName = "allow operations";
          this.description =
            "You cannot do some operation in impersonator mode";
        }
      })
    );
  }

  changeMode() {
    this.userService.changeimpersonatorAllowed();
  }

  onClick(num: number) {
    console.log("Clicked on button: " + num);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
