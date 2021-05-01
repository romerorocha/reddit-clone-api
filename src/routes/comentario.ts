import { Router } from "express";
import * as comentarioService from "../service/comentario";

const router = Router();

router.get("/:idPai", (req, res) => {
  const comentarios = comentarioService.listar(req.params?.idPai);
  res.send(comentarios);
});

router.post("/", (req, res) => {
  const comentario = comentarioService.criar(req.body);
  res.send(comentario);
});

router.put("/:id", (req, res) => {
  const comentario = comentarioService.atualizar(req.params?.id, req.body);
  res.send(comentario);
});

router.put("/:id/votar", (req, res) => {
  const comentario = comentarioService.votar(req.params?.id, req.body?.opcao);
  res.send(comentario);
});

router.delete("/:id", (req, res) => {
  const comentario = comentarioService.excluir(req.params?.id);
  res.send(comentario);
});

export default router;
