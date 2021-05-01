import { getResponse } from "./util";

const RESPONSES = {
  POSTS: {
    200: getResponse("Lista de posts", "Posts"),
  },
  POST: {
    200: getResponse("Detalhes do post", "Post"),
  },
};

const PARAMETERS = {
  ID: {
    name: "id",
    in: "path",
    required: true,
    description: "id do post",
  },
  CATEGORIA: {
    name: "categoria",
    in: "query",
    required: false,
    description: "filtro por categoria",
  },
};

const tags = ["posts"];

export const schema = {
  Post: {
    type: "object",
    properties: {
      id: { type: "string" },
      timestamp: { type: "integer" },
      titulo: { type: "string" },
      corpo: { type: "string" },
      autor: { type: "string" },
      categoria: { type: "string" },
      nota: { type: "integer" },
      excluido: { type: "boolean" },
      numeroComentarios: { type: "integer" },
    },
  },
  Posts: {
    type: "array",
    items: {
      $ref: "#/components/schemas/Post",
    },
  },
  PostForm: {
    type: "object",
    properties: {
      titulo: { type: "string" },
      corpo: { type: "string" },
      autor: { type: "string" },
      categoria: { type: "string" },
    },
    required: ["titulo", "corpo", "autor", "categoria"],
  },
  PostVoto: {
    type: "object",
    properties: {
      opcao: { type: "string" },
    },
    required: ["opcao"],
  },
};

export const paths = {
  "/posts": {
    get: {
      tags,
      description:
        "Obtém a lista de posts, completa ou com filtro por categoria.",
      parameters: [PARAMETERS.CATEGORIA],
      responses: RESPONSES.POSTS,
    },
    post: {
      tags,
      description: "Cadastra novo post",
      requestBody: {
        description: "Dados do post (todos os campos são obrigatórios)",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/PostForm",
            },
          },
        },
      },
      responses: RESPONSES.POST,
    },
  },
  "/posts/{id}": {
    get: {
      tags,
      description: "Obtém post com o ID informado",
      parameters: [PARAMETERS.ID],
      responses: RESPONSES.POST,
    },
    put: {
      tags,
      description: "Atualiza os dados de um post",
      parameters: [PARAMETERS.ID],
      requestBody: {
        description: "Dados do post (todos os dados são obrigatórios)",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/PostForm",
            },
          },
        },
      },
      responses: RESPONSES.POST,
    },
    delete: {
      tags,
      description: "Marca um post como excluído",
      parameters: [PARAMETERS.ID],
      responses: RESPONSES.POST,
    },
  },
  "/posts/{id}/votar": {
    put: {
      tags,
      description: "Incrementa ou decrementa o score de votos de um post",
      parameters: [PARAMETERS.ID],
      requestBody: {
        description: '"positivo" ou "negativo"',
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/PostVoto",
            },
          },
        },
      },
      responses: RESPONSES.POST,
    },
  },
};
