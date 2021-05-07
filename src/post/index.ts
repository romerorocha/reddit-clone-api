import { PostService } from "./PostService";
import { PostRepository } from "./PostRepository";

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

type PostParams = Pick<PostType, "titulo" | "corpo" | "autor" | "categoria">;

export { PostType, PostsType, PostParams, PostService, PostRepository };
