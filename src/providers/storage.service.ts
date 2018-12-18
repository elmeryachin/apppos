import { Injectable } from '@angular/core';
import { AccesoResponse } from '../modelo/objeto.model';
import { DtoTransaccion, DtoDetalle } from '../modelo/dto';

@Injectable()
export class StorageService {
  
  localStorageService: any
  

  constructor() {  
    this.localStorageService = localStorage
  }

  getCargarJson(item:string) {
    var response = this.localStorageService.getItem(item)
    return (response) ? <Object> JSON.parse(response): null
  }

  getAccesoResponse():AccesoResponse {
    let acc:any = this.getCargarJson('accesoResponse')
    return acc
  }

  setAccesoResponse(response: any) {
    this.localStorageService.setItem('accesoResponse', JSON.stringify(response))
  }

  setDtoTransaccion( response: DtoTransaccion ) {
    this.localStorageService.setItem( 'dtoTransaccion', JSON.stringify( response ) )
  }

  getDtoTransaccion():DtoTransaccion {
    let dto:any = this.getCargarJson('dtoTransaccion')
    return dto
  }


  setDtoDetalle( response: DtoDetalle ) {
    this.localStorageService.setItem( 'dtoDetalle', JSON.stringify( response ) )
  }

  getDtoDetalle():DtoDetalle {
    let dto:any = this.getCargarJson('dtoDetalle')
    return dto
  }

  
}
