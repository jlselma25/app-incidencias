import {  Component, inject, output, signal, Signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
;
import { IncidenciaService } from '../../services/incidencia.service';
import type { Tiendas } from '../../interfaces/tiendas'


@Component({
  selector: 'app-add-incidencias-page',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './addIncidencias-page.component.html',
 
})

export class AddIncidenciasPageComponent {

  private  http = inject(HttpClient);
  resultado = signal<boolean>(false);  
  respuesta = signal<string>('');

  selectedTienda: string = ''; 

  lblDate = 'Fecha';
  lblMotivo = 'Incidencia';
  lblRespuesta = 'Respuesta';
  lblTienda = 'Tienda';

  tiendas = signal< Tiendas[]> ([]);
  incidenciaService = inject(IncidenciaService);
  fechaDesce =   new Date(). toISOString().split('T')[0];

  

  constructor() {    

    const resp = this.incidenciaService.loadShops()
    .subscribe((resp => {

      this.tiendas.set(resp); 

    }));     
   
} 

add(motivo: string, respuesta: string , fecha: string){
      
    const resp = this.incidenciaService.add(motivo,respuesta,fecha, this.selectedTienda)
    .subscribe((resp => {

      this.resultado.set(resp.resul); 

    }));        
     

    }
 }
