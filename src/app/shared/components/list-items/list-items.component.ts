import {
  Component, OnInit, Input, ViewChild, OnDestroy, ComponentFactoryResolver, ViewContainerRef,
  ComponentRef, AfterViewInit, ComponentFactory
} from '@angular/core';
import { MenuController } from '@ionic/angular';



// todo sobre ngrx redux
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LayoutActions } from '@redux/core/actions';
import * as fromRoot from '@redux/reducers';

// componentes dinámicos
// import { AntsListComponent } from '@pages/ants/components/ants-list/ants-list.component';
// import { AntsSelectedComponent } from '@pages/ants/components/ants-selected/ants-selected.component';





@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ItemsListComponent implements OnInit, OnDestroy, AfterViewInit {
  miFactory: ComponentFactory<any>;
  componentRef: ComponentRef<any> = null; // se declara una variable referencia.
  // componentRef2: ComponentRef<AntsSelectedComponent> = null; // se declara una variable referencia.

  // ViewContainerRef crea componentes en su interior de forma dinámica
  // Hay que añadir read: ViewContainerRef, ya que si no, devolvería un ElementRef
  // que es lo que devuelve por defecto un viewChild.
  // la referencia que tenemos es compDynamicContainer, y en ese contenedor añadiremos los componentes dinámicos
  @ViewChild('componenteDinamico', { read: ViewContainerRef }) compDynamicContainer: ViewContainerRef;

  // ComponentFactoryResolver es que el que permite crear componentes de forma dinámica.
  constructor(
    // private menu: MenuController,
    private store: Store<fromRoot.State>,
    private resolver: ComponentFactoryResolver,
    // private compDynamicContainer: ViewContainerRef,
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // this.miFactory = this.resolver.resolveComponentFactory(AntsListComponent);
    // this.componentRef = this.compDynamicContainer.createComponent(this.miFactory);
    this.getLazyComponent();
  }

  async getLazyComponent() {
    // this.componentRef.destroy();
    this.compDynamicContainer.clear();
    const { AntsListComponent } = await import('@pages/ants/components/ants-list/ants-list.component');
    this.componentRef = this.compDynamicContainer.createComponent(
      this.resolver.resolveComponentFactory(AntsListComponent)
    );
    // this.componentRef.instance.openCard(24);
  }








  openCloseSidenav(event) {
    if (event.type === 'ionDidOpen') {
      this.store.dispatch(LayoutActions.openSidenav());
    } else if (event.type === 'ionDidClose') {
      this.store.dispatch(LayoutActions.closeSidenav());
    }

  }

  ngOnDestroy() {

  }


}
