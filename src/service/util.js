export const obterAtivos = registros => {
  return Object.values(registros)
    .filter(item => !item.excluido && !item.paiExcluido)
    .map(item => {
      item.excluido = undefined;
      item.paiExcluido = undefined;
      return item;
    });
};
