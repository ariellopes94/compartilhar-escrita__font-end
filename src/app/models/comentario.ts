import { Usuario } from './usuario';
export class Comentario {

  id?: number;
  comentario: string;

  usuario: Usuario = new Usuario();

}
