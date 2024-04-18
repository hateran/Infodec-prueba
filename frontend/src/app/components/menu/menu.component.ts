import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, ViewChild, inject } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
/* Primeng */
import { SidebarModule } from "primeng/sidebar";
import { OverlayPanel, OverlayPanelModule } from "primeng/overlaypanel";
/* Constants */
import { ILanguage, IMenuOption } from "./interfaces";
import { MENU_OPTIONS } from "./constants";
import { LanguageEnum, MenuOptionsIdEnum } from "./enums";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [CommonModule, TranslateModule, SidebarModule, OverlayPanelModule],
  templateUrl: "./menu.component.html",
  styleUrl: "./menu.component.scss",
})
export class MenuComponent {
  @ViewChild("languageOverlay") private readonly languageOverlay!: OverlayPanel;

  @Input({ required: true }) public isOpened = false;

  @Output() public isOpenedChange = new EventEmitter<boolean>();

  private readonly translate = inject(TranslateService);

  public onHide(): void {
    this.isOpenedChange.emit(false);
  }

  public handleClick({ id, link }: IMenuOption, event: unknown): void {
    switch (id) {
      case MenuOptionsIdEnum.LANGUAGE:
        this.languageOverlay.toggle(event);
        break;
      case MenuOptionsIdEnum.HISTORY:
        //navigate
        break;

      default:
        break;
    }
  }

  public changeLanguage({ language }: ILanguage): void {
    this.translate.use(language);
  }

  public get options(): IMenuOption[] {
    return MENU_OPTIONS;
  }

  public get languages(): ILanguage[] {
    const langs = this.translate.getLangs();
    return langs.map((item) => ({
      language: item,
      flag: LanguageEnum[item.toUpperCase() as keyof typeof LanguageEnum],
    }));
  }

  public get currentLang(): string {
    return this.translate.currentLang;
  }
}
