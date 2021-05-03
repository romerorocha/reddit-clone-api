export class HttpError extends Error {
  status: number;
  mensagem: string;
  nome: string;

  constructor(status: number, mensagem: string, nome: string) {
    super(mensagem);
    this.status = status;
    this.mensagem = mensagem;
    this.nome = nome;
  }
}

export class ErroAutorizacao extends HttpError {
  constructor() {
    const mensagem =
      "YOU SHALL NOT PASS! (at least, not without an authorization header)";

    super(403, mensagem, "ErroAutorizacao");
  }
}

export class ErroValidacao extends HttpError {
  constructor(mensagem: string) {
    super(400, mensagem, "ErroValidacao");
  }
}

export class ErroRegistroInexistente extends ErroValidacao {
  constructor(id: string) {
    super(`Registro '${id}' não existe.`);
    this.nome = "ErroRegistroInexistente";
  }
}

export class ErroCampoObrigatorio extends ErroValidacao {
  constructor(campos: string[]) {
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
