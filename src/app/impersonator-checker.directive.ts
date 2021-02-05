import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from "@angular/core";
import { Subscription } from "rxjs";
import { UserService } from "./user.service";

@Directive({
  selector: "[impersonatorChecker]"
})
export class ImpersonatorCheckerDirective implements OnInit, OnDestroy {
  @Input() anotherCondition?: boolean;
  subscriptions: Subscription[] = [];

  constructor(
    private elRef: ElementRef,
    private userService: UserService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.userService.impersonatorAllowed$.subscribe(isImpersonatorAllowed => {
        if (!isImpersonatorAllowed && !this.anotherCondition) {
          this.elRef.nativeElement.style.cursor = "auto";
          this.elRef.nativeElement.style.opacity = "0.5";
          this.renderer.setAttribute(
            this.elRef.nativeElement,
            "disabled",
            "true"
          );
        } else {
          this.elRef.nativeElement.style.cursor = "pointer";
          this.elRef.nativeElement.style.opacity = "1";
          this.renderer.removeAttribute(this.elRef.nativeElement, "disabled");
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /*   @Input("clickEvent") clickEvent;

  @HostListener("click", ["$event, $event.target"])
  onClick(event, targetElement) {
     //this.renderer.addClass(this.elRef.nativeElement, "classe");
      //this.elRef.nativeElement.style.opacity = "0.5";
    if (!this.userService.canImpersonator()) {
      event.stopPropagation();
      event.preventDefault();
      event.cancelBubble = true;
      event.stopImmediatePropagation();
    } else {
      this.clickEvent();
    }
  } */
}
