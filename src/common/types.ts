export enum OpcaoVoto {
  positivo = "positivo",
  negativo = "negativo",
}

export type Voto = {
  opcao: OpcaoVoto.positivo | OpcaoVoto.negativo;
};
