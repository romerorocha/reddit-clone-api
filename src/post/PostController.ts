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
import { PostParams, PostService, PostsPage, PostType } from ".";
import { Voto } from "voto";

@Route("posts")
@Tags("Posts")
@Security("bearerAuth")
export class PostController extends Controller {
  @Get()
  public listar(
    @Query() pagina = 0,
    @Query() tamanho = 5,
    @Query() categoria?: string
  ): PostsPage {
    return new PostService().listarPaginado(pagina, tamanho, categoria);
  }

  @SuccessResponse("201", "Created")
  @Post()
  public criar(@Body() requestBody: PostParams): PostType {
    this.setStatus(201);
    return new PostService().criar(requestBody);
  }

  @Get("{idPost}")
  public obterPorId(@Path() idPost: string): PostType {
    this.setStatus(200);
    return new PostService().obterPorId(idPost);
  }

  @SuccessResponse("200", "Ok")
  @Put("{idPost}")
  public atualizar(
    @Path() idPost: string,
    @Body() requestBody: PostParams
  ): PostType {
    this.setStatus(200);
    return new PostService().atualizar(idPost, requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Put("{idPost}/votar")
  public votar(@Path() idPost: string, @Body() requestBody: Voto): PostType {
    this.setStatus(200);
    return new PostService().votar(idPost, requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Delete("{idPost}")
  public excluir(@Path() idPost: string): string {
    return new PostService().excluir(idPost);
  }
}
