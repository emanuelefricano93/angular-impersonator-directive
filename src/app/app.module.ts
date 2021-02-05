import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ImpersonatorCheckerDirective } from "./impersonator";
import { UserService } from "./user.service";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, ImpersonatorCheckerDirective],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
