export enum OpcaoVoto {
  Positivo = "positivo",
  Negativo = "negativo",
}

export type Voto = {
  opcao: OpcaoVoto.Positivo | OpcaoVoto.Negativo;
};
