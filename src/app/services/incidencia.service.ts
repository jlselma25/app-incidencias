import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IncidenciasRespponse } from '../interfaces/incidencias.response';
import { ResulResponse } from '../interfaces/resul.response';
import { Tiendas } from '../interfaces/tiendas';
import { JobsResponse } from '../interfaces/job.response';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  
 private  http = inject(HttpClient);





 loadIncidencias(fechaDesde: string, fechaHasta: string){  


  const params = new HttpParams()
    .set('fechaDesde', fechaDesde)
    .set('fechaHasta', fechaHasta);


     return this.http.get<IncidenciasRespponse[]>(environment.url + '/loadIncidencias/', { params });
 }

 
 loadJobs(fechaDesde: string, fechaHasta: string){  


  const params = new HttpParams()
    .set('fechaDesde', fechaDesde)
    .set('fechaHasta', fechaHasta);


     return this.http.get<JobsResponse[]>(environment.url + '/loadJobs/', { params });
 }


 add(motivo: string, respuesta: string , fecha: string, tienda: string){

  const params = new HttpParams()
  .set('incidencia', motivo)
  .set('respuesta', respuesta)
  .set('fecha', fecha)
  .set('tienda', tienda);

  return this.http.get<ResulResponse>(environment.url + '/addIncidencias/', { params });

 }


 addJob(trabajo: string, fecha: string, empresa: string){

  const params = new HttpParams()
  .set('trabajo', trabajo)  
  .set('fecha', fecha)
  .set('empresa', empresa);

  return this.http.get<ResulResponse>(environment.url + '/addJob/', { params });

 }

 update(motivo: string, respuesta: string , fecha: string, tienda: string, id: number){

  const params = new HttpParams()
  .set('incidencia', motivo)
  .set('respuesta', respuesta)
  .set('fecha', fecha)
  .set('tienda', tienda)
  .set('id', id);

  return this.http.get<ResulResponse>(environment.url + '/updateIncidencias/', { params });

 }



 loadShops(){
   return this.http.get<Tiendas[] >(environment.url + '/loadShops/')

 }

 loadFactories(){
  return this.http.get<Tiendas[] >(environment.url + '/loadFactories/')

}

 getIncidencia(id: number){  

  const params = new HttpParams()
    .set('id', id);
    
    return this.http.get<IncidenciasRespponse[]>(environment.url + '/getIncidencias/', { params });
 }


 getJob(id: number){  

  const params = new HttpParams()
    .set('id', id);
    
    return this.http.get<JobsResponse[]>(environment.url + '/getJob/', { params });
 }

 deleteJob(id: number, url: string, table: string){  


  const params = new HttpParams()
    .set('id', id)
    .set('table', table);

     return this.http.get<ResulResponse>(environment.url + url, { params });
 }

}
