import { Injectable } from '@angular/core';
import { AccesoResponse } from '../modelo/objeto.model';
import { DtoTransaccion, DtoDetalle } from '../modelo/dto';

@Injectable()
export class StorageService {

  localStorageService: any
  tipoTransaccion:string

  constructor() {
    this.localStorageService = localStorage
  }

  setAsignacionDtoTransaccion( tipoTransaccion:string ) {
    this.tipoTransaccion = tipoTransaccion
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
    this.localStorageService.setItem( this.tipoTransaccion, JSON.stringify( response ) )
  }

  getDtoTransaccion():DtoTransaccion {
    let dto:any = this.getCargarJson( this.tipoTransaccion )
    return dto
  }

  setDtoDetalle( response: DtoDetalle ) {
    this.localStorageService.setItem( this.tipoTransaccion + '_DETALLE', JSON.stringify( response ) )
  }

  getDtoDetalle():DtoDetalle {
    let dto:any = this.getCargarJson( this.tipoTransaccion + '_DETALLE' )
    return dto
  }

}
