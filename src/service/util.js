export const obterAtivos = registros => {
  return Object.values(registros)
    .filter(item => !item.excluido)
    .map(item => {
      item.excluido = undefined;
      return item;
    });
};
