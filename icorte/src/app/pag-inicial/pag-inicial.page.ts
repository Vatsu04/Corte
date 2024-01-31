import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pag-inicial',
  templateUrl: './pag-inicial.page.html',
  styleUrls: ['./pag-inicial.page.scss'],
})
export class PagInicialPage implements OnInit {

  constructor(
    // private router: Router
  ) {
   
   }

  ngOnInit() {
  }

  /* async cadastroBarbeiro(){
    this.router.navigateByUrl('/cadastro-barbeiro', { replaceUrl: true });
  } */
}
