import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: "app-slider",
    templateUrl: "./slider.component.html",
    styleUrls: ["./slider.component.scss"]
})
export class SliderComponent {

    @Input() name: string;
    @Input() value: boolean;
    @Input() disable: boolean;
    @Input() onlyTrue: boolean;
    @Output() slide: EventEmitter<boolean> = new EventEmitter();

    constructor() {
    }

    click(event: any) {
        if (this.onlyTrue && !event.srcElement.checked) {
            event.preventDefault();
        } else {
            this.slide.emit(event.srcElement.checked)
        }
    }

}
