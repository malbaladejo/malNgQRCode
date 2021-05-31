import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective {

  @Input() duration: number = 500;

  @Output() onLongPress: EventEmitter<any> = new EventEmitter();
  @Output() onLongPressing: EventEmitter<any> = new EventEmitter();
  @Output() onLongPressEnd: EventEmitter<any> = new EventEmitter();

  private pressing: boolean;
  private longPressing: boolean;
  private timeout: any;
  private mouseX = 0;
  private mouseY = 0;

  @HostBinding('class.press')
  get press() { return this.pressing; }

  @HostBinding('class.longpress')
  get longPress() { return this.longPressing; }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    console.debug('mousedown');

    // don't do right/middle clicks
    if (event.which !== 1) return;
    this.capture(event);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event) {
    console.debug('touchstart');
    this.capture(event);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {
    console.debug('mousemove');
    this.release(event);
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event) {
    console.debug('touchend');
    this.release(event);
  }

  private capture(event) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.pressing = true;
    this.longPressing = false;

    this.timeout = setTimeout(() => {
      this.longPressing = true;
      this.onLongPress.emit(event);
      this.loop(event);
    }, this.duration);

    this.loop(event);
  }

  private release(event) {
    if (this.pressing && !this.longPressing) {
      const xThres = (event.clientX - this.mouseX) > 10;
      const yThres = (event.clientY - this.mouseY) > 10;
      if (xThres || yThres) {
        this.endPress();
      }
    }
  }

  loop(event) {
    if (this.longPressing) {
      this.timeout = setTimeout(() => {
        this.onLongPressing.emit(event);
        this.loop(event);
      }, 50);
    }
  }

  endPress() {
    clearTimeout(this.timeout);
    this.longPressing = false;
    this.pressing = false;
    this.onLongPressEnd.emit(true);
  }

  @HostListener('mouseup')
  onMouseUp() { this.endPress(); }

}
