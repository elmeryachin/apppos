import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ExistenciaResponseList, ResumenExistencia } from '../../modelo/objeto.model';
import { InventarioService } from '../../providers/servicios.providers';

@Component({
  selector: 'inventario',
  templateUrl: 'inventario.html'
})
export class InventarioComponent {
  
  @Input() codigo:string
  agrupador: Grupo[]
  ctrl:boolean = false
  list:ResumenExistencia[]
  @Output() noEvent = new EventEmitter()
  constructor( public inventarioService:InventarioService ) {
  }

  ngAfterViewInit() {
    this.inventarioService.onExistenciaArticulo(this.codigo).subscribe(
      data => {
        if(data.respuesta) {
          this.list = data.list
          
          let cantidadExistente:number = 0
          for( let i = 0; i < data.list.length; i++ ) {
            if( data.list[i].propio == 1
              && data.list[i].nombreAmbiente != 'Por Llegar'
              && data.list[i].nombreAmbiente != 'Por Entregar'
              && data.list[i].nombreAmbiente != 'Por Recibir') {
              cantidadExistente = cantidadExistente + data.list[i].cantidad
            }
          }
          this.noEvent.emit(cantidadExistente)
        }
      }
    )
  }

  getAgrupar(existenciaResponseList:ExistenciaResponseList) {
    let maximo: number = 3
    let aux = 0

    this.agrupador = new Array()
    let indice = 0
    for (let obj of existenciaResponseList.list) {

      if (aux < maximo) {

        if (this.agrupador[indice] == undefined
          || this.agrupador[indice] == null) {
          this.agrupador[indice] = new Grupo(new Array())
        }

        let subindice: number = this.agrupador[indice].inventario.length
        this.agrupador[indice].inventario[subindice] = obj
        aux = aux + 1

      } else {
        indice = indice + 1
        aux = 0
      }
    }
    while (aux > 0 && aux < maximo) {
      let subindice: number = this.agrupador[indice].inventario.length
      this.agrupador[indice].inventario[subindice] = 
            { nombreAmbiente: null, codigoAmbiente:null, cantidad:null, propio:0 } 
      aux = aux + 1
    }
  }
}

export class Grupo {
  constructor(public inventario: ResumenExistencia[]) { }

}
