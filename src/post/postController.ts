import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post as PostRest,
  Put,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { Voto } from "../common/voto";
import { Post } from "./post";
import { PostParams, PostService } from "./postService";

@Route("posts")
export class PostController extends Controller {
  @Get()
  public async listar(@Query() path?: string): Promise<Post[]> {
    if (!path) {
      return new PostService().listar();
    }
    return new PostService().listarPorCategoria(path);
  }

  @SuccessResponse("201", "Created")
  @PostRest()
  public async criar(@Body() requestBody: PostParams): Promise<Post> {
    this.setStatus(201);
    return new PostService().criar(requestBody);
  }

  @Get("{idPost}")
  public async obterPorId(@Path() idPost: string): Promise<Post> {
    return new PostService().obterPorId(idPost);
  }

  @SuccessResponse("200", "Ok")
  @Put("{idPost}")
  public async atualizar(
    @Path() idPost: string,
    @Body() requestBody: PostParams
  ): Promise<Post> {
    this.setStatus(200);
    return new PostService().atualizar(idPost, requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Put("{idPost}/votar")
  public async votar(
    @Path() idPost: string,
    @Body() requestBody: Voto
  ): Promise<Post> {
    this.setStatus(200);
    return new PostService().votar(idPost, requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Delete("{idPost}")
  public async excluir(@Path() idPost: string): Promise<string> {
    return new PostService().excluir(idPost);
  }
}
