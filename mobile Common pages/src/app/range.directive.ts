import { Directive, ElementRef, OnInit, Renderer2, Input } from "@angular/core";

@Directive({
  selector: "[multiHandleRangeSlider]"
})
export class RangeSlideDirective implements OnInit {
  @Input("defaultValues") defaultValues;
  @Input("relevantValues") relevantValues;

  position_min = 0;
  position_max = 0;
  currentValue = 0;
  _defaultValues = { min: 0, max: 10000000  };
  _relevantValues = { min: 0, max: 10000000  };

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const slider = this.renderer.createElement("div");
    this.renderer.addClass(slider, "slider");

    const track = this.renderer.createElement("div");
    this.renderer.addClass(track, "track");
    this.renderer.setAttribute(track, "default-min", this.defaultValues.min);
    this.renderer.setAttribute(track, "default-max", this.defaultValues.max);

    const range = this.renderer.createElement("div");
    this.renderer.addClass(range, "range");

    const relevant_range = this.renderer.createElement("div");
    this.renderer.addClass(relevant_range, "relevant-range");
    this.renderer.setAttribute(
      relevant_range,
      "relevant-min",
      this.relevantValues.min
    );
    this.renderer.setAttribute(
      relevant_range,
      "relevant-max",
      this.relevantValues.max
    );
    var percent_relevant_left =
      ((this.relevantValues.min - this.defaultValues.min) /
        (this.defaultValues.max - this.defaultValues.min)) *
      100;
    relevant_range.style.left = percent_relevant_left + "%";

    var percent_relevant_right =
      ((this.defaultValues.max - this.relevantValues.max) /
        (this.defaultValues.max - this.defaultValues.min)) *
      100;
    relevant_range.style.right = percent_relevant_right + "%";

    const thumb_left = this.renderer.createElement("div");
    this.renderer.addClass(thumb_left, "thumb");
    this.renderer.addClass(thumb_left, "left");
    this.renderer.setAttribute(
      thumb_left,
      "data-min",
      this.relevantValues.min
    );
    var percent_left =
      ((this.relevantValues.min - this.defaultValues.min) /
        (this.defaultValues.max - this.defaultValues.min)) *
      100;
    thumb_left.style.left = percent_left + "%";
    range.style.left = percent_left + "%";

    const thumb_right = this.renderer.createElement("div");
    this.renderer.addClass(thumb_right, "thumb");
    this.renderer.addClass(thumb_right, "right");
    this.renderer.setAttribute(
      thumb_right,
      "data-max",
      this.relevantValues.max
    );
    var percent_right =
      ((this.relevantValues.max - this.defaultValues.min) /
        (this.defaultValues.max - this.defaultValues.min)) *
      100;
    thumb_right.style.right = 100 - percent_right + "%";
    range.style.right = 100 - percent_right + "%";

    this.renderer.appendChild(slider, track);
    this.renderer.appendChild(slider, range);
    this.renderer.appendChild(slider, relevant_range);
    this.renderer.appendChild(slider, thumb_left);
    this.renderer.appendChild(slider, thumb_right);

    const range_left = this.renderer.createElement("input");
    this.renderer.setAttribute(range_left, "type", "range");
    this.renderer.setAttribute(range_left, "min", this.defaultValues.min);
    this.renderer.setAttribute(range_left, "max", this.defaultValues.max);
    this.renderer.setAttribute(range_left, "step", "1");
    this.renderer.addClass(range_left, "input-left");
    this.renderer.setAttribute(
      range_left,
      "value",
      this.relevantValues.min
    );

    const range_right = this.renderer.createElement("input");
    this.renderer.setAttribute(range_right, "type", "range");
    this.renderer.setAttribute(range_right, "min", this.defaultValues.min);
    this.renderer.setAttribute(range_right, "max", this.defaultValues.max);
    this.renderer.setAttribute(range_right, "step", "1");
    this.renderer.addClass(range_right, "input-right");
    this.renderer.setAttribute(
      range_right,
      "value",
      this.relevantValues.max
    );

    this.elementRef.nativeElement.style = "display:none";
    this.renderer.appendChild(
      this.renderer.parentNode(this.elementRef.nativeElement),
      range_left
    );
    this.renderer.appendChild(
      this.renderer.parentNode(this.elementRef.nativeElement),
      range_right
    );
    this.renderer.appendChild(
      this.renderer.parentNode(this.elementRef.nativeElement),
      slider
    );

    this.renderer.listen(range_left, "input", event => {
      thumb_right.style.zIndex = 4;
      thumb_left.style.zIndex = 5;
      range_right.style.zIndex = 4;
      range_left.style.zIndex = 5;

      let min = +event.target.min;
      let max = +event.target.max;
      let position = +event.target.value;

      if (position > range_right.value) {
        var percent = ((range_right.value - min) / (max - min)) * 100;
        thumb_left.style.left = percent + "%";
        range.style.left = percent + "%";
        range_left.value = range_right.value;
        event.preventDefault();
        return false;
      }

      if (position < this.relevantValues.min) {
        var percent = ((this.relevantValues.min - min) / (max - min)) * 100;
        thumb_left.style.left = percent + "%";
        range.style.left = percent + "%";
        range_left.value = this.relevantValues.min;
        event.preventDefault();
        return false;
      }

      thumb_left.setAttribute("data-min", +event.target.value);
      var percent = ((position - min) / (max - min)) * 100;
      thumb_left.style.left = percent + "%";
      range.style.left = percent + "%";
      
    });

    this.renderer.listen(range_right, "input", event => {
      thumb_left.style.zIndex = 4;
      thumb_right.style.zIndex = 5;
      range_left.style.zIndex = 4;
      range_right.style.zIndex = 5;

      let min = +event.target.min;
      let max = +event.target.max;
      let position = +event.target.value;

      if (position < range_left.value) {
        var percent = ((range_left.value - min) / (max - min)) * 100;
        thumb_right.style.right = 100 - percent + "%";
        range.style.right = 100 - percent + "%";
        range_right.value = range_left.value;
        event.preventDefault();
        return false;
      }

      if (position > this.relevantValues.max) {
        var percent = ((this.relevantValues.max - min) / (max - min)) * 100;
        thumb_right.style.right = 100 - percent + "%";
        range.style.right = 100 - percent + "%";
        range_right.value = this.relevantValues.max;
        event.preventDefault();
        return false;
      }

      thumb_right.setAttribute("data-max", +event.target.value);
      var percent = ((position - min) / (max - min)) * 100;
      thumb_right.style.right = 100 - percent + "%";
      range.style.right = 100 - percent + "%";
      

    });
  }
}
