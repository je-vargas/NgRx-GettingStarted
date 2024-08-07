import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

//*NGRX imports created by me as part of set up
import { Store } from '@ngrx/store';
import {
  State,
  getCurrentProduct,
  getProducts,
  getShowProductCode,
} from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';

  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: any;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts);

    this.store.dispatch(ProductActions.loadProducts());

    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initialiseCurrentProduct());
  }

  productSelected(productId: number): void {
    this.store.dispatch(
      ProductActions.setCurrentProduct({ currentProductId: productId })
    );
  }
}
