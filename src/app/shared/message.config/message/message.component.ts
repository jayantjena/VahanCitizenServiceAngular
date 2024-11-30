
import { Component, OnInit, Input } from '@angular/core'; 
import { propertiesConfigEN } from '../properties.config.en';
 
@Component({
  selector: 'app-message',
  template: `{{message}}`,
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor() { }

  @Input() message:any;
  @Input() feature:any;

  ngOnInit(): void {
    this.message = this.feature ? propertiesConfigEN[this.feature][this.message] : propertiesConfigEN[this.message];
  }

}