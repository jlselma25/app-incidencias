import {  Component } from '@angular/core';
import { NavbarComponent } from "../../componets/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [NavbarComponent,RouterOutlet],
  templateUrl: './dashboard-page.component.html',
 
})
export default class DashboardPageComponent { 

}
