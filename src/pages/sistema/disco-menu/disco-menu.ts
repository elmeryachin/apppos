import { ReportesMenuPage } from '../reportes-menu/reportes-menu';
import { DiscoService } from './../../../providers/disco.service';
import { StorageService } from './../../../providers/storage.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DiscoMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-disco-menu',
  templateUrl: 'disco-menu.html',
})
export class DiscoMenuPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public discoService:DiscoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscoMenuPage');
  }
  public irReportesMenu() {
    this.navCtrl.push(ReportesMenuPage);
  }

}
