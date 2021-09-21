import clone from "clone";
import { v1 as uuidv1 } from "uuid";

import { UserPost, Posts } from ".";

const init: Posts = {
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
  "cfa609dc-1ad2-11ec-9621-0242ac130002": {
    id: "cfa609dc-1ad2-11ec-9621-0242ac130002",
    timestamp: 1632225380870,
    titulo: "React Hooks vs. React HOCs",
    corpo:
      'O primeiro é um recurso que nós podemos utilizar exclusivamente com componentes do tipo "função". O segundo, é um padrão que aplicamos para com qualquer componente. Mas, mesmo assim, prefiro os hooks!',
    autor: "Aluno de opinião forte",
    categoria: "react",
    nota: 7,
    numeroComentarios: 0,
  },
  "bf977ae8-1ad3-11ec-9621-0242ac130002": {
    id: "bf977ae8-1ad3-11ec-9621-0242ac130002",
    timestamp: 1632225712638,
    titulo: "Gerenciamento de estado em React",
    corpo:
      'Sinceramente, espero que chegue logo no módulo sobre Redux. Não aguento mais ficar declarando estado em componente "pai" ou "avô", só para compartilhar em um passa e repassa de props.',
    autor: "Aluno mimizento",
    categoria: "react",
    nota: -2,
    numeroComentarios: 0,
  },
  "269b9fc6-1ad4-11ec-9621-0242ac130002": {
    id: "269b9fc6-1ad4-11ec-9621-0242ac130002",
    timestamp: 1632225890371,
    titulo: "React e a imutabilidade",
    corpo:
      "Ainda tenho algumas dúvidas sobre o assunto e, às vezes, me confundo e meto a mão diretamente no objeto do estado. Mas, aos poucos, tem entrado na minha cabeça, essa coisa de imutabilidade. Não é que faz sentido? Começando a costar. Por sinal, alguém aí tem um material bom, para aprofundar no assunto?",
    autor: "Aluna dedicada",
    categoria: "react",
    nota: 58,
    numeroComentarios: 0,
  },
  "eb1dbaaa-1ad4-11ec-9621-0242ac130002": {
    id: "eb1dbaaa-1ad4-11ec-9621-0242ac130002",
    timestamp: 1632226217345,
    titulo: "Bibliotecas de componentes de UI para React",
    corpo:
      "Gostaria de fazer uma análise comparativa sobre bibliotecas de componentes de UI em React, como Material-UI, Semantic UI React, Bootstrap React e afins. Alguém aí sugere alguma outra, para também entrar na lista?",
    autor: "Aluna blogueirinha",
    categoria: "react",
    nota: 4,
    numeroComentarios: 0,
  },
  "9a0a3c1e-1ad5-11ec-9621-0242ac130002": {
    id: "9a0a3c1e-1ad5-11ec-9621-0242ac130002",
    timestamp: 1632226517463,
    titulo: "Gerenciamento de forms em React",
    corpo:
      "Qual lib vocês recomendam, para trabalhar com forms em React? Muita gente fala de Formik, outros ainda colocam Formik + Yup, outros ainda preferem a lib React Hook Form. Já me disseram que redux-forms é um antipattern e deve ser evitado. Aceitando sugestões :)",
    autor: "exploradora_de_libs",
    categoria: "react",
    nota: 6,
    numeroComentarios: 0,
  },
};

let posts = clone(init);

export const resetPostsDB = () => {
  posts = clone(init);
};

export class PostRepository {
  public listar(): UserPost[] {
    return Object.values(posts);
  }

  public obterPorId = (id: string): any => {
    return posts[id];
  };

  public salvar = (post: UserPost): UserPost => {
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
