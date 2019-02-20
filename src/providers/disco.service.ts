import { Injectable } from '@angular/core';
import { ArticuloRequest, ServListaResponse, ServObtenerResponse, ServResponse, DiscoResponse } from '../modelo/objeto.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVIDOR } from '../utils/ctte.utils';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DiscoService {
  
  constructor( public http: HttpClient, 
               public storageService: StorageService ) {}
  
  path: string = "/discos"

  onObtener( ): Observable<ServObtenerResponse> {
    return this.http.get<ServObtenerResponse>( SERVIDOR + this.path +'/quest/' , {headers:new HttpHeaders().set( 'token', this.storageService.getAccesoResponse().token )} )
  }

  onGenerar(proceso: string ): Observable<DiscoResponse> {
    return this.http.post<DiscoResponse>( SERVIDOR + this.path + '/generar', null,
    {headers:new HttpHeaders().set( 'token', this.storageService.getAccesoResponse().token ).set('proceso', proceso)} )
  }

  onActualizar(file: any ): Observable<DiscoResponse> {
    let formData = new FormData();
    formData.append("file", file);
    return this.http.post<DiscoResponse>( SERVIDOR + this.path + '/grabando', formData,
    {headers:new HttpHeaders().set( 'token', this.storageService.getAccesoResponse().token )} )
  }


}

