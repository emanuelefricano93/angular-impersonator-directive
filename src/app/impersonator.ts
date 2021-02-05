import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";
import { UserService } from "./user.service";

@Directive({
  selector: "[impersonatorChecker]"
})
export class ImpersonatorCheckerDirective {
  @Input() anotherCondition?: boolean;

  constructor(
    private elRef: ElementRef,
    private userService: UserService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.userService.canImpersonate.subscribe(canImpersonator => {
      if (!canImpersonator && !this.anotherCondition) {
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
    });
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
