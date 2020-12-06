import { ComentarioDialogoDto } from '../../models/dto/comentarioDialogoDto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-comentario-modal',
  templateUrl: './comentario-modal.component.html',
  styleUrls: ['./comentario-modal.component.css']
})
export class ComentarioModalComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: ComentarioDialogoDto) { }

  ngOnInit(): void {
   this.data = new ComentarioDialogoDto();
  }

}
