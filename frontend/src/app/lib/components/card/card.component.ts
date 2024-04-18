import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-card",
  imports: [CommonModule],
  templateUrl: "./card.component.html",
  standalone: true,
})
export class CardComponent {
  @Input() public containerClass: string = "";

  @Input() public childContainerClass: string = "";
}
