import { LayoutComponent } from './core/layout/layout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            {
                path: '', loadComponent: () => import('./feature/home/home.component').then(component => component.HomeComponent)
            },
            {
                path: 'upload', loadComponent: () => import('./feature/upload/upload.component').then(component => component.UploadComponent)
            },
            {
                path: 'relatorios', loadComponent: () => import('./feature/relatorios/relatorios.component').then(component => component.RelatoriosComponent)
            }
        ]
    }
];
