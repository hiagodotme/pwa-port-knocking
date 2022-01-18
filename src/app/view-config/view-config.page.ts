import { PortKnockConfig, PortKnockSecret } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-view-config',
  templateUrl: './view-config.page.html',
  styleUrls: ['./view-config.page.scss'],
})
export class ViewConfigPage implements OnInit {
  public config: PortKnockConfig;
  public isVisibleData: boolean;
  public isExecuting;
  public stageControl = [];

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.config = this.data.getConfigById(parseInt(id, 10));
  }

  async executeKnocking() {
    this.config = this.data.getConfigById(this.config.id);
    this.isExecuting = true;
    this.stageControl = [];

    for (let i = 0; i < this.config.secret.length; i++) {
      const s = this.config.secret[i];

      setTimeout(() => {
        this.stageControl.push({ src: `http://${this.config.ip}:${s.port}` });

        if((i + 1) === this.config.secret.length) {
          this.isExecuting = false;
        }
      }, i * 2000);
      console.log(s);
    }
  }

  async formPort(idx?, secret?: PortKnockSecret) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Port',
      message: 'Enter the port and maximum time for the stage.',
      inputs: [
        {
          type: 'number',
          placeholder: 'Port: 1024-65536',
          name: 'port',
          min: 1024,
          max: 65536,
          value: secret ? secret.port : '',
        },
        {
          type: 'number',
          placeholder: 'Max time in seconds: 3-10',
          name: 'time',
          min: 3,
          max: 10,
          value: secret ? secret.time : '',
        },
      ],
      buttons: [
        { text: 'Cancel', role: 'destructive' },
        { text: secret ? 'Save' : 'Add', role: 'cancel' },
      ],
    });

    await alert.present();

    const { role, data } = await alert.onDidDismiss();
    if (role === 'cancel') {
      // marchaa
      console.log(data.values);

      if (data.values.time >= 3 && data.values.port >= 1024) {
        if (secret) {
          this.data.updateSecret(this.config.id, idx, data.values);
        } else {
          this.data.addSecret(this.config.id, data.values);
        }
      } else {
        // show error
        const toast = await this.toast.create({
          message:
            'The timer must be between 3 and 10 and the ports must be above 1024.',
          cssClass: 'danger',
        });
        toast.present();
      }
    }
  }

  async remove(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Remove Port',
      message: 'Do you really want to remove this port.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Yes', role: 'destructive' },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();

    if (role === 'destructive') {
      this.data.removeSecret(this.config.id, id);
    }
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'List' : '';
  }
}
