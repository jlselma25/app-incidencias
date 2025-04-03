import { Routes } from '@angular/router';
import { AddIncidenciasPageComponent } from './pages/addIncidencias-page/addIncidencias-page.component';
import { ListIncidenciasPageComponent } from './pages/listIncidencias-page/listIncidencias-page.component';
import { UpdateIncidenciasComponent } from './pages/updateIncidencias/updateIncidencias.component';
import { AddJobsComponent } from './pages/addJobs/addJobs.component';
import { ListJobsComponent } from './pages/listJobs/listJobs.component';
import { InformationJobComponent } from './pages/informationJob/informationJob.component';

export const routes: Routes = [

    {
        path:'dashboard',
        loadComponent: () => import('./pages/dashboard-page/dashboard-page.component'),

        children: [
            {
                path: 'addIncidencias',
                component: AddIncidenciasPageComponent

                
            },

            {
                path: 'updateIncidencias/:id',
                component: UpdateIncidenciasComponent                
            },

            {
                path: 'listIncidencias',
                component: ListIncidenciasPageComponent

            },
            {
                path: 'addJobs/:id',
                component: AddJobsComponent
            },
            {
                path: 'listJobs',
                component: ListJobsComponent
            },
            {
                path: 'informationJob/:id',
                component: InformationJobComponent
            }



            
        ]
    },
    {

        path:'**',
        redirectTo: 'dashboard'
    }





];
