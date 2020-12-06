import { ComentarioDto } from './../models/dto/comentarioDto';
import { API_CONFIG } from './../config/api.config';
import { Page } from './../models/page';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(public http: HttpClient) { }

  findAllComentariosPorPublicacao(idPublicacao, page): Observable<Page> {
    return this.http.get<Page>(`${API_CONFIG.baseUrl}/comentario/buscar/${idPublicacao}?page=${page}`);
  }

  createComentario(comentario: ComentarioDto): Observable<ComentarioDto> {
    return this.http.post<ComentarioDto>(
      `${API_CONFIG.baseUrl}/comentario`,
      comentario
    );
  }
}
