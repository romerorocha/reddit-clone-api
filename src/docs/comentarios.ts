import { getResponse } from "./util";

const RESPONSES = {
  COMENTARIOS: {
    200: getResponse("Lista de comentarios", "Comentarios"),
  },
  COMENTARIO: {
    200: getResponse("Detalhes do comentario", "Comentario"),
  },
};

const PARAMETERS = {
  ID: {
    name: "id",
    in: "path",
    required: true,
    description: "id do comentario",
  },
  ID_PAI: {
    name: "idPai",
    in: "path",
    required: false,
    description: "id do post (ou comentário) pai dos comentários desejados",
  },
};

const tags = ["comentarios"];

export const schema = {
  Comentario: {
    type: "object",
    properties: {
      id: { type: "string" },
      idPai: { type: "string" },
      timestamp: { type: "integer" },
      corpo: { type: "string" },
      autor: { type: "string" },
      nota: { type: "integer" },
      excluido: { type: "boolean" },
      paiExcluido: { type: "boolean" },
    },
  },
  Comentarios: {
    type: "array",
    items: {
      $ref: "#/components/schemas/Comentario",
    },
  },
  ComentarioForm: {
    type: "object",
    properties: {
      corpo: { type: "string" },
      autor: { type: "string" },
      idPai: { type: "string" },
    },
    required: ["corpo", "autor", "idPai"],
  },
  ComentarioUpdate: {
    type: "object",
    properties: {
      corpo: { type: "string" },
    },
    required: ["corpo"],
  },
  ComentarioVoto: {
    type: "object",
    properties: {
      opcao: { type: "string" },
    },
    required: ["opcao"],
  },
};

export const paths = {
  "/comentarios": {
    post: {
      tags,
      description: "Cadastra novo comentario",
      requestBody: {
        description: "Dados do comentario (todos os campos são obrigatórios)",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ComentarioForm",
            },
          },
        },
      },
      responses: RESPONSES.COMENTARIO,
    },
  },
  "/comentarios/{idPai}": {
    get: {
      tags,
      description:
        "Obtém a lista de comentarios relacionados a um único parent id.",
      parameters: [PARAMETERS.ID_PAI],
      responses: RESPONSES.COMENTARIOS,
    },
  },
  "/comentarios/{id}": {
    put: {
      tags,
      description: "Atualiza os dados de um comentário",
      parameters: [PARAMETERS.ID],
      requestBody: {
        description: "Dados do comentario (todos os dados são obrigatórios)",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ComentarioUpdate",
            },
          },
        },
      },
      responses: RESPONSES.COMENTARIO,
    },
    delete: {
      tags,
      description: "Marca um comentario como excluído",
      parameters: [PARAMETERS.ID],
      responses: RESPONSES.COMENTARIO,
    },
  },
  "/comentarios/{id}/votar": {
    put: {
      tags,
      description: "Incrementa ou decrementa o score de votos de um comentario",
      parameters: [PARAMETERS.ID],
      requestBody: {
        description: '"positivo" ou "negativo"',
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ComentarioVoto",
            },
          },
        },
      },
      responses: RESPONSES.COMENTARIO,
    },
  },
};
