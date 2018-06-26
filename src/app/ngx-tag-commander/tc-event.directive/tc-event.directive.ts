import { Directive, ElementRef, Input } from '@angular/core';
import { TagCommanderService } from '../tag-commander.service/tag-commander.service';

// usage [tcEvent]
@Directive({
  selector: '[tcEvent]'
})
export class TcEventDirective {
  @Input('tcEvent') event: TcEvent;
  constructor(el: ElementRef, tcService: TagCommanderService) { 
    console.log(event);
    tcService.captureEvent(this.event.label, el, this.event.data);
  }
}
class TcEvent {
  label: string;
  element: Element;
  data: object
  constructor(label: string, el: Element, data: object) {
    this.label = label;
    this.element = el;
    this.data = data;
  }
}
