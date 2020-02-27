import { Injectable } from '@angular/core';


import { select, Store } from '@ngrx/store';
import { Observable, of, merge, concat, forkJoin, combineLatest, empty } from 'rxjs';


// import { map, withLatestFrom, distinctUntilChanged } from 'rxjs/operators';
// import { ItemsService } from '@pages/ants/services/items.service';
import { Router } from '@angular/router';

import * as fromAntsActions from '@pages/ants/actions';
import * as fromAntsReducers from '@pages/ants/reducers';

import * as fromRootReducers from '@redux/reducers';
import { switchMap, map, tap, take, concatAll, debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  items$: Observable<any>;
  route$: Observable<any>;
  constructor(
    public router: Router,
    private storeAnts$: Store<fromAntsReducers.State>,
    private storeRoot$: Store<fromRootReducers.State>,

  ) { }

  getUrl() {


  }

  loadItems(): Observable<any> {
    return this.storeRoot$.pipe(
      debounceTime(300),
      select(fromRootReducers.selectUrl),
      // tap((data) => {
      //   debugger;
      // }),
      switchMap((value: string) => {
        if (value.split('/')[1].includes('ants')) {
          const temp = this.storeAnts$.pipe(
            select(fromAntsReducers.selectItemsSearch)
          );
          // uno los 2 y no lo devuelvo hasta tenerlos todos.
          return combineLatest(of(value), temp);
        } else {
          return combineLatest(of(value), of({ items: [] }));
        }
      }),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      map((data) => {
        if (data[1].items.length === 0) {
          if (data[0].split('/')[1].includes('ants')) {
            return this.storeAnts$.dispatch(fromAntsActions.ItemsActions.loadItems());
          }
        }
      }),

    );

  }

  loadItems2() {
    this.storeRoot$.pipe(
      select(fromRootReducers.selectUrl),
      tap((data) => {
        debugger;
      }),
      map((value: string) => {
        alert('asdfsdafds');
        if (value.split('/')[1].includes('ants')) {
          this.storeAnts$.dispatch(fromAntsActions.ItemsActions.loadItems());
        }
      }),
      // take(1)
    );
  }

  getItems() {
    // const obj = this.getUrl;
    // TODO falta completar
  }


}
