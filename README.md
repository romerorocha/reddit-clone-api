# Forum API Server

## Instalação e Execução
Recomenda-se o uso da ferramenta **yarn**, mas **npm** pode ser usado como alternativa sem maiores prejuízos.
Aplicação desenvolvida e testada com **NodeJS v14.15.1**

Para instalar as dependências do projeto
```sh
yarn install
```

Para executar a aplicação
```sh
yarn start
```

Para executar a aplicação no modo "desenvolvedor"
```sh
yarn dev
```

Para executar a aplicação em ambiente produtivo:
```sh
yarn build && yarn start:production
```

O servidor é executado na porta `3001`, se disponível.

## Uso

### Documentação
Documentação da API disponível em `http://localhost:3001/api-docs`.

### Autenticação
Necessário fornecer um *Header* `Authorization`, contendo um token (qualquer valor tipo string), apenas para simular uma autenticação real.
```
Authorization: Bearer <QUALQUER_VALOR>
```