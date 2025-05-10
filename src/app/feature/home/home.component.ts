import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CardModule, RouterModule, CommonModule],
  template: `
    <div class="card">
      <div class="hero-section">
        <div class="hero-content">
          <h1>Sistema de Aluguel de Veículos</h1>
          <p class="hero-description">Gerencie seus aluguéis de veículos de forma simples e eficiente.</p>
        </div>
      </div>
      
      <div class="p-4">
        <h2 class="section-title">Bem-vindo ao Rental Cars</h2>
        <p class="section-description">Utilize as opções abaixo para gerenciar seus dados e acessar os recursos do sistema.</p>
        
        <div class="grid">
          <div class="col-12 md:col-6 lg:col-4">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="pi pi-upload"></i>
              </div>
              <div class="feature-content">
                <h3>Upload de Aluguéis</h3>
                <p>Faça upload de arquivos .rtn para processar novos registros de aluguéis de veículos.</p>
                <button 
                  pButton 
                  label="Ir para Upload" 
                  icon="pi pi-upload" 
                  class="p-button-primary p-button-raised" 
                  (click)="navigateToUpload()">
                </button>
              </div>
            </div>
          </div>
          
          <div class="col-12 md:col-6 lg:col-4">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="pi pi-chart-bar"></i>
              </div>
              <div class="feature-content">
                <h3>Relatórios</h3>
                <p>Visualize relatórios detalhados sobre aluguéis e carros disponíveis na frota.</p>
                <button 
                  pButton 
                  label="Ver Relatórios" 
                  icon="pi pi-chart-bar" 
                  class="p-button-primary p-button-raised" 
                  (click)="navigateToRelatorios()">
                </button>
              </div>
            </div>
          </div>
          
          <div class="col-12 md:col-6 lg:col-4">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="pi pi-car"></i>
              </div>
              <div class="feature-content">
                <h3>Gestão de Frota</h3>
                <p>Acompanhe o status da sua frota de veículos e gerencie a disponibilidade.</p>
                <button 
                  pButton 
                  label="Ver Relatórios" 
                  icon="pi pi-car" 
                  class="p-button-primary p-button-raised" 
                  (click)="navigateToRelatorios()">
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="stats-section mt-5">
          <h2 class="section-title">Estatísticas Rápidas</h2>
          <div class="grid">
            <div class="col-12 md:col-6 lg:col-3">
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="pi pi-car"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-value">23</span>
                  <span class="stat-label">Veículos na Frota</span>
                </div>
              </div>
            </div>
            
            <div class="col-12 md:col-6 lg:col-3">
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="pi pi-calendar"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-value">47</span>
                  <span class="stat-label">Aluguéis Ativos</span>
                </div>
              </div>
            </div>
            
            <div class="col-12 md:col-6 lg:col-3">
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="pi pi-users"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-value">128</span>
                  <span class="stat-label">Clientes Cadastrados</span>
                </div>
              </div>
            </div>
            
            <div class="col-12 md:col-6 lg:col-3">
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="pi pi-money-bill"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-value">R$ 12.450</span>
                  <span class="stat-label">Faturamento Mensal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      margin: 0 auto;
      max-width: 1200px;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.08);
      overflow: hidden;
    }
    
    .hero-section {
      background: linear-gradient(135deg, #3f51b5 0%, #2196f3 100%);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
      position: relative;
    }
    
    .hero-section::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #ff9800, #f44336, #9c27b0, #3f51b5, #2196f3);
    }
    
    .hero-content h1 {
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    
    .hero-description {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .section-title {
      color: #3f51b5;
      margin-bottom: 0.5rem;
      font-size: 1.8rem;
      font-weight: 600;
    }
    
    .section-description {
      color: #666;
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }
    
    .feature-card {
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,.08);
      padding: 1.5rem;
      height: 100%;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      border: 1px solid #e0e0e0;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,.1);
      border-color: #bbdefb;
    }
    
    .feature-icon {
      background: linear-gradient(135deg, #3f51b5 0%, #2196f3 100%);
      color: white;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
    }
    
    .feature-icon i {
      font-size: 1.8rem;
    }
    
    .feature-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .feature-content h3 {
      color: #455a64;
      margin-bottom: 0.75rem;
      font-size: 1.3rem;
      font-weight: 500;
    }
    
    .feature-content p {
      color: #607d8b;
      margin-bottom: 1.5rem;
      flex: 1;
    }
    
    .stats-section {
      padding-top: 1.5rem;
      border-top: 1px solid #e0e0e0;
    }
    
    .stat-card {
      background-color: #f5f5f5;
      border-radius: 8px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      transition: all 0.3s ease;
    }
    
    .stat-card:hover {
      background-color: #e8eaf6;
    }
    
    .stat-icon {
      background-color: #3f51b5;
      color: white;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
    }
    
    .stat-icon i {
      font-size: 1.5rem;
    }
    
    .stat-content {
      display: flex;
      flex-direction: column;
    }
    
    .stat-value {
      font-size: 1.5rem;
      font-weight: 600;
      color: #3f51b5;
    }
    
    .stat-label {
      font-size: 0.9rem;
      color: #607d8b;
    }
    
    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2rem;
      }
      
      .hero-description {
        font-size: 1.1rem;
      }
      
      .feature-card {
        margin-bottom: 1.5rem;
      }
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToUpload() {
    this.router.navigate(['upload']);
  }

  navigateToRelatorios() {
    this.router.navigate(['relatorios']);
  }
}
