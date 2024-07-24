import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';
import * as ProductActions from '../state/product.actions';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

export interface State extends AppState.State {
  products: ProductState;
}

const initialState: ProductState = {
  currentProductId: null,
  products: [],
  showProductCode: true,
  error: '',
};

//-----------------------------------------------------------------------------------#

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export const getCurrentProductID = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductID,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: '',
        description: '',
        starRating: 0,
      };
    } else {
      return currentProductId
        ? state.products.find((p) => p.id === currentProductId)
        : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);
export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
);
//-----------------------------------------------------------------------------------#

//! NOTE - ACTIONS ON REDUCER METHOD SHOULD ALWAYS BE INMUTTABLE ON EXISTING STATE -> RATHER SHOULD CREATE A NEW eg PRODUCT
//! PRODUCT IS THEN REPLACED FOR NEW ONE

//- REMEMBER :: createReducer -> sets state via an action
export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),

  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId,
    };
  }),

  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null,
    };
  }),

  on(ProductActions.initialiseCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),

  on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: '',
    };
  }),
  on(ProductActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),
  on(ProductActions.updateProduct, (state, action): ProductState => {
    const updatedProducts = state.products.map((item) =>
      action.product.id === item.id ? action.product : item
    );
    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: '',
    };
  }),
  on(ProductActions.updateProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    }; 
  }),
//? After a create, the currentProduct is the new product.
  on(ProductActions.createProductSuccess, (state, action): ProductState => {
    const updatedProducts = [...state.products, action.product];
    console.log('addproduct: ', updatedProducts);
    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: '',
    };
  }),

  on(ProductActions.createProductFailure, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: 0,
      error: action.error,
    };
  }),

  on(ProductActions.deleteProduct, (state, action): ProductState => {
    const updatedProducts = state.products.filter(
      (item) => action.product.id !== item.id
    );
    console.log('deleted product: ', updatedProducts);
    return {
      ...state,
      products: updatedProducts,
      currentProductId: null,
      error: '',
    };
  })
);
