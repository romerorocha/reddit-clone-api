export enum OpcaoVoto {
  Positivo = "positivo",
  Negativo = "negativo",
}

export interface Voto {
  opcao: OpcaoVoto.Positivo | OpcaoVoto.Negativo;
}
