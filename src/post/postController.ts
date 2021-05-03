import { Voto } from "src/common/voto";
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

  @Get("{postId}")
  public async obterPorId(@Path() postId: string): Promise<Post> {
    return new PostService().obterPorId(postId);
  }

  @SuccessResponse("200", "Ok")
  @PostRest("{postId}")
  public async atualizar(
    @Path() postId: string,
    @Body() requestBody: PostParams
  ): Promise<Post> {
    this.setStatus(200);
    return new PostService().atualizar(postId, requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Put("{postId}")
  public async votar(
    @Path() postId: string,
    @Body() requestBody: Voto
  ): Promise<Post> {
    this.setStatus(200);
    return new PostService().votar(postId, requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Delete("{id}")
  public async excluir(@Path() id: string): Promise<string> {
    return new PostService().excluir(id);
  }
}
