import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { SERVIDOR } from '../utils/ctte.utils';
import { Observable } from 'rxjs/Observable';
import { TransaccionResponseInit, TransaccionRequest, TransaccionResponse, TransaccionResponseList, ServResponse, ArticuloResponseMin, UsuarioResponseList, UsuarioResponseMin } from '../modelo/objeto.model';

@Injectable()
export class TransaccionService {


  constructor( private http: HttpClient,
               public storageService: StorageService ) {
  }

  onTipoTransaccion(tipo:string) {
    this.storageService.setAsignacionDtoTransaccion(tipo)
  }

  getHeaders():HttpHeaders {
    return new HttpHeaders().set( 'token', this.storageService.getAccesoResponse().token )
  }
  onObtenerArticulo( codigo:string ):Observable<ArticuloResponseMin> {
    return this.http.get<ArticuloResponseMin>( SERVIDOR + '/articulo/quest/' + codigo , {headers: this.getHeaders()} )
  }
  // ############################ A
  // 1
  onInit():Observable<TransaccionResponseInit> {
    console.log("onInit(): " + this.storageService.getDtoTransaccion().init)
    return this.http.get<TransaccionResponseInit>( SERVIDOR + this.storageService.getDtoTransaccion().init, {headers: this.getHeaders()} )
  }
  // 2
  onAdicionar(json: TransaccionRequest ): Observable<TransaccionResponse> {
    console.log("onAdicionar(json): " + this.storageService.getDtoTransaccion().add)
    return this.http.post<TransaccionResponse>( SERVIDOR + this.storageService.getDtoTransaccion().add, json, {headers: this.getHeaders()} )
  }
  // 3
  onActualizar(json: TransaccionRequest ): Observable<TransaccionResponse> {
    console.log("onActualizar(json): " + this.storageService.getDtoTransaccion().update)
    return this.http.put<TransaccionResponse>( SERVIDOR + this.storageService.getDtoTransaccion().update, json, {headers: this.getHeaders()} )
  }
  // 4
  onEliminar( id: string ): Observable<ServResponse> {
    console.log("onEliminar(id): " +  (this.storageService.getDtoTransaccion().delete + id))
    return this.http.delete<ServResponse>( SERVIDOR + this.storageService.getDtoTransaccion().delete + id, {headers: this.getHeaders()})
  }
  // 5
  onObtener( nro:number ): Observable<TransaccionResponse> {
    console.log("onObtener(nro): " + (this.storageService.getDtoTransaccion().quest + nro))
    return this.http.get<TransaccionResponse>( SERVIDOR + this.storageService.getDtoTransaccion().quest + nro, {headers: this.getHeaders()} )
  }

  // 01
  onListEntrada( json:any ): Observable<UsuarioResponseList> {
    console.log("onListEntrada(json): " + this.storageService.getDtoTransaccion().listE)
    return this.http.post<UsuarioResponseList>( SERVIDOR + this.storageService.getDtoTransaccion().listE, json, {headers: this.getHeaders()}  )
  }
  // 02
  onQuestEntrada( codigo:string ): Observable<UsuarioResponseMin> {
    console.log("onQuestEntrada(codigo): " + (this.storageService.getDtoTransaccion().questE + codigo))
    return this.http.get<UsuarioResponseMin>( SERVIDOR + this.storageService.getDtoTransaccion().questE + codigo, {headers: this.getHeaders()})
  }

  // ############################ B | C | D

  onLista( ): Observable<TransaccionResponseList> {
    console.log("onLista(): " + this.storageService.getDtoDetalle().list)
    return this.http.get<TransaccionResponseList>( SERVIDOR + this.storageService.getDtoDetalle().list, {headers: this.getHeaders()} )
  }

  onProcesar( id:string, request:any ): Observable<ServResponse> {
    console.log("onProcesar(id): " + (this.storageService.getDtoDetalle().procesar + id))
    return this.http.put<ServResponse>( SERVIDOR + this.storageService.getDtoDetalle().procesar + id, request, {headers: this.getHeaders()} )
  }

  onObtenerDiff( id:string ): Observable<TransaccionResponse> {
    console.log("onObtenerDiff(id): " + (this.storageService.getDtoDetalle().questDif + id))
    return this.http.get<TransaccionResponse>( SERVIDOR + this.storageService.getDtoDetalle().questDif + id, {headers: this.getHeaders()} )
  }

}
