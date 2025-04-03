import {  Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { IncidenciaService } from '../../services/incidencia.service';
import { Tiendas } from '../../interfaces/tiendas';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-incidencias',
  imports: [RouterLink,RouterLinkActive, FormsModule],
  templateUrl: './updateIncidencias.component.html',

})
export class UpdateIncidenciasComponent { 

  lblDate = 'Fecha';
  lblMotivo = 'Incidencia';
  lblRespuesta = 'Respuesta';
  lblTienda = 'Teinda';
  id : number = 0;
  selectedTienda =   signal<string>(''); 

  motivo = signal<string>('');
  respuesta = signal<string>('');
  incidenciaService = inject(IncidenciaService); 
  resultado = signal<boolean>(false); 
  tiendas = signal< Tiendas[]> ([]);
  fecha =   signal<string>(''); 

  constructor(private route: ActivatedRoute){
  
    const resp = this.incidenciaService.loadShops()
    .subscribe((resp => {

      this.tiendas.set(resp); 

    }));  

    this.route.params.subscribe((params) => {
      this.id = params['id']; // Obtenemos el valor del parámetro de la ruta
    
      this.incidenciaService.getIncidencia(this.id).subscribe((resp) => {    
        
        this.motivo.set(resp[0].motivo);
        this.respuesta.set(resp[0].respuesta);       
        this.selectedTienda.set(resp[0].tienda);
        const parts = resp[0].fecha.toString().split('/'); 
        this.fecha.set( `${parts[2]}-${parts[1]}-${parts[0]}`);

      
      });
    });
  }


  update(motivo: string, respuesta: string , fecha: string){

    const resp = this.incidenciaService.update(motivo,respuesta,fecha, this.selectedTienda(),this.id)
    .subscribe((resp => {

      this.resultado.set(resp.resul); 

    }));        

  }
  

}










