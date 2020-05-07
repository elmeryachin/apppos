import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MensajeUtils } from '../../../utils/mensaje.utils';
import { UtilitarioUtils } from '../../../utils/utilitario.utils';
import { TransaccionService } from '../../../providers/transaccion.service';
import { AlertController, ViewController, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../../providers/storage.service';
import { UsuarioRequest, UsuarioResponseMin } from '../../../modelo/objeto.model';
import { Observable } from 'rxjs';
declare var require: any
var PHE = require("print-html-element");

@Component({
  selector: 'reporte',
  templateUrl: 'reporte.html'
})
export class ReportePage {

  url: string
  nombre: string
  constructor(public alertCtrl:AlertController,
              public mensajeUtils:MensajeUtils,
              public utilitarioUtils:UtilitarioUtils,
              public transaccionService:TransaccionService,
              public storageService: StorageService,
              public viewCtrl:ViewController,
              public navCtrl:NavController,
              public navParams:NavParams ) {

                //recuperando los parametros enviados
                this.url = navParams.get('url')
                this.nombre = navParams.get('nombre')

                console.log(this.url)
                console.log(this.nombre)
  }

  ngOnInit() {
    
  }

  onReturnModal(val:any) {
    this.viewCtrl.dismiss( val )
  }


  onReporte(tipo:string) {
    //http://localhost:8080/reporte/existencia/xls/view/0008
    /*if( tipo == 'pdf' )
      window.open(this.url + "/reporte/stock/pdf/download", "_blank")
    else if( tipo == 'xls' )
      window.open(this.url + "/reporte/stock/xls/download", "_blank")
    else this.generarReporte()*/
    console.log( 'Generacion de reportes ... ' + tipo )
  }


  generarReporte(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", this.url, false);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.send();
    PHE.printHtml(xhttp.responseText);
  }
}
