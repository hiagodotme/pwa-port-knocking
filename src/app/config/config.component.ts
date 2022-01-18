import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PortKnockConfig } from '../services/data.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {
  @Input() config: PortKnockConfig;
  @Output() edit: EventEmitter<PortKnockConfig> = new EventEmitter();
  @Output() remove: EventEmitter<PortKnockConfig> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  editConfig(config: PortKnockConfig) {
    this.edit.emit(config);
  }

  removeConfig(config: PortKnockConfig) {
    this.remove.emit(config);
  }

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }
}
