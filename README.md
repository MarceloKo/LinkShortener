# Desafio de Pós-Graduação – Brev.ly

O **Brev.ly** é um encurtador de URLs de alta performance, desenvolvido com foco em uma arquitetura, documentação clara e validações rigorosas em todas as camadas da aplicação.

---

## 📚 Visão Geral

Este repositório contém:

- **Back-end**  
  - Linguagem: TypeScript  
  - Framework: Fastify  
  - ORM: Drizzle  
  - Banco de dados: PostgreSQL  

- **Front-end**  
  - Framework: React (gerado com Vite)  
  - Estilização: Tailwind CSS  

---

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- Node.js (v16 ou superior)  
- Yarn ou npm  
- Docker & Docker Compose (opcional, para execução em contêineres)  
- Conta e credenciais para armazenamento de CSV em CDN (S3, R2, etc.)

---

## 🛠️ Instalação

1. **Clone o repositório**  
   ```bash
   git clone https://github.com/seu-usuario/brev.ly.git
   cd brev.ly
   ```
2. ** Instale as dependências **
    ```bash
    # Usando Yarn
    yarn install

    # Ou usando npm
    npm install
    ```
3. ** Clone as variaveis de ambiente **
    Copie o arquivo .env.example e renomeie para .env, alterando as informações dentro.