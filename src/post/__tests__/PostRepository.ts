import { PostRepository } from "..";
import { resetPostsDB } from "../PostRepository";

const repository = new PostRepository();

beforeEach(() => {
  resetPostsDB();
});

describe("Listar posts", () => {
  it("Lista todos os posts", () => {
    expect(repository.listar()).toHaveLength(3);
  });
});

describe("Obter post pelo id", () => {
  it("Obtém um post pelo id", () => {
    const id = "021f115e-a8fc-11eb-bcbc-0242ac130002";
    const post = repository.obterPorId(id);

    expect(post.id).toBe(id);
    expect(post.titulo).toBe("They're taking the Hobbits to Isengard!");
  });

  it("Não obtém, post com id não existe", () => {
    expect(repository.obterPorId("id-inexistente")).toBeUndefined();
  });
});

describe("Salvar post", () => {
  const input = {
    timestamp: 1619704748161,
    titulo: "titulo",
    corpo: "corpo",
    autor: "autor",
    categoria: "categoria",
    nota: 0,
    numeroComentarios: 0,
  };

  it("Cadastra novo post", () => {
    expect(repository.salvar(input).id).toBeDefined();
  });

  it("Atualiza post existente", () => {
    const post = repository.salvar(input);
    const postAtualizado = repository.salvar({ ...post, titulo: "titulo 2" });

    expect(post.id).toEqual(postAtualizado.id);
    expect(post.titulo).toEqual("titulo");
    expect(postAtualizado.titulo).toEqual("titulo 2");
  });
});

describe("Excluir post", () => {
  it("Exclui post pelo id", () => {
    expect(repository.excluir("021f115e-a8fc-11eb-bcbc-0242ac130002")).toBe(
      "021f115e-a8fc-11eb-bcbc-0242ac130002"
    );
  });

  it("Não exclui, id inexistente", () => {
    expect(repository.excluir("id-inexistente")).toBe("");
  });
});
