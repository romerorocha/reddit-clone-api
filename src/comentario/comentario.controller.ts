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
import { Voto } from "../voto/voto";
import { Comentario } from "./comentario";
import { ComentarioParams, ComentarioService } from "./comentario.service";

@Route("comentarios")
@Tags("Comentários")
@Security("bearerAuth")
export class ComentarioController extends Controller {
  @Get("{idPai}")
  public async listar(@Path() idPai: string): Promise<Comentario[]> {
    return new ComentarioService().listar(idPai);
  }

  @SuccessResponse("201", "Created")
  @Post("{idPai}")
  public async criar(
    @Path() idPai: string,
    @Body() requestBody: ComentarioParams
  ): Promise<Comentario> {
    this.setStatus(201);
    return new ComentarioService().criar(idPai, requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Put("{idPai}")
  public async atualizar(
    @Path() idPai: string,
    @Body() requestBody: ComentarioParams
  ): Promise<Comentario> {
    this.setStatus(200);
    return new ComentarioService().atualizar(idPai, requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Put("{idComentario}/votar")
  public async votar(
    @Path() idComentario: string,
    @Body() requestBody: Voto
  ): Promise<Comentario> {
    this.setStatus(200);
    return new ComentarioService().votar(idComentario, requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Delete("{idComentario}")
  public async excluir(@Path() idComentario: string): Promise<string> {
    return new ComentarioService().excluir(idComentario);
  }
}
