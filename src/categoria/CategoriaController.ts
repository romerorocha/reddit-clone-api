import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";

import { CategoriaService, CategoriaType } from ".";

@Route("categorias")
@Tags("Categorias")
@Security("bearerAuth")
export class CategoriaController extends Controller {
  @Get()
  public listar(): CategoriaType[] {
    return new CategoriaService().listar();
  }

  @SuccessResponse("201", "Created")
  @Post()
  public criar(@Body() requestBody: CategoriaType): CategoriaType {
    this.setStatus(201);
    return new CategoriaService().criar(requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Delete("{id}")
  public excluir(@Path() id: string): string {
    return new CategoriaService().excluir(id);
  }
}
