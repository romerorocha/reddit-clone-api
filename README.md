# Forum API Server

## Instalação e Execução
Recomenda-se o uso da ferramenta **yarn**, mas **npm** pode ser usado como alternativa sem maiores prejuízos.
Aplicação desenvolvida com **NodeJS v14.x.x**

Para instalar as dependências do projeto
```sh
yarn install
```

Para compilar e executar a aplicação
```
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
```
Authorization: mellon
```