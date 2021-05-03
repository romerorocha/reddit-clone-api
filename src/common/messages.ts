import { HOST, PORT } from "./constants";

export const WELCOME_TO_MORIA = `
The Doors of Durin, Lord of Moria. 
Speak "Authorization Header" and enter. --> ${HOST}:${PORT}
`;

export const ERRO_CATEGORIA_JA_EXISTE =
  "Já existe uma categoria com o 'path' informado.";
export const ERRO_CATEGORIA_POSSUI_POSTS =
  "A categoria possui posts que a refereciam, não é possível removê-la.";

export const ERRO_VOTO_INVALIDO =
  "Valor do voto informado é inválido. Deve ser 'positivo' ou 'negativo'.";
