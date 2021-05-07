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
  public async listar(): Promise<CategoriaType[]> {
    return new CategoriaService().listar();
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async criar(
    @Body() requestBody: CategoriaType
  ): Promise<CategoriaType> {
    this.setStatus(201);
    return new CategoriaService().criar(requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Delete("{id}")
  public async excluir(@Path() id: string): Promise<string> {
    return new CategoriaService().excluir(id);
  }
}
