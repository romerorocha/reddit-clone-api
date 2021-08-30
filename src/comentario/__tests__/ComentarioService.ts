import { deepEqual, spy, verify, when } from "ts-mockito";

import { ComentarioRepository } from "comentario/ComentarioRepository";
import { ComentarioService } from "comentario/ComentarioService";
import { PostService } from "post";
import { OpcaoVoto } from "common/types";

const PARENT_ID = "1";
const COMENTARIO_ID = "1";

const comentario = {
  id: COMENTARIO_ID,
  idPai: PARENT_ID,
  timestamp: 1619708549910,
  corpo: "autor",
  autor: "corpo",
  nota: 0,
};

let post = {
  id: PARENT_ID,
  timestamp: 1619704748161,
  titulo: "titulo",
  corpo: "corpo",
  autor: "autor",
  categoria: "categoria",
  nota: 0,
  numeroComentarios: 1,
};

let service: ComentarioService;
let repositorySpy: ComentarioRepository;
let postServiceSpy: PostService;

beforeEach(() => {
  service = new ComentarioService();
  repositorySpy = spy(service.repository);
  postServiceSpy = spy(service.postService);
});

describe("Listar comentários", () => {
  it("deveria listar todos os comentários de um post", () => {
    when(repositorySpy.listar(PARENT_ID)).thenReturn([comentario]);
    expect(service.listar(PARENT_ID)).toEqual([comentario]);
  });
});

describe("Salvar comentário", () => {
  it("deveria criar comentário", () => {
    const params = {
      autor: "autor",
      corpo: "corpo",
    };

    const timestamp = Date.now();
    const spy = jest.spyOn(Date, "now").mockImplementation(() => timestamp);
    const unsavedData = { ...params, timestamp, nota: 0, idPai: PARENT_ID };

    when(repositorySpy.salvar(deepEqual(unsavedData))).thenReturn(comentario);
    when(postServiceSpy.obterPorId(PARENT_ID)).thenReturn(post);
    when(
      postServiceSpy.atualizarContadorComentarios(PARENT_ID, 1)
    ).thenResolve();

    const novoComentario = service.criar(PARENT_ID, params);
    expect(novoComentario.id).toBe(COMENTARIO_ID);

    spy.mockRestore();
  });

  it("deveria atualizar comentário", () => {
    const params = { autor: "autor 2", corpo: "corpo 2" };
    const novosDados = { ...comentario, ...params };

    when(repositorySpy.obter(COMENTARIO_ID)).thenReturn(comentario);
    when(repositorySpy.salvar(deepEqual(novosDados))).thenReturn(novosDados);
    const dadosGravados = service.atualizar(COMENTARIO_ID, params);
    expect(dadosGravados.id).toBe(COMENTARIO_ID);
    expect(dadosGravados.autor).toBe("autor 2");
  });
});

describe("Votar em comentário", () => {
  it("deveria incrementar nota", () => {
    const novosDados = { ...comentario, nota: 1 };
    when(repositorySpy.obter(COMENTARIO_ID)).thenReturn(comentario);
    when(repositorySpy.salvar(deepEqual(novosDados))).thenReturn(novosDados);
    const dadosGravados = service.votar(COMENTARIO_ID, {
      opcao: OpcaoVoto.positivo,
    });
    expect(dadosGravados.nota).toBe(1);
  });
});

describe("Excluir comentário", () => {
  it("deveria excluir comentário existente", () => {
    when(repositorySpy.obter(COMENTARIO_ID)).thenReturn(comentario);
    when(repositorySpy.excluir(COMENTARIO_ID)).thenResolve();
    when(
      postServiceSpy.atualizarContadorComentarios(PARENT_ID, -1)
    ).thenResolve();
    service.excluir(COMENTARIO_ID);
    verify(repositorySpy.excluir(COMENTARIO_ID));
    verify(postServiceSpy.atualizarContadorComentarios(PARENT_ID, -1));
  });
});
