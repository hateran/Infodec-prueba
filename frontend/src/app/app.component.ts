import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { MenuComponent } from "./components";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, TranslateModule, MenuComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  public isOpened = false;

  public constructor(private readonly translate: TranslateService) {
    this.translate.addLangs(["es", "de"]);
    this.translate.setDefaultLang("es");
    this.translate.use("es");
  }
}
