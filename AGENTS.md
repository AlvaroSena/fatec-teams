# Fatec Connection - Documentação do Projeto

## Visão Geral

Este é um projeto Node.js desenvolvido com TypeScript, utilizando Clean Architecture e Domain-Driven Design (DDD).

## Stack

- **Runtime**: Node.js
- **Gerenciador de pacotes**: pnpm
- **Linguagem**: TypeScript 5.9.3
- **Execução**: tsx (TypeScript Execute)
- **Linting/Formatting**: Biome 2.4.7

## Comandos

```bash
# Instalar dependências
pnpm install

# Executar projeto em modo watch
pnpm dev

# Verificar lint
pnpm lint

# Formatar código
pnpm format
```

## Convenções de Código

- **Indentação**: 2 espaços
- **Aspas**: duplas
- **Pontos e vírgulas**: sempre
- **Naming**: camelCase para variáveis e funções, PascalCase para classes e tipos

## Arquitetura

```
src/
├── core/
│   ├── entitites/        # Classes base (Entity, UniqueEntityId)
│   ├── errors/           # Erros base (UseCaseError)
│   └── logic/            # Utilitários (Either pattern)
├── domain/
│   ├── application/
│   │   ├── errors/       # Erros específicos dos use cases
│   │   ├── repositories/ # Interfaces de repositórios
│   │   └── use-cases/    # Casos de uso
│   └── enterprise/
│       └── entities/     # Entidades do domínio
│           └── values-objects/  # Value Objects
```

## Commits

O projeto utiliza Conventional Commits. Exemplos de tipos:

- `feat`: nova funcionalidade
- `fix`: correção de bug
- `chore`: tarefas de manutenção

Extensão recomendada: [Biome para VS Code](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

## Dependências de Desenvolvimento

- `@biomejs/biome`: Linting e formatação
- `@types/node`: Tipos TypeScript para Node.js
- `tsx`: Execução de TypeScript
- `typescript`: Compilador TypeScript
