import { PortKnockConfig } from './../services/data.service';
import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private data: DataService,
    private alertController: AlertController,
    private toast: ToastController
  ) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getConfigs(): PortKnockConfig[] {
    return this.data.getConfigs();
  }

  async formKnocking(config?: PortKnockConfig) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: config ? config.name : 'Add Host',
      message: 'Enter the name and address for the host.',
      inputs: [
        {
          type: 'text',
          placeholder: 'Name',
          name: 'name',
          value: config ? config.name : '',
        },
        {
          type: 'text',
          placeholder: 'Ip or domain',
          name: 'ip',
          value: config ? config.ip : '',
        },
      ],
      buttons: [
        { text: 'Cancel', role: 'destructive' },
        { text: config ? 'Save' : 'Add', role: 'cancel' },
      ],
    });

    await alert.present();

    const { role, data } = await alert.onDidDismiss();
    if (role === 'cancel') {
      // marchaa

      if (data.values.name && data.values.ip) {
        if (config) {
          this.data.updateConfig(config.id, data.values);
        } else {
          this.data.addConfig({ ...data.values, secret: [] });
        }
      } else {
        // show error
        const toast = await this.toast.create({
          message: 'The host name and address is required..',
          cssClass: 'danger',
        });
        toast.present();
      }
    }
  }

  async removeKnocking(config?: PortKnockConfig) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Remove Port Knocking',
      message: 'Do you really want to remove this item.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Yes', role: 'destructive' },
      ],
    });

    await alert.present();
    const { role } =  await alert.onDidDismiss();

    if (role === 'destructive') {
      this.data.removeConfig(config.id);
    }
  }
}
