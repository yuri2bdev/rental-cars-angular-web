import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

export interface AluguelReport {
  dataAluguel: string;
  modeloCarro: string;
  kmCarro: number;
  nomeCliente: string;
  telefoneCliente: string;
  dataDevolucao: string;
  valor: number;
  pago: string;
}

export interface AluguelResult {
  alugueis: AluguelReport[];
  valorTotalNaoPago: number;
}

export interface Carro {
  modelo: string;
  ano: string;
  qtdPassageiros: number;
  km: number;
  fabricante: string;
  vlrDiaria: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = '/api';

  constructor(private http: HttpClient) { }

  uploadArquivoAluguel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('arquivo', file);
    return this.http.post(`${this.API_URL}/alugueis/processar-arquivo`, formData);
  }

  getAlugueis(): Observable<AluguelResult> {
    return this.http.get<AluguelResult>(`${this.API_URL}/alugueis`);
  }

  getCarros(): Observable<Carro[]> {
    return this.http.get<Carro[]>(`${this.API_URL}/carros`);
  }
  
  
  gerarRelatorioPdfAlugueis(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Accept': 'application/pdf'
    });
    
    return this.http.get(`/api/relatorios/alugueis`, {
      headers: headers,
      responseType: 'blob'
    });
  }
  
  gerarRelatorioPdfCarros(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Accept': 'application/pdf'
    });
    
    
    return this.http.get(`/api/relatorios/carros`, {
      headers: headers,
      responseType: 'blob'
    });
  }
} 