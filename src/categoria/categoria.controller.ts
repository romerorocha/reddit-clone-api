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
import { ICategoria } from "./categoria";
import { CategoriaService } from "./categoria.service";

@Route("categorias")
@Tags("Categorias")
@Security("bearerAuth")
export class CategoriaController extends Controller {
  @Get()
  public async listar(): Promise<ICategoria[]> {
    return new CategoriaService().listar();
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async criar(@Body() requestBody: ICategoria): Promise<ICategoria> {
    this.setStatus(201);
    return new CategoriaService().criar(requestBody);
  }

  @SuccessResponse("200", "Ok")
  @Delete("{id}")
  public async excluir(@Path() id: string): Promise<string> {
    return new CategoriaService().excluir(id);
  }
}
