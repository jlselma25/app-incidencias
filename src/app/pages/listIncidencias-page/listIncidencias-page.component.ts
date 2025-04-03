import {  Component, inject, output, signal } from '@angular/core';
import type { ColumnasTable } from '../../interfaces/columnasTable';


import { IncidenciaService } from '../../services/incidencia.service';
import type { IncidenciasRespponse } from '../../interfaces/incidencias.response';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-list-incidencias-page',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './listIncidencias-page.component.html',
  
})



export class ListIncidenciasPageComponent { 

  incidenciaService = inject(IncidenciaService);   
  incidencias = signal< IncidenciasRespponse[]> ([]);
  fechaDesce =   new Date(). toISOString().split('T')[0];



  isLoading = signal(false);


  columnas: ColumnasTable[] = [
    { nombre: 'Fecha' },
    { nombre: 'Incidencia' },
    { nombre: 'Respuesta' },
    { nombre: 'Tienda' },
    { nombre: 'Accion' }
  ];


  filter(fechaDesde: string, fechaHasta: string){

    if(this.isLoading()) return;

    this.isLoading.set(true);

    const resp = this.incidenciaService.loadIncidencias(fechaDesde, fechaHasta)
    .subscribe((resp => {

      this.isLoading.set(false);

      this.incidencias.set(resp);     

    }));   
  }

  delete(id: number){

    const resp = this.incidenciaService.deleteJob(id, '/delete/','incidencias')
    .subscribe((resp => {   
      if (resp.resul == true){
        const updatedIncidencias = this.incidencias().filter(incidencia => incidencia.id !== id);        
        this.incidencias.set(updatedIncidencias);
      }
    }));   
  
  }



}





  


