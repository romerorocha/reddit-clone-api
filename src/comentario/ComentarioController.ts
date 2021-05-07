import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";
import { ComentarioParams, ComentarioService, ComentarioType } from ".";
import { Voto } from "../voto";

@Route("comentarios")
@Tags("Comentários")
@Security("bearerAuth")
export class ComentarioController extends Controller {
  @Get("{idPai}")
  public async listar(@Path() idPai: string): Promise<ComentarioType[]> {
    return new ComentarioService().listar(idPai);
  }

  @SuccessResponse("201", "Created")
  @Post("{idPai}")
  public async criar(
    @Path() idPai: string,
    @Body() requestBody: ComentarioParams
  ): Promise<ComentarioType> {
    this.setStatus(201);
    return new ComentarioService().criar(idPai, requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Put("{idComentario}")
  public async atualizar(
    @Path() idComentario: string,
    @Body() requestBody: ComentarioParams
  ): Promise<ComentarioType> {
    this.setStatus(200);
    return new ComentarioService().atualizar(idComentario, requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Put("{idComentario}/votar")
  public async votar(
    @Path() idComentario: string,
    @Body() requestBody: Voto
  ): Promise<ComentarioType> {
    this.setStatus(200);
    return new ComentarioService().votar(idComentario, requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Delete("{idComentario}")
  public async excluir(@Path() idComentario: string): Promise<string> {
    return new ComentarioService().excluir(idComentario);
  }
}
