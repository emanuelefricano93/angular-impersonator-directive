import { Component, OnInit, VERSION } from "@angular/core";
import { UserService } from "./user.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "You are in Impersonator mode";
  buttonName = "";

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.canImpersonate.subscribe(res => {
      if (res) {
        this.buttonName = "prevent operations";
        this.name = "You can do all operations in impersonator mode";
      } else {
        this.buttonName = "allow operations";
        this.name = "You cannot do some operation in impersonator mode";
      }
    });
  }

  changeMode() {
    this.userService.changeCanImpersonate();
  }

  onClick(num: number) {
    console.log("Clicked on button: " + num);
  }
}
