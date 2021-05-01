export class ErroAutorizacao extends Error {
  status: number;
  mensagem: string;
  nome: string;

  constructor() {
    const mensagem =
      "YOU SHALL NOT PASS! (at least, not without an authorization header)";

    super(mensagem);
    this.status = 403;
    this.mensagem = mensagem;
    this.nome = "ErroAutorizacao";
  }
}

export class ErroValidacao extends Error {
  status: number;
  mensagem: string;
  nome: string;

  constructor(mensagem) {
    super(mensagem);
    this.status = 400;
    this.mensagem = mensagem;
    this.nome = "ErroValidacao";
  }
}

export class ErroRegistroInexistente extends ErroValidacao {
  constructor(id) {
    super(`Registro '${id}' não existe.`);
    this.nome = "ErroRegistroInexistente";
  }
}

export class ErroCampoObrigatorio extends ErroValidacao {
  constructor(campos) {
    let mensagem;
    if (campos.length > 1) {
      mensagem = `Os campos ${campos.join(", ")} são obrigatórios.`;
    } else {
      mensagem = `O campo ${campos} é obrigatório.`;
    }

    super(mensagem);
    this.nome = "ErroCampoObrigatorio";
  }
}
