import { DiscoService } from './../../../providers/disco.service';
import { StorageService } from './../../../providers/storage.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

/**
 * Generated class for the ReportesMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reportes-menu',
  templateUrl: 'reportes-menu.html',
})
export class ReportesMenuPage {
  langs;
  langForm;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public discoService:DiscoService
    ) {
      this.langForm = new FormGroup({
        "langs": new FormControl({value: 'rust', disabled: false})
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportesMenuPage');
  }
  doSubmit(event) {
    console.log('Submitting form', this.langForm.value);
    event.preventDefault();
  }
  prueba() {
    console.log("ingresa")
  }
}
