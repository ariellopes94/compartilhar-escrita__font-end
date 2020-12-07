import { Usuario } from './../../models/usuario';
import { ComentarioModalComponent } from './../comentario-modal/comentario-modal.component';
import { ComentarioDialogoDto } from './../../models/dto/comentarioDialogoDto';

import { Comentario } from './../../models/comentario';
import { ComentariosService } from './../../services/comentarios.service';
import { Page } from './../../models/page';
import { PublicacaoDtoCurtir } from './../../models/dto/publicacaoDtoCurtir';
import { Publicacao } from './../../models/publicacao';
import { PublicacaoService } from './../../services/publicacao.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SelectorMatcher } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { ComentarioDto } from 'src/app/models/dto/comentarioDto';


@Component({
  selector: 'app-listar-todas-as-publicacao',
  templateUrl: './listar-todas-as-publicacao.component.html',
  styleUrls: ['./listar-todas-as-publicacao.component.css']
})
export class ListarTodasAsPublicacaoComponent implements OnInit {

  publicacao: Publicacao = new Publicacao();
  publicacaos: Publicacao[];

  comentarioDto: ComentarioDto = new ComentarioDto();
  comentarios: Comentario[];
  publicacaoDtoCurtir: PublicacaoDtoCurtir = new PublicacaoDtoCurtir();

  page: Page;


  naoContemComentarios: boolean = false;

  ordenacoes = [
    { value: 'dataPublicacao', viewValue: 'Data' },
    { value: 'upvote', viewValue: 'Curtidas' }];

  ordenacaoSelecionada = this.ordenacoes[0].value;
  pageComentario: Page;
  paginaAtual: number = 0;
  tamanhototalPagina: number = 5;
  pageEvent: PageEvent = new PageEvent();

  constructor(private publicacaoService: PublicacaoService, private comentariosService: ComentariosService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.buscarPublicacaosPage(0, 5);
    this.pageEvent.pageSize = 5;
    this.paginaAtual = this.pageEvent.pageIndex;
    this.tamanhototalPagina = this.pageEvent.pageSize;
  }

  onOrdenarSelection(): void {
    this.buscarPublicacaosPage(0, 5);
  }

  openDialog(publicacaoId): void {
    const dialogRef = this.dialog.open(ComentarioModalComponent, { data: ComentarioDialogoDto });
    dialogRef.afterClosed().subscribe(result => {
      this.createComentario(publicacaoId, result.comentario, result.usuario);
      this.buscarComentariosPage(publicacaoId);
    });
  }

  buscarPublicacaosPage(page, size): void {
    this.publicacaoService.findAllPublicacaoPage(this.ordenacaoSelecionada, page, size).subscribe(
      (reponse) => {
        this.page = reponse;
        this.publicacaos = reponse.content;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  buscarComentariosPage(idPublicacao): void {
    this.comentariosService.findAllComentariosPorPublicacao(idPublicacao, this.pageEvent.pageIndex)
      .subscribe(
        (reponse) => {
          this.pageComentario = reponse;
          this.comentarios = reponse.content;
          this.naoContemComentarios = false;

          if (!(this.comentarios[0]?.comentario.length > 0)) {
            this.naoContemComentarios = true;
            this.comentarios = [];
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  createComentario(publicacaoId: number, comentario: string, nomeUsuario: string): void {
    this.comentarioDto.idPublicacao = publicacaoId;
    this.comentarioDto.comentario = comentario;
    this.comentarioDto.usuario.nome = nomeUsuario;

    this.comentariosService.createComentario(this.comentarioDto)
      .subscribe(() => {
        this.comentarioDto = new ComentarioDto();
        this.buscarComentariosPage(publicacaoId);
      });
  }

  paginacaoPublicacao(): void {
    this.buscarPublicacaosPage(this.pageEvent.pageIndex, this.pageEvent.pageSize);
    this.paginaAtual = this.pageEvent.pageIndex;
    this.tamanhototalPagina = this.pageEvent.pageSize;
  }

  curtirComentario(idPublicacao: number, index: number): void {
    this.publicacaoDtoCurtir.idPublicacao = idPublicacao;
    this.publicacaoService.curtirComentario(this.publicacaoDtoCurtir)
      .subscribe((reponse) => {
        this.publicacaos[index].upvote = reponse.upvote;
      });
  }
}
