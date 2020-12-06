import { Usuario } from "./usuario";

export class Publicacao{

  id?: number;
  titulo: string;
  texto: string;
  upvote?: number;
  dataPublicacao?: string;

  usuario: Usuario = new Usuario();

}
