export { PostService } from "./PostService";
export { PostRepository } from "./PostRepository";

export type PostType = {
  id?: string;
  titulo: string;
  corpo: string;
  autor: string;
  categoria: string;
  timestamp: number;
  nota: number;
  numeroComentarios: number;
};

export type PostsType = {
  [key: string]: PostType;
};

export type PostsPage = {
  posts: PostType[];
  pagina: number;
  tamanho: number;
  total: number;
};

export type PostParams = Pick<
  PostType,
  "titulo" | "corpo" | "autor" | "categoria"
>;
