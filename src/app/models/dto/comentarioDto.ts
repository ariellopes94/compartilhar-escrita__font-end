import { Usuario } from './../usuario';

export class ComentarioDto {

  idPublicacao: number;
  comentario: string;

  usuario: Usuario = new Usuario();

}
