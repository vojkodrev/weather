import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-field',
  templateUrl: './dashboard-field.component.html',
  styleUrls: ['./dashboard-field.component.scss']
})
export class DashboardFieldComponent implements OnInit {

  @Output() enterPress = new EventEmitter();
  fieldKeyUp(event) {
    if (event.code == "Enter") {
      this.enterPress.emit();
    }
  }
  
  @Output() buttonClick = new EventEmitter();
  buttonClicked() {
    this.buttonClick.emit();
  }
  
  textValue: string;
  @Output() textChange = new EventEmitter<string>();
  set text(item: string) {
      this.textValue = item;
      this.textChange.emit(item);
  }
  @Input() get text() {
      return this.textValue;
  }

  @Input() oiClass: string;
  
  @Input() hasErrors: string;

  @Input() fieldPlaceholder: string;

  constructor() { }

  ngOnInit() {
  }

}
