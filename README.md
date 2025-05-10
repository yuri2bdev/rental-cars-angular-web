Rental Cars Angular Web Challenge

Bem vindo ao desafio técnico Angular web Rental Cars!

Este aplicativo tem por objetivo avaliar o desenvolvimento de códigos em Angular, e funciona da seguinte maneira:

Seu objetivo é controlar os alugueis de veículos de uma locadora, lendo arquivos de entrada de dados e gerando relatórios.

Faça um fork do projeto, crie uma nova branch com seu nome a partir da Master, desenvolva as telas apresentadas nas imagens que se encontram na pasta 'telas' deste repositório e submita um pull request no projeto.

Seja o mais fiel possível ao layout apresentado.
Respeite a estrutura de menus apresentada.
Caso necessário, consuma a APi fornecida para obter os dados necessários.




====================================================================================================================




# Rental Cars - Frontend Angular

Sistema de gerenciamento de aluguel de veículos desenvolvido com Angular 17.

## Requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior
- Angular CLI 17.x

## Instalação

Siga os passos abaixo para instalar e configurar o projeto:

1. Clone o repositório:
```bash
git clone <https://github.com/yuri2bdev/rental-cars-angular-web.git>
cd rental-cars-angular-web
```

2. Instale as dependências:
```bash
npm install
```

## Executando o Projeto

### Modo de Desenvolvimento com Proxy

O projeto utiliza um proxy para redirecionar as requisições da API. Para executar o projeto com o proxy:

```bash
npm run start
```

Este comando executa `ng serve --proxy-config proxy.conf.json`, que inicia o servidor de desenvolvimento na porta 4200 e configura o proxy para redirecionar as requisições de `/api/*` para o backend.

Acesse a aplicação em: http://localhost:4200

### Configuração do Proxy

O arquivo `proxy.conf.json` na raiz do projeto contém a configuração do proxy:

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

Esta configuração redireciona todas as requisições que começam com `/api` para `http://localhost:8080`.


## Estrutura do Projeto

```
src/
├── app/
│   ├── core/            # Componentes e serviços principais
│   │   ├── layout/      # Layout principal da aplicação
│   │   └── template/    # Componentes de template (header, footer, menu)
│   ├── feature/         # Módulos de funcionalidades
│   │   ├── relatorios/  # Módulo de relatórios
│   │   └── upload/      # Módulo de upload
│   └── shared/          # Componentes, serviços e utilitários compartilhados
├── assets/              # Recursos estáticos (imagens, fontes, etc.)
└── environments/        # Configurações de ambiente
```

## Funcionalidades Principais

- **Upload de Aluguéis**: Permite o upload de arquivos com informações de aluguéis.
- **Relatórios**: Visualização e exportação de relatórios de aluguéis e carros disponíveis.

## Integração com Backend

O frontend se comunica com um backend Spring Boot através de uma API REST. As principais rotas são:

- `/api/alugueis`: Gerenciamento de aluguéis
- `/api/carros`: Gerenciamento de carros
- `/api/relatorios`: Geração de relatórios

## Solução de Problemas

### Erro de CORS

Se você encontrar erros de CORS, verifique:

1. Se o servidor backend está em execução
2. Se o proxy está configurado corretamente
3. Se as configurações de CORS no backend estão corretas

### Erro 500 ao acessar endpoints da API

Verifique:

1. Se o servidor backend está em execução na porta 8080
2. Se os endpoints da API estão configurados corretamente no backend
3. Os logs do servidor para identificar o erro específico

## Tecnologias Utilizadas

- Angular 17
- PrimeNG (UI Components)
- PrimeFlex (CSS Utility Library)
- RxJS
- Angular CLI
