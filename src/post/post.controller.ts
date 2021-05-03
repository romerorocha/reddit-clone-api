import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Query,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";
import { Voto } from "../voto/voto";
import { IPost } from "./post";
import { PostParams, PostService } from "./post.service";

@Route("posts")
@Tags("Posts")
@Security("bearerAuth")
export class PostController extends Controller {
  @Get()
  public async listar(@Query() categoria?: string): Promise<IPost[]> {
    if (!categoria) {
      return new PostService().listar();
    }
    return new PostService().listarPorCategoria(categoria);
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async criar(@Body() requestBody: PostParams): Promise<IPost> {
    this.setStatus(201);
    return new PostService().criar(requestBody);
  }

  @Get("{idPost}")
  public async obterPorId(@Path() idPost: string): Promise<IPost> {
    return new PostService().obterPorId(idPost);
  }

  @SuccessResponse("200", "Ok")
  @Put("{idPost}")
  public async atualizar(
    @Path() idPost: string,
    @Body() requestBody: PostParams
  ): Promise<IPost> {
    this.setStatus(200);
    return new PostService().atualizar(idPost, requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Put("{idPost}/votar")
  public async votar(
    @Path() idPost: string,
    @Body() requestBody: Voto
  ): Promise<IPost> {
    this.setStatus(200);
    return new PostService().votar(idPost, requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Delete("{idPost}")
  public async excluir(@Path() idPost: string): Promise<string> {
    return new PostService().excluir(idPost);
  }
}
