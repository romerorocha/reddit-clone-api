export class HttpError extends Error {
  status: number;
  message: string;
  name: string;

  constructor(status: number, message: string, name: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.name = name;
  }
}

export class ErroAutorizacao extends HttpError {
  constructor() {
    const mensagem =
      "YOU SHALL NOT PASS! (não sem a senha, pelo menos -> LEIA O README!)";
    super(403, mensagem, "Erro de Autorização");
  }
}

export class ErroValidacao extends HttpError {
  constructor(mensagem: string) {
    super(400, mensagem, "Erro de Validação");
  }
}

export class ErroRegistroInexistente extends ErroValidacao {
  constructor(id: string) {
    super(`Registro '${id}' não existe.`);
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
  }
}
