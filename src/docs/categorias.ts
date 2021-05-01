import { getResponse } from "./util";

const RESPONSES = {
  CATEGORIAS: {
    200: getResponse("Lista de categorias", "Categorias"),
  },
  CATEGORIA: {
    200: getResponse("Detalhes do post", "Categoria"),
  },
};

const PARAMETERS = {
  PATH: {
    name: "path",
    in: "path",
    required: true,
    description: "path da categoria",
  },
};

const tags = ["categorias"];

export const schema = {
  Categoria: {
    type: "object",
    properties: {
      path: { type: "string" },
      nome: { type: "string" },
      excluido: { type: "boolean" },
    },
  },
  Categorias: {
    type: "array",
    items: {
      $ref: "#/components/schemas/Categoria",
    },
  },
  CategoriaForm: {
    type: "object",
    properties: {
      path: { type: "string" },
      nome: { type: "string" },
    },
    required: ["path", "nome"],
  },
};

export const paths = {
  "/categorias": {
    get: {
      tags,
      description: "Obtém a lista completa de categorias",
      responses: RESPONSES.CATEGORIAS,
    },
    post: {
      tags,
      description: "Cadastra nova categoria",
      requestBody: {
        description: "Dados da categoria (todos os campos são obrigatórios)",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CategoriaForm",
            },
          },
        },
      },
      responses: RESPONSES.CATEGORIA,
    },
  },
  "/categorias/{path}": {
    delete: {
      tags,
      description: "Marca uma categoria como excluída",
      parameters: [PARAMETERS.PATH],
      responses: RESPONSES.CATEGORIA,
    },
  },
};
