import {  Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { IncidenciaService } from '../../services/incidencia.service';
import { Tiendas } from '../../interfaces/tiendas';

@Component({
  selector: 'app-add-jobs',
  imports: [RouterLink,RouterLinkActive,FormsModule],
  templateUrl: './addJobs.component.html',
 
})
export class AddJobsComponent {


  lblDate = 'Fecha';
  lblJob = 'Trabajo';  
  lblTienda = 'Tienda';
  lblEstado = 'Estado';

  selectedTienda =   signal<string>('');   
  resultado = signal<boolean>(false);  

  incidenciaService = inject(IncidenciaService);
  tiendas = signal< Tiendas[]> ([]);

  fechaDesce =   new Date(). toISOString().split('T')[0];

  jobCode = inject(ActivatedRoute).snapshot.params['id'];

  job = signal<string>('');
  fecha =   signal<string>(''); 


  constructor() {    

    this.fecha.set(this.fechaDesce);

    const resp = this.incidenciaService.loadFactories()
    .subscribe((resp => {

      this.tiendas.set(resp); 

    }));     

    if (this.jobCode != 0){
      const resp = this.incidenciaService.getJob(this.jobCode)
    .subscribe((resp => {
     
      this.job.set(resp[0].job);
      this.selectedTienda.set(resp[0].empresa);
      const parts = resp[0].fecha.toString().split('/'); 
      this.fecha.set( `${parts[2]}-${parts[1]}-${parts[0]}`);    

    }));     
    }
   
} 

addJob(job: string, fecha: string){
 
  const resp = this.incidenciaService.addJob(job,fecha, this.selectedTienda())
    .subscribe((resp => {
      this.resultado.set(resp.resul); 

    }));        
     

}



}
