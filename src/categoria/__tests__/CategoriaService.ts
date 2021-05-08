import { spy, verify, when } from "ts-mockito";
import CategoriaService from "../CategoriaService";

const service = new CategoriaService();

let repositorySpy = spy(service.repository);
let postServiceSpy = spy(service.postService);

describe("Listar categorias", () => {
  it("Lista categorias", () => {
    const cat = { nome: "sda", path: "Senhor dos Anéis" };
    when(repositorySpy.listar()).thenReturn([cat]);
    expect(service.listar()).toEqual([cat]);
  });
});

describe("Criar categoria", () => {
  it("Cria categoria", () => {
    const cat = { path: "sda-filmes", nome: "Senhor dos Anéis (Filmes)" };
    when(repositorySpy.salvar(cat)).thenReturn(cat);
    expect(service.criar(cat)).toEqual(cat);
  });

  it("Não cria, path vazio", () => {
    try {
      service.criar({ path: "", nome: "nome" });
      fail();
    } catch (err) {
      expect(err.message).toEqual("O campo 'path' é obrigatório.");
    }
  });

  it("Não cria, nome vazio", () => {
    try {
      service.criar({ path: "path", nome: "" });
      fail();
    } catch (err) {
      expect(err.message).toEqual("O campo 'nome' é obrigatório.");
    }
  });

  it("Não cria, path já existe", () => {
    try {
      const categoriaExistente = { path: "sda", nome: "nome atual" };
      when(repositorySpy.obter("sda")).thenReturn(categoriaExistente);
      service.criar({ path: "sda", nome: "Senhor dos Anéis" });
      fail();
    } catch (error) {
      expect(error.message).toEqual(
        "Já existe uma categoria com o 'path' informado."
      );
    }
  });
});

describe("Excluir categoria", () => {
  it("Exclui categoria sem posts", () => {
    const path = "sda";
    when(repositorySpy.excluir(path)).thenReturn(path);
    when(postServiceSpy.listarPorCategoria(path)).thenReturn([]);
    expect(service.excluir(path)).toBe(path);
  });

  it("Não exclui, categoria possui posts", () => {
    const post = {
      id: "id",
      timestamp: 1,
      titulo: "",
      corpo: "",
      autor: "",
      categoria: "",
      nota: 0,
      numeroComentarios: 0,
    };

    const path = "sda";
    when(postServiceSpy.listarPorCategoria(path)).thenReturn([post]);
    try {
      service.excluir(path);
      fail();
    } catch (error) {
      expect(error.message).toBe(
        "A categoria possui posts que a refereciam, não é possível removê-la."
      );
    }
    verify(postServiceSpy.excluir(path)).never();
  });

  it("Não exclui, categoria não existe", () => {
    const path = "sda2";
    when(repositorySpy.obter(path)).thenReturn();
    try {
      service.excluir(path);
      fail();
    } catch (error) {
      expect(error.message).toBe("Registro 'sda2' não existe.");
    }
    verify(postServiceSpy.excluir(path)).never();
  });
});
