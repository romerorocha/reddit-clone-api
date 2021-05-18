import clone from "clone";
import { v1 as uuidv1 } from "uuid";
import { PostType, PostsType } from ".";

const init: PostsType = {
  "e49bc914-a8f2-11eb-bcbc-0242ac130002": {
    id: "e49bc914-a8f2-11eb-bcbc-0242ac130002",
    timestamp: 1619704748161,
    titulo: "Por que as águias não os levaram logo até o destino?",
    corpo: "Eita perguntinha chata, ein? Ok, vou explicar. Era uma vez...",
    autor: "Merry_D0_C0Nd4d0",
    categoria: "senhor-dos-aneis",
    nota: -10,
    numeroComentarios: 1,
  },
  "021f115e-a8fc-11eb-bcbc-0242ac130002": {
    id: "021f115e-a8fc-11eb-bcbc-0242ac130002",
    timestamp: 1619796849227,
    titulo: "They're taking the Hobbits to Isengard!",
    corpo:
      "They're taking the Hobbits to Isengard-gard-gard-gard-gard-gard-gard-gard-gard-gard-gard-gard-gard-gard-gard-gard!",
    autor: "Legolas_JP",
    categoria: "senhor-dos-aneis",
    nota: 12,
    numeroComentarios: 2,
  },
  "efa6a84c-a8f2-11eb-bcbc-0242ac130002": {
    id: "efa6a84c-a8f2-11eb-bcbc-0242ac130002",
    timestamp: 1619704768150,
    titulo: "Como aprender React & Redux em 24 horas",
    corpo: "Se alguém souber como, me avise, que eu não sei! :D",
    autor: "Serverino Portões",
    categoria: "react",
    nota: 5,
    numeroComentarios: 0,
  },
};

let posts = clone(init);

export const resetPostsDB = () => {
  posts = clone(init);
};

export class PostRepository {
  public listar(): PostType[] {
    return Object.values(posts);
  }

  public obterPorId = (id: string): any => {
    return posts[id];
  };

  public salvar = (post: PostType): PostType => {
    const id = post.id ?? uuidv1();
    posts[id] = { ...post, id };
    return posts[id];
  };

  public excluir = (id: string): string => {
    if (posts[id]) {
      delete posts[id];
      return id;
    }
    return "";
  };
}
