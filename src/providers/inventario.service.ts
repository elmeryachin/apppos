import { Injectable } from '@angular/core';
import { ExistenciaResponseList } from '../modelo/objeto.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVIDOR } from '../utils/ctte.utils';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InventarioService {
  
  esActualizar:boolean = false      //Control para Guardar(false) un nuevo registro o actualizarlo(true).
  
  constructor( public http: HttpClient, 
               public storageService: StorageService ) {
    
  }
  
  onExistenciaArticulo( codigo:string ): Observable<ExistenciaResponseList> {
    return this.http.get<ExistenciaResponseList>( SERVIDOR + '/inventario/articulo/'+ codigo + '/existence',
     {headers:new HttpHeaders().set( 'token', this.storageService.getAccesoResponse().token )} )
  }

}
