import { Component } from '@angular/core';
import { StorageService } from '../../../providers/storage.service';
import { DiscoService } from '../../../providers/disco.service';
import { DiscoResponse } from '../../../modelo/objeto.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-disco',
  templateUrl: 'disco.html'
})
export class DiscoPage {

  constructor( public storageService: StorageService,
               public discoService:DiscoService ) {

  }

  onBasicUploadAuto(event) {
    console.log(event)
  }

  onGenerar() {

  }

  onActualizar() {

  }

  onLista() {

  }

  private file: File = null;
  public message = '';
  files(files) {
    this.message = '';
    this.file = files.item(0);
    console.log(this.file)
  }

  upload() {
     let service:Observable<DiscoResponse> = this.discoService.onActualizar(this.file)

     service.subscribe(
      data => {
        console.log('uploadd.....')
        console.log(data)
      }
    )
  }

  nombreProceso:string

  download( ) {
    console.log('ejecutando descarga ....')

    let service = this.discoService.onGenerar( this.nombreProceso )

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
