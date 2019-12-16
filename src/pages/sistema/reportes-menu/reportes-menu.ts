import { DiscoService } from './../../../providers/disco.service';
import { StorageService } from './../../../providers/storage.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { ReporteService } from '../../../providers/reporte.service';
import { Observable } from 'rxjs';
import { ResponseReporte } from '../../../modelo/dto';

var PHE = require("print-html-element")

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
    public discoService:DiscoService,
    public reporteService:ReporteService
    ) {
      this.langForm = new FormGroup({
        "langs": new FormControl({value: 'rust', disabled: false})
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportesMenuPage');
  }

  pdf() {
    console.log(this.langForm.value.langs)
    let service:Observable<ResponseReporte> = this.reporteService.onGenerarReporte(this.langForm.value.langs, 'pdf')
    service.subscribe(
      data => {
        console.log(data)

        let link = document.createElement( 'a' )
        link.setAttribute( 'href', 'data:text/plain;base64,' + data.reporte )
        link.setAttribute( 'download', this.langForm.value.langs + '.pdf' )
        link.style.display = 'none'

        document.body.appendChild( link )
    
        link.click()
    
        document.body.removeChild( link )

      }
    )
  }

  excel() {
    let service = this.reporteService.onGenerarReporte(this.langForm.value.langs, 'xls')
    service.subscribe(
      data => {
        console.log(data)

        let link = document.createElement( 'a' )
        link.setAttribute( 'href', 'data:text/plain;base64,' + data.reporte )
        link.setAttribute( 'download', this.langForm.value.langs + '.xls' )
        link.style.display = 'none'

        document.body.appendChild( link )
    
        link.click()
    
        document.body.removeChild( link )

      }
    )
  }

  /**
   * Permite imprimir un objeto
   */
  imprimir() {
    let url:string = this.reporteService.onPrintReporte( this.langForm.value.langs, 'html' )
    
    let xhttp = new XMLHttpRequest()
    
    xhttp.open("GET", url, false);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.setRequestHeader("token", this.storageService.getAccesoResponse().token );

    xhttp.send();

    PHE.printHtml( xhttp.responseText );
  }

}
