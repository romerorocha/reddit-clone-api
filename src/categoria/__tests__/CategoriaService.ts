import { spy, when } from "ts-mockito";
import CategoriaService from "../CategoriaService";

const service = new CategoriaService();

let repositorySpy = spy(service.repository);

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
    } catch (err) {
      expect(err.message).toEqual(
        "Já existe uma categoria com o 'path' informado."
      );
    }
  });
});

describe("Excluir categoria", () => {
  it("Exclui categoria", () => {
    const path = "sda";
    when(repositorySpy.excluir(path)).thenReturn(path);
    expect(service.excluir(path)).toBe(path);
  });
});
