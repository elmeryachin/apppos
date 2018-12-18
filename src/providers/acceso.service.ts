import { Injectable } from '@angular/core';
import { AccesoRequest } from '../modelo/objeto.model';
import { HttpClient } from '@angular/common/http';
import { SERVIDOR } from '../utils/ctte.utils';

@Injectable()
export class AccesoService {

  constructor( private http: HttpClient ) {
    
  }
  
  onAccesoLogin<AccesoResponse>( json:AccesoRequest ) {
    return this.http.post<AccesoResponse>( SERVIDOR + '/acceso/login', json )
  }

}
