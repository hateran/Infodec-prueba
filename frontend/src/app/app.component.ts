import { Component, inject } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { StepsModule } from "primeng/steps";
import { MenuComponent } from "./components";
import { MenuItem } from "primeng/api";
import { ROUTES_TO_HIDE_STEPPER } from "./constants";
import { RoutesEnum } from "./enums";
import { StepService } from "./services/step.service";
import { FormService } from "./pages/services/form.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, TranslateModule, StepsModule, MenuComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  public isOpened = false;

  public canBeRendered: boolean = false;

  private readonly formService = inject(FormService);

  public constructor(
    private readonly translate: TranslateService,
    private readonly router: Router,
    private readonly stepService: StepService,
  ) {
    this.translate.addLangs(["es", "de"]);
    this.translate.setDefaultLang("es");
    this.translate.use("es");

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.canBeRendered = Boolean(!ROUTES_TO_HIDE_STEPPER.includes(event.url.split("/")[1] as RoutesEnum));
      }
    });
  }

  public get items(): MenuItem[] {
    return this.stepService.items;
  }
}
