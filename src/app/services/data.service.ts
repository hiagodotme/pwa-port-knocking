import { Injectable } from '@angular/core';

export interface PortKnockConfig {
  id: number;
  name: string;
  ip: string;
  createdAt: Date;
  secret: Array<PortKnockSecret>;
}
export interface PortKnockSecret {
  port: number;
  time: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public configs: Array<PortKnockConfig> = [];

  constructor() {
    this.configs = JSON.parse(localStorage.getItem('configs') || '[]');
  }

  public addConfig(config: PortKnockConfig) {
    config.createdAt = new Date();
    this.configs.push(config);
    this.persist();
  }

  public updateConfig(idConfig: number, config: PortKnockConfig) {
    this.getConfigById(idConfig).ip = config.ip;
    this.getConfigById(idConfig).name = config.name;
    this.persist();
  }

  public removeConfig(id: number) {
    this.configs.splice(id, 1);
    this.persist();
  }

  public removeSecret(idConfig: number, idSecret: number) {
    this.getConfigById(idConfig).secret.splice(idSecret, 1);
    this.persist();
  }

  public addSecret(idConfig: number, secret: PortKnockSecret) {
    this.getConfigById(idConfig).secret.push(secret);
    this.persist();
  }

  public updateSecret(idConfig: number, idSecret: number, secret: PortKnockSecret) {
    this.getConfigById(idConfig).secret[idSecret] = secret;
    this.persist();
  }

  public getConfigs(): Array<PortKnockConfig> {
    return this.configs;
  }

  public getConfigById(id: number): PortKnockConfig {
    return this.configs[id];
  }

  private persist() {
    this.configs.forEach((value, idx) => {
      this.configs[idx].id = idx;
    });
    localStorage.setItem('configs', JSON.stringify(this.configs));
  }
}
