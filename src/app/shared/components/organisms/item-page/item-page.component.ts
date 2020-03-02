/**
 * Es el encargado de vertificar en el redux router en qué ruta estamos
 *
 */

import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import * as searcher from '@shared/components/searcher/interfaces';



@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss'],
})
export class ItemPageComponent implements OnInit, OnDestroy {
  public searcherEmitter = new EventEmitter<searcher.Out>();
  public dataItems: any;
  public data = {
    title: ''
  };

  constructor(
    public router: Router
  ) {

  }

  ngOnInit() {

  }

  // recibe del componente buscador y guarda el objeto en searcher.
  onSearch(data: searcher.Out) {
    this.searcherEmitter.emit(data);

  }


  openFilter() {
    console.log('openFilter');
    this.router.navigate([`/ants/filter`]);
  }


  ngOnDestroy(): void {
    alert('delete');
    throw new Error('se destruye item-page');
  }

}
