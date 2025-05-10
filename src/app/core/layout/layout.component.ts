import { RouterOutlet } from '@angular/router';
import { TOOGLE_SIDEBAR } from './layout.animation';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../template/header/header.component';
import { SideMenuComponent } from '../template/side-menu/side-menu.component';
import { FooterComponent } from '../template/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    SideMenuComponent,
    FooterComponent,
    RouterOutlet,
    ToastModule,
    ConfirmDialogModule,
    BreadcrumbModule,
  ],
  providers: [MessageService, ConfirmationService],
  animations: [TOOGLE_SIDEBAR],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  items!: MenuItem[];

  breadcumbs: MenuItem[] = [{ label: 'Página Inicial' }];

  breadcumbsHome!: MenuItem;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.breadcumbsHome = { icon: 'pi pi-home', routerLink: '/' };
    
    this.items = [
      {
        label: 'Início',
        icon: 'pi pi-home',
        routerLink: '/',
        command: () => {
          this.updateBreadcrumbs('Página Inicial');
        },
      },
      {
        label: 'Upload de Aluguéis',
        icon: 'pi pi-cloud-upload',
        routerLink: '/upload',
        command: () => {
          this.updateBreadcrumbs('Upload de Aluguéis');
        },
      },
      {
        label: 'Relatórios',
        icon: 'pi pi-chart-line',
        routerLink: '/relatorios',
        command: () => {
          this.updateBreadcrumbs('Relatórios');
        },
      }
    ];
  }

  isOpenMenu: boolean = true;

  exibirMenu(value: boolean) {
    this.isOpenMenu = value;
  }

  hasOpen(): string {
    return this.isOpenMenu ? 'open' : 'closed';
  }

  updateBreadcrumbs(label: string) {
    this.breadcumbs = [{ label }];
  }
}
