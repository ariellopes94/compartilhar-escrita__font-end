import { PublicacaoService } from './../../services/publicacao.service';
import { Publicacao } from './../../models/publicacao';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-publicacao',
  templateUrl: './criar-publicacao.component.html',
  styleUrls: ['./criar-publicacao.component.css']
})
export class CriarPublicacaoComponent implements OnInit {

  publicacao: Publicacao = new Publicacao();

  constructor( private publicacaoService: PublicacaoService, private router: Router ) { }

  ngOnInit(): void {
  }

  createPublicacao(): void{
    this.publicacaoService.create(this.publicacao)
      .subscribe(() => {
        this.publicacao = new Publicacao();
        this.router.navigate(['/listarPublicacao']);
      })
  }

}
