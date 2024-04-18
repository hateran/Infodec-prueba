import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TranslateService, TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  public constructor(private readonly translate: TranslateService) {
    this.translate.setDefaultLang("es");
    this.translate.use("es");
  }

  public changeLanguage(): void {
    const lang = this.translate.currentLang;
    this.translate.use(lang === "es" ? "de" : "es");
  }
}
