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
  irReportesMenu() {
    console.log('asdasdds')
    this.navCtrl.push(ReportesMenuPage);
  }

  prepararDescarga1 ( ) {  
    console.log('prepararDescarga')
  }

  prepararDescarga( ) {
    console.log('ejecutando descarga ....')

    let service = this.discoService.onGenerar( null )

    service.subscribe(
      data => {
        console.log(data)

        let link = document.createElement( 'a' )
        link.setAttribute( 'href', 'data:text/plain;base64,' + data.documento )
        link.setAttribute( 'download', data.nombre + '.zip' )
        link.style.display = 'none'

        document.body.appendChild( link )
    
        link.click()
    
        document.body.removeChild( link )

      }
    )
  }
}
