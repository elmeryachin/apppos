import { Injectable } from '@angular/core';
import { ServObtenerResponse, DiscoResponse } from '../modelo/objeto.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVIDOR } from '../utils/ctte.utils';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs/Observable';
import { ResponseReporte } from '../modelo/dto';

@Injectable()
export class ReporteService {

  constructor( public http: HttpClient,
               public storageService: StorageService ) {}

  path: string = "/reporte"

  onReporteTransaccion(nombre:string, tipo:string , id:string): Observable<ResponseReporte> {
    return this.http.get<ResponseReporte>( SERVIDOR + this.path + "/" + nombre + "/" + tipo + "/" + id, {headers:new HttpHeaders().set( 'token', this.storageService.getAccesoResponse().token )} )
  }
  onPrintTransaccion(nombre:string, tipo:string , id:string): string {
    return SERVIDOR + this.path + "/" + nombre + "/" + tipo + "/view/" + id
  }

  onGenerarReporte(nombre:string, tipo:string ): Observable<ResponseReporte> {
    return this.http.get<ResponseReporte>( SERVIDOR + this.path + "/" + nombre + "/" + tipo, {headers:new HttpHeaders().set( 'token', this.storageService.getAccesoResponse().token )} )
  }

  onPrintReporte(nombre:string, tipo:string): string {
    return SERVIDOR + this.path + "/" + nombre + "/" + tipo + "/view"
  }


}

