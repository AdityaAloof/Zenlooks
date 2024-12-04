import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Using local storage for persistence

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import authReducer from '..reducers/authReducer'; // Import the authReducer
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

// Configure persistence for certain slices of state
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth'] // Include 'auth' in the whitelist to persist auth state
};

// Combine all reducers, including the new authReducer
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  auth: authReducer, // Added authReducer to handle authentication
  directory: directoryReducer,
  shop: shopReducer
});

// Use persistReducer to wrap the rootReducer
export default persistReducer(persistConfig, rootReducer);
