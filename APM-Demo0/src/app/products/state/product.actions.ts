import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction('[Product] Toggle Product Code');

export const clearCurrentProduct = createAction(
  '[Product] Clear Current Product'
);
export const initialiseCurrentProduct = createAction(
  '[Product] Initialise Current Product'
);

export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
  props<{ currentProductId: number }>()
);

export const loadProducts = createAction('[Product] Load');

export const loadProductsSuccess = createAction(
  '[Product] Load Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Fail',
  props<{ error: string }>()
);
export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: Product }>()
);
export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: Product }>()
);
export const updateProductFailure = createAction(
  '[Product] Update Product Failure',
  props<{ error: string }>()
);

//#implement actions to add and delete

//------------------ CREATE
export const createProduct = createAction(
  '[Product] Add Product',
  props<{ product: Product }>()
);

export const createProductSuccess = createAction(
  '[Product] Add Product Success',
  props<{ product: Product }>() //!not sure if an need an action paramenter for this one
);

export const createProductFailure = createAction(
  '[Product] Add Product Failure',
  props<{ error: string }>()
);


//------------------ DELETE
export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ product: Product }>()
  // props<{ productId: number }>() //* might be better o changes this to prdcut id
);
export const deleteProductFailure = createAction(
  '[Product] Delete Product Success',
  props<{ error: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ product: Product }>() //!not sure if an need an action paramenter for this one
);
