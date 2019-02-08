import { Component } from '@angular/core';
import { StorageService } from '../../../providers/storage.service';

@Component({
  selector: 'page-disco',
  templateUrl: 'disco.html'
})
export class DiscoPage {

  constructor( public storageService: StorageService ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Disco ...');
  }

}
