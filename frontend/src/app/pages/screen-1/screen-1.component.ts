import { Component } from "@angular/core";

@Component({
  selector: "app-screen-1",
  templateUrl: "./screen-1.component.html",
  styleUrl: "./screen-1.component.scss",
})
export class Screen1Component {
  public selectedCity: unknown;

  public get cities(): unknown[] {
    return [
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" },
    ];
  }
}
