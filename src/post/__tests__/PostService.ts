import { ErroRegistroInexistente } from "common/erros";
import { spy, when, deepEqual, verify, notNull } from "ts-mockito";
import { OpcaoVoto } from "common/types";
import { PostRepository, PostService } from "..";
import { ComentarioRepository } from "../../comentario";

let service: PostService;
let repositorySpy: PostRepository;
let comentarioRepositorySpy: ComentarioRepository;

const POST_ID = "1";
let post = {
  id: POST_ID,
  timestamp: 1619704748161,
  titulo: "titulo",
  corpo: "corpo",
  autor: "autor",
  categoria: "categoria",
  nota: 0,
  numeroComentarios: 0,
};

beforeEach(() => {
  service = new PostService();
  repositorySpy = spy(service.repository);
  comentarioRepositorySpy = spy(service.comentarioRepository);
});

describe("Listar posts", () => {
  it("Lista todos os posts", () => {
    when(repositorySpy.listar()).thenReturn([post]);
    expect(service.listar()).toEqual([post]);
  });

  it("deveria listar posts de uma categoria", () => {
    when(repositorySpy.listar()).thenReturn([post]);
    expect(service.listarPorCategoria("categoria")).toEqual([post]);
  });

  it("deveria retornar lista vazia para categoria sem posts", () => {
    when(repositorySpy.listar()).thenReturn([post]);
    expect(service.listarPorCategoria("sda")).toHaveLength(0);
  });

  it("deveria retornar primeira página de lista", () => {
    when(repositorySpy.listar()).thenReturn(Array(12).fill(post));
    const { posts, pagina, tamanho, total } = service.listarPaginado(0, 5);
    expect(posts).toHaveLength(5);
    expect(pagina).toBe(0);
    expect(tamanho).toBe(5);
    expect(total).toBe(12);
  });

  it("deveria retornar primeira página de lista de categoria", () => {
    when(repositorySpy.listar()).thenReturn(Array(12).fill(post));
    const postsCategoria = service.listarPaginado(0, 5, "categoria");
    const { posts, pagina, tamanho, total } = postsCategoria;
    expect(posts).toHaveLength(5);
    expect(pagina).toBe(0);
    expect(tamanho).toBe(5);
    expect(total).toBe(12);
  });

  it("deveria retornar última página de lista", () => {
    when(repositorySpy.listar()).thenReturn(Array(12).fill(post));
    const { posts, pagina, tamanho, total } = service.listarPaginado(2, 5);
    expect(posts).toHaveLength(2);
    expect(pagina).toBe(2);
    expect(tamanho).toBe(5);
    expect(total).toBe(12);
  });

  it("deveria retornar página única de lista", () => {
    when(repositorySpy.listar()).thenReturn(Array(12).fill(post));
    const { posts, pagina, tamanho, total } = service.listarPaginado(0, 15);
    expect(posts).toHaveLength(12);
    expect(pagina).toBe(0);
    expect(tamanho).toBe(15);
    expect(total).toBe(12);
  });

  it("deveria retornar página vazia se passou limite", () => {
    when(repositorySpy.listar()).thenReturn(Array(12).fill(post));
    const { posts, pagina, tamanho, total } = service.listarPaginado(1, 15);
    expect(posts).toHaveLength(0);
    expect(pagina).toBe(1);
    expect(tamanho).toBe(15);
    expect(total).toBe(12);
  });
});

describe("Obter post", () => {
  it("deveria obter por id", () => {
    when(repositorySpy.obterPorId(POST_ID)).thenReturn(post);
    expect(service.obterPorId(POST_ID)).toEqual(post);
  });

  it("deveria obter por id não encontra post", () => {
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

describe("Salvar post", () => {
  it("deveria criar post", () => {
    const params = {
      titulo: "titulo",
      corpo: "corpo",
      autor: "autor",
      categoria: "categoria",
    };
    const timestamp = Date.now();
    const spy = jest.spyOn(Date, "now").mockImplementation(() => timestamp);
    const unsavedData = { ...params, timestamp, nota: 0, numeroComentarios: 0 };

    when(repositorySpy.salvar(deepEqual(unsavedData))).thenReturn(post);
    const novoPost = service.criar(params);
    expect(novoPost.id).toBe(POST_ID);

    spy.mockRestore();
  });

  it("deveria atualizar post", () => {
    const params = { titulo: "novo", corpo: "c", autor: "a", categoria: "c" };
    const novosDados = { ...post, ...params };

    when(repositorySpy.obterPorId(POST_ID)).thenReturn(post);
    when(repositorySpy.salvar(deepEqual(novosDados))).thenReturn(novosDados);
    const dadosGravados = service.atualizar(POST_ID, params);
    expect(dadosGravados.id).toBe(POST_ID);
    expect(dadosGravados.titulo).toBe("novo");
  });

  it("deveria lançar erro se post não existe", () => {
    const params = { titulo: "novo", corpo: "c", autor: "a", categoria: "c" };
    when(repositorySpy.obterPorId(POST_ID)).thenReturn(undefined);
    expect(() => service.atualizar(POST_ID, params)).toThrow(
      new ErroRegistroInexistente(POST_ID)
    );
  });
});

describe("Votar em post", () => {
  it("deveria incrementar contagem post", () => {
    const novosDados = { ...post, nota: 1 };
    when(repositorySpy.obterPorId(POST_ID)).thenReturn(post);
    when(repositorySpy.salvar(deepEqual(novosDados))).thenReturn(novosDados);
    const dadosGravados = service.votar(POST_ID, { opcao: OpcaoVoto.positivo });
    expect(dadosGravados.nota).toBe(1);
  });

  it("deveria decrementar contagem post", () => {
    const novosDados = { ...post, nota: -1 };
    when(repositorySpy.obterPorId(POST_ID)).thenReturn(post);
    when(repositorySpy.salvar(deepEqual(novosDados))).thenReturn(novosDados);
    const dadosGravados = service.votar(POST_ID, { opcao: OpcaoVoto.negativo });
    expect(dadosGravados.nota).toBe(-1);
  });

  it("deveria lançar erro se post não existe", () => {
    when(repositorySpy.obterPorId(POST_ID)).thenReturn(undefined);
    expect(() => service.votar(POST_ID, { opcao: OpcaoVoto.positivo })).toThrow(
      new ErroRegistroInexistente(POST_ID)
    );
  });
});

describe("Excluir post", () => {
  it("deveria excluir post existente", () => {
    when(repositorySpy.obterPorId(POST_ID)).thenReturn(post);
    when(repositorySpy.excluir(POST_ID)).thenResolve();
    when(comentarioRepositorySpy.excluirPorPai(POST_ID)).thenResolve();
    service.excluir(POST_ID);
    verify(comentarioRepositorySpy.excluirPorPai(POST_ID));
    verify(repositorySpy.excluir(POST_ID));
  });
});

describe("Atualizar contador comentários", () => {
  it("deveria incrementar contador com numero informado", () => {
    const atualizado = {
      ...post,
      numeroComentarios: post.numeroComentarios + 5,
    };
    when(repositorySpy.obterPorId(POST_ID)).thenReturn(post);
    when(repositorySpy.salvar(deepEqual(atualizado))).thenResolve();
    service.atualizarContadorComentarios(POST_ID, 5);
    verify(repositorySpy.salvar(deepEqual(atualizado)));
  });

  it("não deveria incrementar contador post inexistente", () => {
    when(repositorySpy.obterPorId(POST_ID)).thenReturn(undefined);
    service.atualizarContadorComentarios(POST_ID, 5);
    verify(repositorySpy.salvar(notNull())).never();
  });
});
