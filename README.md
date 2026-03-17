# 🚀 Fatec Connection

Uma API RESTful para gerenciamento de cursos, lições e matrículas no ambiente acadêmico da FATEC.

## O que é?

O **Fatec Connection** é uma plataforma que conecta professores e alunos, facilitando o gerenciamento de atividades acadêmicas. Professores podem criar cursos, lições e gerenciar matrículas, enquanto alunos podem submeter suas atividades para correção.

## Funcionalidades

### Para Professores
- ✅ Criar e gerenciar cursos
- ✅ Criar lições com datas de entrega
- ✅ Matricular alunos nos cursos
- ✅ Corrigir submissões dos alunos
- ✅ Autenticação segura com JWT

### Para Alunos
- ✅ Visualizar cursos matriculados
- ✅ Submeter lições para correção
- ✅ Receber feedback das submissões
- ✅ Autenticação segura com JWT

## Começando

### Pré-requisitos
- Node.js (versão 18+)
- pnpm (gerenciador de pacotes)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/AlvaroSena/fatec-teams.git

# Entre na pasta do projeto
cd fatec-teams

# Instale as dependências
pnpm install
```

### Rodando o projeto

```bash
# Modo desenvolvimento
pnpm dev
```

O servidor estará disponível em:
- API: `http://localhost:8080/v1`
- Documentação: `http://localhost:8080/docs`

## Tecnologias

- **Node.js** — Runtime JavaScript
- **TypeScript** — Linguagem tipada
- **Express** — Framework web
- **Drizzle ORM** — Banco de dados
- **PostgreSQL** — Banco de dados
- **JWT** — Autenticação
- **Swagger/OpenAPI** — Documentação

## Estrutura

```
src/
├── core/           # Classes base e utilitários
├── domain/        # Regras de negócio (DDD)
│   ├── application/   # Use cases e interfaces
│   └── enterprise/   # Entidades do domínio
└── infra/          # Implementações externas
    ├── drizzle/      # Repositórios DB
    └── http/         # Controllers e rotas
```

## Licença

ISC
