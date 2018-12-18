import { Injectable } from '@angular/core';
import { ArticuloRequest, ServListaResponse, ServObtenerResponse, ServResponse } from '../modelo/objeto.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVIDOR } from '../utils/ctte.utils';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArticuloService {
  
  constructor( public http: HttpClient, 
               public storageService: StorageService ) {}
  
  path: string = "/articulo"

  /*onList<ServListaResponse>() {
    return this.http.get<ServListaResponse>( SERVIDOR + this.path +'/list' , {headers:new HttpHeaders().set( 'token', this.storageService.getAccesoResponse().token )} )
  }*/

  onListaPorCodigo( json: any ): Observable<ServListaResponse> {
    return this.http.post<ServListaResponse>( SERVIDOR + this.path + '/list', json, {headers:new HttpHeaders().set( 'token', this.storageService.getAccesoResponse().token )} )
  }

  onObtener( codigo: string ): Observable<ServObtenerResponse> {
    return this.http.get<ServObtenerResponse>( SERVIDOR + this.path +'/quest/' + codigo , {headers:new HttpHeaders().set( 'token', this.storageService.getAccesoResponse().token )} )
  }

  onNuevo(json: ArticuloRequest ): Observable<ServResponse> {
    return this.http.post<ServResponse>( SERVIDOR + this.path + '/add', json, {headers:new HttpHeaders().set( 'token', this.storageService.getAccesoResponse().token )} )
  }

  onActualizar( json: ArticuloRequest, codigo:string ): Observable<ServResponse>{
    return this.http.put<ServResponse>( SERVIDOR + this.path + '/update/' + codigo, json, {headers:new HttpHeaders().set( 'token', this.storageService.getAccesoResponse().token )} )
  } 

  onEliminar( codigo:string ): Observable<ServResponse> {
      return this.http.delete<ServResponse>( SERVIDOR + this.path + '/delete/' + codigo, {headers:new HttpHeaders().set( 'token', this.storageService.getAccesoResponse().token )} )
  }


}

