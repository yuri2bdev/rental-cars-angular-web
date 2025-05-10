import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/template/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
    
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .app-content {
      flex: 1;
      background-color: #f5f5f5;
      padding: 1rem 0;
      margin-top: 5.5rem; /* Ajustado para o tamanho do cabeçalho */
    }
    
    .app-footer {
      background-color: #263238;
      color: rgba(255, 255, 255, 0.7);
      padding: 1.5rem 0;
      text-align: center;
      font-size: 0.9rem;
    }
  `]
})
export class AppComponent {
  title = 'rental-cars';
}
