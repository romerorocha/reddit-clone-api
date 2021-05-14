import PostService from "./PostService";
import PostRepository from "./PostRepository";

type PostType = {
  id?: string;
  titulo: string;
  corpo: string;
  autor: string;
  categoria: string;
  timestamp: number;
  nota: number;
  numeroComentarios: number;
};

type PostsType = {
  [key: string]: PostType;
};

type PostsPage = {
  posts: PostType[];
  pagina: number;
  tamanho: number;
  total: number;
};

type PostParams = Pick<PostType, "titulo" | "corpo" | "autor" | "categoria">;

export {
  PostType,
  PostsType,
  PostsPage,
  PostParams,
  PostService,
  PostRepository,
};
