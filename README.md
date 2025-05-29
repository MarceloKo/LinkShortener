# Desafio de Pós-Graduação – Brev.ly

O **Brev.ly** é um encurtador de URLs de alta performance, desenvolvido com foco em uma arquitetura simples e aproveitando o máximos das stacks.


## 💻 Tecnologias

Este repositório contém:

- **Back-end**  
  - Linguagem: TypeScript  
  - Framework: Fastify  
  - ORM: Drizzle  
  - Banco de dados: PostgreSQL  

- **Front-end**  
  - Framework: React (gerado com Vite)  
  - Estilização: Tailwind CSS  

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- Node.js (v16 ou superior)  
- Yarn ou npm  
- Docker & Docker Compose (opcional, para execução em contêineres)  
- Conta e credenciais para armazenamento de CSV em CDN (S3, R2, etc.)


## 🛠️ Instalação

1. **Clone o repositório**  
   ```bash
   git clone https://github.com/MarceloKo/LinkShortener.git
   cd LinkShortener
   ```
2. **Instale as dependências**
    ```bash
    # Usando Yarn
    yarn install

    # Ou usando npm
    npm install
    ```
3. **Docker compose**  
    Caso precise de um banco de dados é possivel levantar um local.
     ```bash
     docker-compose up -d
     ```
4. **Clone as variaveis de ambiente**  
    Copie o arquivo .env.example e renomeie para .env alterando as informações dentro, no frontend e backend.

5. **Execute o projeto**
    ```bash
    # Usando Yarn
    yarn dev

    # Ou usando npm
    npm run dev
    ```
