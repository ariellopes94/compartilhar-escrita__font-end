import { Page } from './../models/page';
import { PublicacaoDtoCurtir } from './../models/dto/publicacaoDtoCurtir';
import { API_CONFIG } from './../config/api.config';
import { Publicacao } from './../models/publicacao';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {

  constructor(public http: HttpClient) { }

  create(publicacao: Publicacao): Observable<Publicacao> {
    return this.http.post<Publicacao>(
      `${API_CONFIG.baseUrl}/publicacao`,
      publicacao
    );
  }

  /*
  findAllPublicacao(): Observable<any> {
    return this.http.get<Publicacao[]>(`${API_CONFIG.baseUrl}/publicacao`);
  }
*/


  findAllPublicacaoPage(ordenar, page, size): Observable<Page> {
    return this.http.get<Page>(`${API_CONFIG.baseUrl}/publicacao?sort=${ordenar},desc&page=${page}&size=${size}`);
                                     // publicacao?sort=${ordenar},desc&page=${page}&size=${size}
  }


  curtirComentario(idPublicacao: PublicacaoDtoCurtir): Observable<PublicacaoDtoCurtir> {
    return this.http.post<PublicacaoDtoCurtir>(
      `${API_CONFIG.baseUrl}/publicacao/like`,
      idPublicacao
    );
  }
}
