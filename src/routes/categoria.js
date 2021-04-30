import { Router } from 'express';
import * as categoriaService from '../service/categoria';

const router = new Router();

router.get('/', (req, res) => {
  res.send(categoriaService.listar());
});

router.post('/', (req, res) => {
  const post = categoriaService.criar(req.body);
  res.send(post);
});

router.delete('/:path', (req, res) => {
  const post = categoriaService.excluir(req.params?.path);
  res.send(post);
});

export default router;
