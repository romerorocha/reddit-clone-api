import { Router } from 'express';
import * as postService from '../service/post';

const router = new Router();

router.get('/', (req, res) => {
  res.send(postService.listar());
});

router.get('/:id', (req, res) => {
  const post = postService.obterPorId(req.params?.id);
  res.send(post);
});

router.post('/', (req, res) => {
  const post = postService.criar(req.body);
  res.send(post);
});

router.put('/:id', (req, res) => {
  const post = postService.atualizar(req.params?.id, req.body);
  res.send(post);
});

router.put('/:id/votar', (req, res) => {
  const post = postService.votar(req.params?.id, req.body?.opcao);
  res.send(post);
});

router.delete('/:id', (req, res) => {
  const post = postService.excluir(req.params?.id);
  res.send(post);
});

export default router;
