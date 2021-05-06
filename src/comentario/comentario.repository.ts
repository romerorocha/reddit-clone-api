import { IComentario, IComentarios } from "./comentario";
import { v1 as uuidv1 } from "uuid";

export const comentarios: IComentarios = {
  "e49bc914-a8f2-11eb-bcbc-0242ac130002": {
    "b54ef100-a9c8-11eb-bcbc-0242ac130002": {
      id: "b54ef100-a9c8-11eb-bcbc-0242ac130002",
      idPai: "e49bc914-a8f2-11eb-bcbc-0242ac130002",
      timestamp: 1619708549910,
      corpo: "De novo essa história, Merry???",
      autor: "Frodo",
      nota: 300,
    },
  },
  "021f115e-a8fc-11eb-bcbc-0242ac130002": {
    "66e87710-a9c9-11eb-bcbc-0242ac130002": {
      id: "66e87710-a9c9-11eb-bcbc-0242ac130002",
      idPai: "021f115e-a8fc-11eb-bcbc-0242ac130002",
      timestamp: 1619796859780,
      corpo:
        "...gard-gard-gard-gard-gard-gard-gard-gard-gard-gard-gard-gard-gard-gard-gard-gard-gard...",
      autor: "P1pp1n_the_Tr0ll",
      nota: -15,
    },
    "aa5e13a6-a9c9-11eb-bcbc-0242ac130002": {
      id: "aa5e13a6-a9c9-11eb-bcbc-0242ac130002",
      idPai: "021f115e-a8fc-11eb-bcbc-0242ac130002",
      timestamp: 1619796889092,
      corpo: "Tûk tolo!!!",
      autor: "Gandalf, o Cinzento",
      nota: 0,
    },
  },
};

export class ComentarioRepository {
  public obter(id: string): any {
    let comentario;

    for (const idPai in comentarios) {
      if (comentarios[idPai][id]) {
        comentario = comentarios[idPai][id];
        break;
      }
    }

    return comentario;
  }

  public listar(idPai: string): IComentario[] {
    if (!idPai || !comentarios[idPai]) {
      return [];
    }

    return Object.values(comentarios[idPai]);
  }

  public salvar = (comentario: IComentario) => {
    let { id, idPai } = comentario;

    id = id ?? uuidv1();
    if(!comentarios[idPai]) {
      comentarios[idPai] =  {}
    }
    comentarios[idPai][id] = { ...comentario, id };

    return comentarios[idPai][id];
  };

  public excluir = (id: string): string => {
    const comentario = this.obter(id);

    if (comentario) {
      delete comentarios[comentario.idPai][id];
      return id;
    }

    return "";
  };

  public excluirPorPai = (idPai: string) => {
    if (idPai) {
      delete comentarios[idPai];
    }
  };
}
