import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';
import { ApiService, AluguelReport, AluguelResult, Carro } from '../../shared/services/api.service';
import { finalize, catchError } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    CardModule,
    ButtonModule,
    TabMenuModule,
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <div class="card">
      <p-toast></p-toast>
      <div class="p-4">
        <h2 class="page-title">Relatórios</h2>
        <p class="page-description">Visualize e exporte relatórios detalhados sobre aluguéis e carros disponíveis na frota.</p>
        
        <p-tabMenu [model]="items" [activeItem]="activeItem" styleClass="custom-tab-menu mb-4"></p-tabMenu>
        
        <div *ngIf="activeTab === 'alugueis'" class="mt-4">
          <div class="report-header">
            <div class="report-title">
              <i class="pi pi-file-pdf report-icon"></i>
              <h3>Aluguéis</h3>
            </div>
            <div class="report-summary">
              <div class="summary-item">
                <span class="summary-label">Total não pago:</span>
                <span class="valor-total">R$ {{valorTotalNaoPago | number:'1.2-2'}}</span>
              </div>
            </div>
          </div>
          
          <div class="report-actions">
            <button pButton type="button" label="Baixar Relatório" 
                    icon="pi pi-file-pdf" class="p-button-info p-button-raised"
                    (click)="gerarPdfAlugueis()" 
                    [disabled]="loadingAlugueis || gerandoPdfAlugueis">
            </button>
            <button pButton type="button" label="Atualizar" 
                    icon="pi pi-refresh" class="p-button-outlined p-button-secondary"
                    (click)="loadAlugueis()" 
                    [disabled]="loadingAlugueis">
            </button>
          </div>
          
          <p-table [value]="alugueis" [paginator]="true" [rows]="10" 
                   styleClass="p-datatable-striped p-datatable-gridlines p-datatable-sm" [rowHover]="true"
                   [showCurrentPageReport]="true" 
                   currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
                   [rowsPerPageOptions]="[10,25,50]"
                   [tableStyle]="{'min-width': '50rem'}"
                   [loading]="loadingAlugueis">
            <ng-template pTemplate="header">
              <tr>
                <th>Data Aluguel</th>
                <th>Modelo do Carro</th>
                <th>KM do Carro</th>
                <th>Nome do Cliente</th>
                <th>Telefone</th>
                <th>Data Devolução</th>
                <th>Valor</th>
                <th>Pago</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-aluguel>
              <tr>
                <td>{{aluguel.dataAluguel | date:'dd/MM/yyyy'}}</td>
                <td>{{aluguel.modeloCarro}}</td>
                <td>{{aluguel.kmCarro}}</td>
                <td>{{aluguel.nomeCliente}}</td>
                <td>{{aluguel.telefoneCliente}}</td>
                <td>{{aluguel.dataDevolucao | date:'dd/MM/yyyy'}}</td>
                <td>R$ {{aluguel.valor | number:'1.2-2'}}</td>
                <td>
                  <span class="status-badge" [ngClass]="{'status-paid': aluguel.pago === 'SIM', 'status-unpaid': aluguel.pago === 'NAO'}">
                    {{aluguel.pago === 'SIM' ? 'Pago' : 'Não Pago'}}
                  </span>
                </td>
              </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage">
              <tr>
                <td colspan="8" class="text-center">
                  <div class="empty-message">
                    <i class="pi pi-info-circle"></i>
                    <span>Nenhum registro encontrado.</span>
                  </div>
                </td>
              </tr>
            </ng-template>
          </p-table>
        </div>
        
        <div *ngIf="activeTab === 'carros'" class="mt-4">
          <div class="report-header">
            <div class="report-title">
              <i class="pi pi-car report-icon"></i>
              <h3>Carros</h3>
            </div>
          </div>
          
          <div class="report-actions">
            <button pButton type="button" label="Baixar Relatório" 
                    icon="pi pi-file-pdf" class="p-button-info p-button-raised"
                    (click)="gerarPdfCarros()" 
                    [disabled]="loadingCarros || gerandoPdfCarros">
            </button>
            <button pButton type="button" label="Atualizar" 
                    icon="pi pi-refresh" class="p-button-outlined p-button-secondary"
                    (click)="loadCarros()" 
                    [disabled]="loadingCarros">
            </button>
          </div>
          
          <p-table [value]="carros" [paginator]="true" [rows]="10" 
                   styleClass="p-datatable-striped p-datatable-gridlines p-datatable-sm" [rowHover]="true"
                   [showCurrentPageReport]="true" 
                   currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
                   [rowsPerPageOptions]="[10,25,50]"
                   [tableStyle]="{'min-width': '50rem'}"
                   [loading]="loadingCarros">
            <ng-template pTemplate="header">
              <tr>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Qtd. Passageiros</th>
                <th>KM</th>
                <th>Fabricante</th>
                <th>Valor Diária</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-carro>
              <tr>
                <td>{{carro.modelo}}</td>
                <td>{{carro.ano}}</td>
                <td>{{carro.qtdPassageiros}}</td>
                <td>{{carro.km}}</td>
                <td>{{carro.fabricante}}</td>
                <td>R$ {{carro.vlrDiaria | number:'1.2-2'}}</td>
              </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage">
              <tr>
                <td colspan="6" class="text-center">
                  <div class="empty-message">
                    <i class="pi pi-info-circle"></i>
                    <span>Nenhum registro encontrado.</span>
                  </div>
                </td>
              </tr>
            </ng-template>
          </p-table>
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
    }
    
    .page-title {
      color: #3f51b5;
      margin-bottom: 0.5rem;
      font-size: 1.8rem;
      font-weight: 600;
    }
    
    .page-description {
      color: #666;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
    }
    
    .custom-tab-menu ::ng-deep .p-tabmenu .p-tabmenu-nav {
      border-width: 0 0 2px 0;
      border-color: #e0e0e0;
    }
    
    .custom-tab-menu ::ng-deep .p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
      border: none;
      padding: 1rem 1.5rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .custom-tab-menu ::ng-deep .p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
      border-color: #3f51b5;
      color: #3f51b5;
    }
    
    .report-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .report-title {
      display: flex;
      align-items: center;
    }
    
    .report-icon {
      font-size: 1.8rem;
      color: #3f51b5;
      margin-right: 0.75rem;
    }
    
    .report-title h3 {
      color: #455a64;
      margin: 0;
      font-size: 1.5rem;
      font-weight: 500;
    }
    
    .report-summary {
      display: flex;
      align-items: center;
    }
    
    .summary-item {
      display: flex;
      align-items: center;
      background-color: #f5f5f5;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
    }
    
    .summary-label {
      font-weight: 500;
      color: #455a64;
      margin-right: 0.75rem;
    }
    
    .valor-total {
      font-size: 1.2rem;
      color: #e53935;
      font-weight: bold;
    }
    
    .report-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    
    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-weight: 500;
      font-size: 0.85rem;
      text-align: center;
      min-width: 80px;
    }
    
    .status-paid {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    
    .status-unpaid {
      background-color: #ffebee;
      color: #c62828;
    }
    
    .empty-message {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      color: #78909c;
    }
    
    .empty-message i {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
    
    @media (max-width: 768px) {
      .report-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
      
      .report-actions {
        flex-direction: column;
        width: 100%;
      }
      
      .report-actions button {
        width: 100%;
      }
    }
  `]
})
export class RelatoriosComponent implements OnInit {
  alugueis: AluguelReport[] = [];
  carros: Carro[] = [];
  valorTotalNaoPago: number = 0;
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;
  activeTab: string = 'alugueis';
  loadingAlugueis: boolean = false;
  loadingCarros: boolean = false;
  gerandoPdfAlugueis: boolean = false;
  gerandoPdfCarros: boolean = false;

  constructor(
    private apiService: ApiService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.items = [
      {label: 'Aluguéis', icon: 'pi pi-fw pi-file', command: () => this.activeTab = 'alugueis'},
      {label: 'Carros', icon: 'pi pi-fw pi-car', command: () => this.activeTab = 'carros'}
    ];
    
    this.activeItem = this.items[0];
    
    this.loadAlugueis();
    this.loadCarros();
  }

  loadAlugueis() {
    this.loadingAlugueis = true;
    this.apiService.getAlugueis()
      .pipe(
        finalize(() => {
          this.loadingAlugueis = false;
        }),
        catchError(error => {
          console.error('Erro detalhado ao carregar aluguéis:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar aluguéis. Verifique o console para mais detalhes.'
          });
          return of({ alugueis: [], valorTotalNaoPago: 0 });
        })
      )
      .subscribe({
        next: (result) => {
          this.alugueis = result.alugueis;
          this.valorTotalNaoPago = result.valorTotalNaoPago;
        }
      });
  }

  loadCarros() {
    this.loadingCarros = true;
    this.apiService.getCarros()
      .pipe(
        finalize(() => {
          this.loadingCarros = false;
        }),
        catchError(error => {
          console.error('Erro detalhado ao carregar carros:', error);
          
          if (error.status === 200) {
            
            if (error.error && typeof error.error === 'string') {
              try {
                const parsedData = JSON.parse(error.error);
                return of(parsedData);
              } catch (parseError) {
                console.error('Erro ao tentar fazer parsing manual:', parseError);
              }
            }
          }
          
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar carros. Verifique o console para mais detalhes.'
          });
          return of([]);
        })
      )
      .subscribe({
        next: (result) => {
          this.carros = result;
        }
      });
  }
  
  gerarPdfAlugueis() {
    this.gerandoPdfAlugueis = true;
    
    this.apiService.gerarRelatorioPdfAlugueis()
      .pipe(
        finalize(() => {
          this.gerandoPdfAlugueis = false;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Erro ao gerar PDF de aluguéis:', error);
          
          let mensagemErro = 'Erro ao gerar relatório em PDF.';
          
          if (error.status === 500) {
            if (error.error && error.error.message) {
              mensagemErro = `Erro do servidor: ${error.error.message}`;
            } else {
              mensagemErro = 'Erro interno do servidor ao gerar relatório.';
            }
             
            this.simularPdfAlugueis();
            return of(null);
          } else if (error.status === 404) {
            mensagemErro = 'Endpoint de relatório de aluguéis não encontrado. Usando simulação para demonstração.';
            this.simularPdfAlugueis();
            return of(null);
          } else if (error.status === 0) {
            mensagemErro = 'Erro de conexão com o servidor. Usando simulação para demonstração.';
            this.simularPdfAlugueis();
            return of(null);
          }
          
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: mensagemErro
          });
          
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.downloadPdf(response, 'relatorio_alugueis.pdf');
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Relatório de aluguéis gerado com sucesso!'
            });
          }
        }
      });
  }
  
  gerarPdfCarros() {
    this.gerandoPdfCarros = true;
    
    this.apiService.gerarRelatorioPdfCarros()
      .pipe(
        finalize(() => {
          this.gerandoPdfCarros = false;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Erro ao gerar PDF de carros:', error);
          
          let mensagemErro = 'Erro ao gerar relatório em PDF.';
          
          if (error.status === 500) {
            if (error.error && error.error.message) {
              try {
                if (typeof error.error === 'string') {
                  const errorObj = JSON.parse(error.error);
                  mensagemErro = `Erro do servidor: ${errorObj.message || errorObj.error || 'Erro interno'}`;
                } else if (error.error.message) {
                  mensagemErro = `Erro do servidor: ${error.error.message}`;
                }
              } catch (e) {
                console.error('Erro ao tentar analisar mensagem de erro:', e);
              }
            } else {
              mensagemErro = 'Erro interno do servidor ao gerar relatório.';
            }
            
            
            this.simularPdfCarros();
            return of(null);
          } else if (error.status === 404) {
            mensagemErro = 'Endpoint de relatório de carros não encontrado.';
            
            this.simularPdfCarros();
            return of(null);
          } else if (error.status === 0) {
            mensagemErro = 'Erro de conexão com o servidor.';
            
            this.simularPdfCarros();
            return of(null);
          }
          
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: mensagemErro
          });
          
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.downloadPdf(response, 'relatorio_carros.pdf');
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Relatório de carros gerado com sucesso!'
            });
          }
        }
      });
  }
  
  private simularPdfAlugueis() {
    const pdfContent = `
      <html>
        <head>
          <title>Relatório de Aluguéis</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #3f51b5; text-align: center; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Relatório de Aluguéis</h1>
          <p><strong>Data do Relatório:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Total de Registros:</strong> ${this.alugueis.length}</p>
          <p><strong>Valor Total Não Pago:</strong> R$ ${this.valorTotalNaoPago.toFixed(2)}</p>
          
          <table>
            <tr>
              <th>Data Aluguel</th>
              <th>Modelo do Carro</th>
              <th>Cliente</th>
              <th>Valor</th>
              <th>Pago</th>
            </tr>
            ${this.alugueis.map(aluguel => `
              <tr>
                <td>${new Date(aluguel.dataAluguel).toLocaleDateString()}</td>
                <td>${aluguel.modeloCarro}</td>
                <td>${aluguel.nomeCliente}</td>
                <td>R$ ${aluguel.valor.toFixed(2)}</td>
                <td>${aluguel.pago}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;
    
    const blob = new Blob([pdfContent], { type: 'text/html' });
    
    this.downloadPdf(blob, 'relatorio_alugueis.html');
    
    this.messageService.add({
      severity: 'info',
      summary: 'Simulação',
      detail: 'Relatório de aluguéis gerado como simulação (HTML)'
    });
  }
  
  private simularPdfCarros() {
    const pdfContent = `
      <html>
        <head>
          <title>Relatório de Carros</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #3f51b5; text-align: center; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Relatório de Frota de Carros</h1>
          <p><strong>Data do Relatório:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Total de Veículos:</strong> ${this.carros.length}</p>
          
          <table>
            <tr>
              <th>Modelo</th>
              <th>Ano</th>
              <th>Fabricante</th>
              <th>KM</th>
              <th>Valor Diária</th>
            </tr>
            ${this.carros.map(carro => `
              <tr>
                <td>${carro.modelo}</td>
                <td>${carro.ano}</td>
                <td>${carro.fabricante}</td>
                <td>${carro.km}</td>
                <td>R$ ${carro.vlrDiaria.toFixed(2)}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;
    
    const blob = new Blob([pdfContent], { type: 'text/html' });
    
    this.downloadPdf(blob, 'relatorio_carros.html');
    
    this.messageService.add({
      severity: 'info',
      summary: 'Simulação',
      detail: 'Relatório de carros gerado como simulação (HTML)'
    });
  }
  
  private downloadPdf(blob: Blob, fileName: string) {
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  }
} 