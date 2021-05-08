import { ErroCampoObrigatorio } from "./erros";

export const validarCamposObrigatorios = (campos: any) => {
  const nomes = [];
  for (const key in campos) {
    if (!!!campos[key]) {
      nomes.push("'" + key + "'");
    }
  }

  if (nomes.length) {
    throw new ErroCampoObrigatorio(nomes);
  }
};
