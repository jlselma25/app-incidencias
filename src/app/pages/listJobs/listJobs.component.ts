import { Component, inject, signal } from '@angular/core';
import { IncidenciaService } from '../../services/incidencia.service';
import { ColumnasTable } from '../../interfaces/columnasTable';
import { JobsResponse } from '../../interfaces/job.response';
import {  RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-list-jobs',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './listJobs.component.html',

})
export class ListJobsComponent { 


   isLoading = signal(false);


  columnas: ColumnasTable[] = [
    { nombre: 'Fecha' },
    { nombre: 'Emppresa' },
    { nombre: 'Trabajo' },    
    { nombre: 'Estado' },
    { nombre: 'Accion' }
  ];

  jobs = signal< JobsResponse[]> ([]);
  incidenciaService = inject(IncidenciaService);
  fechaDesce =   new Date(). toISOString().split('T')[0];

  


  filter(fechaDesde: string, fechaHasta: string){

    if(this.isLoading()) return;

    this.isLoading.set(true);

    const resp = this.incidenciaService.loadJobs(fechaDesde, fechaHasta)
    .subscribe((resp => {

      this.isLoading.set(false);

      this.jobs.set(resp);          


    }));   
  }


  delete(id: number){

    const resp = this.incidenciaService.deleteJob(id, '/delete/','trabajos')
    .subscribe((resp => {   
      if (resp.resul == true){
        const updatedJobs = this.jobs().filter(job => job.id !== id);        
        this.jobs.set(updatedJobs);
      }
    }));   
  
  }





}
