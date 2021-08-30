# Forum API Server

API de aplicação de fórum, estilo Reddit, utilizada para apoiar o ensino de desenvolvimento web com ReactJS

## Instalação e Execução

Aplicação desenvolvida com **NodeJS v14.x.x** e **Yarn 1.22.x**

Para instalar as dependências do projeto

```sh
yarn install
```

Para compilar e executar a aplicação

```sh
yarn build && yarn start
```

Para executar a aplicação no modo "desenvolvedor"

```sh
yarn dev
```

Para executar a aplicação em ambiente produtivo:

```sh
yarn build && yarn start:production
```

O servidor é executado na porta `5000`, se disponível.

## Uso

### Documentação

Documentação da API disponível em `http://localhost:5000/api-docs`.

### Autenticação

> "Fale amigo, e entre!"
Para consumir a API, se faz necessário a definição de um *Header* `Authorization` nos *requests*, contendo a senha `mellon`. O intuito é simular uma autenticação real.

```text
Authorization: mellon
```
