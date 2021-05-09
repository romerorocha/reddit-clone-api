import { spy, when } from "ts-mockito";
import { PostRepository, PostService, PostType } from "..";
// import { ComentarioRepository } from "../../comentario";

let service: PostService;
let repositorySpy: PostRepository;
// let comentarioRepositorySpy: ComentarioRepository;
let post: PostType;

beforeAll(() => {
  post = {
    id: "1",
    timestamp: 1619704748161,
    titulo: "titulo",
    corpo: "corpo",
    autor: "autor",
    categoria: "categoria",
    nota: 0,
    numeroComentarios: 0,
  };
  service = new PostService();
  repositorySpy = spy(service.repository);
  // comentarioRepositorySpy = spy(service.comentarioRepository);
});

describe("Listar posts", () => {
  it("Lista todos os posts", () => {
    when(repositorySpy.listar()).thenReturn([post]);
    expect(service.listar()).toEqual([post]);
  });

  it("Lista posts de uma categoria", () => {
    when(repositorySpy.listar()).thenReturn([post]);
    expect(service.listarPorCategoria("categoria")).toEqual([post]);
  });

  it("Lista vazia para categoria sem posts", () => {
    when(repositorySpy.listar()).thenReturn([post]);
    expect(service.listarPorCategoria("sda")).toHaveLength(0);
  });
});

describe("Obter post", () => {
  it("Obter por id", () => {
    const id = "1";
    when(repositorySpy.obterPorId(id)).thenReturn(post);
    expect(service.obterPorId(id)).toEqual(post);
  });

  it("Obter por id não encontra post", () => {
    const id = "2";
    when(repositorySpy.obterPorId(id)).thenReturn(undefined);
    try {
      service.obterPorId(id);
      fail();
    } catch (error) {
      expect(error.message).toEqual("Registro '2' não existe.");
    }
  });
});
