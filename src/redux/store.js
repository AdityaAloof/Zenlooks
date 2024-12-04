import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Import local storage for persistence
import thunk from 'redux-thunk'; // Middleware for async actions
import logger from 'redux-logger'; // Middleware for logging (optional)
import rootReducer from './root-reducer'; // Import your root reducer

// Define persist config
const persistConfig = {
  key: 'root', // Key for the persisted state
  storage, // Storage method (local storage)
  whitelist: ['auth', 'cart'] // Only persist auth and cart slices of state
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define middleware
const middlewares = [thunk];

// Use logger middleware only in development
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// Create the Redux store using `configureStore`
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for `redux-persist`
    }).concat(middlewares), // Add middleware (e.g., thunk, logger)
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

// Create the persistor for the store
export const persistor = persistStore(store);

// Export the store and persistor individually
export {store, persistor };
