import { Comentario } from "..";
import {
  resetComentariosDB,
  ComentarioRepository,
} from "../ComentarioRepository";

const repository = new ComentarioRepository();

beforeEach(() => {
  resetComentariosDB();
});

describe("Listar comentários", () => {
  it("Sucesso", () => {
    expect(
      repository.listar("021f115e-a8fc-11eb-bcbc-0242ac130002")
    ).toHaveLength(2);
  });
});

describe("Salvar comentário", () => {
  const input: Comentario = {
    idPai: "e49bc914-a8f2-11eb-bcbc-0242ac130002",
    timestamp: 1619708549910,
    corpo: "corpo",
    autor: "autor",
    nota: 0,
  };

  it("Cadastra novo comentário", () => {
    expect(repository.salvar(input).id).toBeDefined();
  });

  it("Não salva, idPai inexistente", () => {
    const inputInvalido: Comentario = { ...input, idPai: "" };
    expect(repository.salvar(inputInvalido).id).toBeUndefined();
  });

  it("Atualiza comentário existente", () => {
    const comentario = repository.salvar(input);
    const comentarioAtualizado = repository.salvar({
      ...comentario,
      corpo: "corpo 2",
    });

    expect(comentario.id).toEqual(comentarioAtualizado.id);
    expect(comentario.corpo).toEqual("corpo");
    expect(comentarioAtualizado.corpo).toEqual("corpo 2");
  });
});

describe("Excluir comentario", () => {
  it("Exclui comentário pelo id", () => {
    expect(repository.excluir("66e87710-a9c9-11eb-bcbc-0242ac130002")).toBe(
      "66e87710-a9c9-11eb-bcbc-0242ac130002"
    );
  });

  it("Não exclui, id inexistente", () => {
    expect(repository.excluir("id-inexistente")).toBe("");
  });
});

describe("Excluir lista comentários", () => {
  it("Exclui lista completa", () => {
    expect(
      repository.excluirPorPai("021f115e-a8fc-11eb-bcbc-0242ac130002")
    ).toBe(2);
  });

  it("Não exclui, não existem comentários para o idPai", () => {
    expect(repository.excluirPorPai("pai-inexistente")).toBe(0);
  });
});
