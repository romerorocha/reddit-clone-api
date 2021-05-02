import { Router } from "express";
import { Categoria } from "../model/categoria";
import * as categoriaService from "../service/categoria";

const router = Router();

router.get("/", (req, res) => {
  res.send(categoriaService.listar());
});

router.post("/", (req, res) => {
  const categoria: Categoria = req.body;
  const post = categoriaService.criar(categoria);
  res.send(post);
});

router.delete("/:path", (req, res) => {
  const post = categoriaService.excluir(req.params?.path);
  res.send(post);
});

export default router;
