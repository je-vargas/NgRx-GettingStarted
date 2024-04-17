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
  props<{ product: Product }>()
);
