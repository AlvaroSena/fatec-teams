import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fatec Connection API",
      version: "1.0.0",
      description:
        "API para sistema de gerenciamento de cursos, lições e matrículas",
      contact: {
        name: "API Support",
        email: "support@fatecconnection.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080/v1",
        description: "Servidor de desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Token JWT obtido através do endpoint de autenticação",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Mensagem de erro",
            },
          },
        },
        ProfessorResponse: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "ID único do professor",
            },
            name: {
              type: "string",
              description: "Nome completo do professor",
            },
            email: {
              type: "string",
              format: "email",
              description: "E-mail institucional",
            },
            academicTitle: {
              type: "string",
              description: "Título acadêmico",
            },
          },
        },
        StudentResponse: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "ID único do aluno",
            },
            name: {
              type: "string",
              description: "Nome completo do aluno",
            },
            email: {
              type: "string",
              format: "email",
              description: "E-mail do aluno",
            },
            RA: {
              type: "string",
              description: "Registro de Aluno",
            },
          },
        },
        CourseResponse: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "ID único do curso",
            },
            name: {
              type: "string",
              description: "Nome do curso",
            },
            code: {
              type: "string",
              description: "Código do curso",
            },
            slug: {
              type: "string",
              description: "Slug do curso",
            },
            professorId: {
              type: "string",
              format: "uuid",
              description: "ID do professor responsável",
            },
          },
        },
        LessonResponse: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "ID único da lição",
            },
            courseId: {
              type: "string",
              format: "uuid",
              description: "ID do curso",
            },
            title: {
              type: "string",
              description: "Título da lição",
            },
            description: {
              type: "string",
              description: "Descrição da lição",
            },
            dueDate: {
              type: "string",
              format: "date",
              description: "Data de entrega",
            },
          },
        },
        EnrollmentResponse: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "ID único da matrícula",
            },
            courseId: {
              type: "string",
              format: "uuid",
              description: "ID do curso",
            },
            studentId: {
              type: "string",
              format: "uuid",
              description: "ID do aluno",
            },
          },
        },
        SubmissionResponse: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "ID único da submissão",
            },
            lessonId: {
              type: "string",
              format: "uuid",
              description: "ID da lição",
            },
            studentId: {
              type: "string",
              format: "uuid",
              description: "ID do aluno",
            },
            submittedAt: {
              type: "string",
              format: "date-time",
              description: "Data da submissão",
            },
            correctedAt: {
              type: "string",
              format: "date-time",
              description: "Data da correção",
            },
            grade: {
              type: "number",
              description: "Nota da submissão",
            },
            feedback: {
              type: "string",
              description: "Feedback da correção",
            },
          },
        },
        AuthTokenResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "Token JWT de autenticação",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      "/professors": {
        post: {
          tags: ["Professores"],
          summary: "Cadastrar professor",
          description: "Cria um novo cadastro de professor no sistema",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "password"],
                  properties: {
                    name: {
                      type: "string",
                      description: "Nome completo do professor",
                      example: "João Silva",
                    },
                    email: {
                      type: "string",
                      format: "email",
                      description:
                        "E-mail institucional (cps.sp.gov.br ou fatec.sp.gov.br)",
                      example: "joao.silva@fatec.sp.gov.br",
                    },
                    password: {
                      type: "string",
                      format: "password",
                      description: "Senha de acesso",
                      example: "senha123",
                    },
                    academicTitle: {
                      type: "string",
                      description: "Título acadêmico (opcional)",
                      example: "Doutor",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Professor criado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Professor criado com sucesso",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Erro de validação",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
            409: {
              description: "Professor já existe",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    error: "Professor já está cadastrado.",
                  },
                },
              },
            },
          },
        },
      },
      "/professors/sessions": {
        post: {
          tags: ["Professores"],
          summary: "Autenticar professor",
          description: "Autentica um professor e retorna um token JWT",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      description: "E-mail institucional do professor",
                      example: "joao.silva@fatec.sp.gov.br",
                    },
                    password: {
                      type: "string",
                      format: "password",
                      description: "Senha de acesso",
                      example: "senha123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Autenticação realizada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/AuthTokenResponse",
                  },
                },
              },
            },
            401: {
              description: "Credenciais inválidas",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    error: "Email ou senha inválidos.",
                  },
                },
              },
            },
          },
        },
      },
      "/students": {
        post: {
          tags: ["Alunos"],
          summary: "Cadastrar aluno",
          description: "Cria um novo cadastro de aluno no sistema",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "RA", "password"],
                  properties: {
                    name: {
                      type: "string",
                      description: "Nome completo do aluno",
                      example: "Maria Santos",
                    },
                    email: {
                      type: "string",
                      format: "email",
                      description: "E-mail do aluno",
                      example: "maria.santos@aluno.fatec.sp.gov.br",
                    },
                    RA: {
                      type: "string",
                      description: "Registro de Aluno",
                      example: "123456789",
                    },
                    password: {
                      type: "string",
                      format: "password",
                      description: "Senha de acesso",
                      example: "senha123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Aluno criado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Aluno criado com sucesso",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Erro de validação",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
            409: {
              description: "Aluno já existe",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    error: "Aluno já está cadastrado.",
                  },
                },
              },
            },
          },
        },
      },
      "/students/sessions": {
        post: {
          tags: ["Alunos"],
          summary: "Autenticar aluno",
          description: "Autentica um aluno e retorna um token JWT",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      description: "E-mail do aluno",
                      example: "maria.santos@aluno.fatec.sp.gov.br",
                    },
                    password: {
                      type: "string",
                      format: "password",
                      description: "Senha de acesso",
                      example: "senha123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Autenticação realizada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/AuthTokenResponse",
                  },
                },
              },
            },
            401: {
              description: "Credenciais inválidas",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    error: "Email ou senha inválidos.",
                  },
                },
              },
            },
          },
        },
      },
      "/courses": {
        post: {
          tags: ["Cursos"],
          summary: "Criar curso",
          description: "Cria um novo curso (requer autenticação de professor)",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "code"],
                  properties: {
                    name: {
                      type: "string",
                      description: "Nome do curso",
                      example: "Análise e Desenvolvimento de Sistemas",
                    },
                    code: {
                      type: "string",
                      description: "Código do curso",
                      example: "ADS",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Curso criado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Curso criado com sucesso",
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: "Não autenticado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    error: "Token is missing!",
                  },
                },
              },
            },
            404: {
              description: "Professor não encontrado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    error: "Professor não encontrado.",
                  },
                },
              },
            },
          },
        },
      },
      "/lessons": {
        post: {
          tags: ["Lições"],
          summary: "Criar lição",
          description:
            "Cria uma nova lição para um curso (requer autenticação de professor)",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["courseId", "title", "description", "dueDate"],
                  properties: {
                    courseId: {
                      type: "string",
                      format: "uuid",
                      description: "ID do curso",
                      example: "123e4567-e89b-12d3-a456-426614174000",
                    },
                    title: {
                      type: "string",
                      description: "Título da lição",
                      example: "Introdução a Programação",
                    },
                    description: {
                      type: "string",
                      description: "Descrição da lição",
                      example: "Conceitos básicos de programação",
                    },
                    dueDate: {
                      type: "string",
                      format: "date",
                      description: "Data de entrega da lição",
                      example: "2024-12-31",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Lição criada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Lição criada com sucesso",
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: "Não autenticado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    error: "Token is missing!",
                  },
                },
              },
            },
            404: {
              description: "Curso não encontrado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    error: "Curso não encontrado.",
                  },
                },
              },
            },
          },
        },
      },
      "/enrollments": {
        post: {
          tags: ["Matrículas"],
          summary: "Matricular aluno em curso",
          description:
            "Cria uma matrícula de um aluno em um curso (requer autenticação de professor)",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["courseId", "studentId"],
                  properties: {
                    courseId: {
                      type: "string",
                      format: "uuid",
                      description: "ID do curso",
                      example: "123e4567-e89b-12d3-a456-426614174000",
                    },
                    studentId: {
                      type: "string",
                      format: "uuid",
                      description: "ID do aluno",
                      example: "123e4567-e89b-12d3-a456-426614174001",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Matrícula criada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Matrícula criada com sucesso",
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: "Não autenticado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    error: "Token is missing!",
                  },
                },
              },
            },
            404: {
              description: "Curso ou aluno não encontrado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  examples: {
                    courseNotFound: {
                      value: {
                        error: "Curso não encontrado.",
                      },
                    },
                    studentNotFound: {
                      value: {
                        error: "Aluno não encontrado.",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/submissions": {
        post: {
          tags: ["Submissões"],
          summary: "Submeter lição",
          description: "Aluno submete uma lição para correção",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["lessonId", "studentId"],
                  properties: {
                    lessonId: {
                      type: "string",
                      format: "uuid",
                      description: "ID da lição",
                      example: "123e4567-e89b-12d3-a456-426614174002",
                    },
                    studentId: {
                      type: "string",
                      format: "uuid",
                      description: "ID do aluno",
                      example: "123e4567-e89b-12d3-a456-426614174001",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Submissão criada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Lição submetida com sucesso",
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "Lição ou aluno não encontrado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  examples: {
                    lessonNotFound: {
                      value: {
                        error: "Lição não encontrada.",
                      },
                    },
                    studentNotFound: {
                      value: {
                        error: "Aluno não encontrado.",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/submissions/{id}/correct": {
        patch: {
          tags: ["Submissões"],
          summary: "Corrigir submissão",
          description:
            "Professor corrige uma submissão de lição (requer autenticação)",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID da submissão",
              schema: {
                type: "string",
                format: "uuid",
                example: "123e4567-e89b-12d3-a456-426614174003",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["grade"],
                  properties: {
                    grade: {
                      type: "number",
                      minimum: 0,
                      maximum: 10,
                      description: "Nota da submissão (0-10)",
                      example: 8.5,
                    },
                    feedback: {
                      type: "string",
                      description: "Feedback da correção (opcional)",
                      example: "Ótimo trabalho! Continue assim.",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Submissão corrigida com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Submissão corrigida com sucesso",
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: "Não autenticado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    error: "Token is missing!",
                  },
                },
              },
            },
            404: {
              description: "Submissão não encontrada",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    error: "Lição não submetida.",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/app.ts"],
};

export const swaggerSetup = swaggerJsdoc(options);
