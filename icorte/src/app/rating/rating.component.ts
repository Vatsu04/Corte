import { Component, Input, EventEmitter, Output } from "@angular/core";

enum COLORS {
  GREY = "#E0E0E0",
  GREEN = "#76FF03",
  YELLOW = "#FFCA28",
  RED = "#DD2C00"
}

@Component({
  selector: "rating",
  template: `
    <div class="rating">
      <span
        class="star"
        [ngStyle]="{ 'background-color': getColor(i) }"
        *ngFor="let _ of [1, 2, 3, 4, 5]; let i = index"
        (click)="rate(i + 1)"
      ></span>
    </div>
  `,
  styleUrls: ["rating.component.scss"]
})
export class RatingComponent {
  @Input() rating: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.rating = 0;
  }

  rate(index: number) {
    this.rating = index;
    this.ratingChange.emit(this.rating);
  }

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return COLORS.GREY;
    }

    switch (this.rating) {
      case 1:
      case 2:
        return COLORS.RED;
      case 3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY;
    }
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }
}