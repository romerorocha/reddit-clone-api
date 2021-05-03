# Forum API Server

## Instalação e Execução
Recomenda-se o uso da ferramenta **yarn**, mas **npm** pode ser usado como alternativa sem maiores prejuízos.
Aplicação desenvolvida e testada com **NodeJS v14.15.1**

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

Necessário fornecer um *Header* `Authorization`, contendo a senha `mellon`, apenas para simular uma autenticação real.
```
Authorization: mellon
```