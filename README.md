# 📚 Sistema de Preservação Digital

Este projeto é uma aplicação fullstack para gestão e preservação de documentos PDF, construída com **React**, **NestJS**, **Prisma** e **PostgreSQL**. Os arquivos são atualmente salvos localmente, simulando a integração com o **Archivematica**.

## 🚀 Tecnologias Utilizadas

### Frontend
- React + Vite
- CSS

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- Multer (upload de arquivos)

## 📁 Estrutura do Projeto

```
/desafio-ledgertec
├── frontend/        # Aplicação React
├── backend/         # API NestJS + Prisma
├── docker-compose.yml
├── README.md
└── .env.example
```

## 🔐 Autenticação

- Sistema de login com e-mail e senha
- Cadastro de novo usuário

## 🏠 Tela Inicial (Dashboard)

A dashboard exibe uma tabela com os documentos preservados, permitindo:
- Buscar por nome/metadado
- Filtrar por intervalo de datas
- Baixar documentos diretamente
- Visualizar detalhes
- Preservar novo documento (via modal)

## 📤 Preservar Novo Documento

Via modal, o usuário pode:
- Fazer upload de um PDF
- Preencher 4 metadados: `author`, `category`, `type`, `size`
- Submeter o documento

**No backend:**
- O arquivo é salvo em `/uploads`
- Os metadados são armazenados no banco

## 📥 Download de Documento

- Possível via botão direto na dashboard ou na tela de detalhes
- Endpoint GET `/documents/:filename` retorna o PDF
- Exemplo: `GET /documents/1713376450000-meuarquivo.pdf`

## 📄 Modelo da Tabela de Documentos

```prisma
model Document {
  id        Int      @id @default(autoincrement())
  filename  String   @unique
  author    String
  category  String
  type      String
  size      String
  createdAt DateTime @default(now())
}
```

## 🐳 Docker

### Comandos

```bash
# Subir aplicação
docker-compose up --build

# Criar base de dados (se necessário)
npx prisma migrate dev --name init
```

## 🛠 Variáveis de Ambiente

Veja `.env.example` para as configurações necessárias:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/database_name
PORT=3000
```

## 📦 Considerações Finais

> A integração real com o Archivematica **não foi implementada**. Os arquivos são armazenados localmente. A estrutura e endpoints estão prontos para futura integração.

---
© 2025 - Desafio Técnico LedgerTec
