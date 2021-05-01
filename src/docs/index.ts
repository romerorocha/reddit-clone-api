import * as categorias from "./categorias";
import * as posts from "./posts";
import * as comentarios from "./comentarios";

const apiDocs = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Forum API",
    description:
      "API de backend de aplicação estilo Reddit, HackerNews ou StackOverflow.",
    license: {
      name: "ISC",
      url: "http://opensource.org/licenses/ISC",
    },
  },
  security: [{ bearerAuth: [] }],
  servers: [{ url: "http://localhost:3001/", description: "Servidor Local" }],
  tags: [{ name: "categorias" }, { name: "posts" }, { name: "comentarios" }],
  paths: {
    ...categorias.paths,
    ...posts.paths,
    ...comentarios.paths,
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer" },
    },
    schemas: {
      ...categorias.schema,
      ...posts.schema,
      ...comentarios.schema,
      Error: {
        type: "object",
        properties: {
          status: { type: "integer" },
          nome: { type: "string" },
          mensagem: { type: "string" },
        },
      },
    },
  },
};

export default apiDocs;
