import { combineReducers } from "@reduxjs/toolkit"

// Reducer temporaire pour éviter l'erreur
const dummyReducer = (state = {}, action: any) => state

// Create a root reducer that combines all slice reducers
const rootReducer = combineReducers({
  dummy: dummyReducer, // Reducer temporaire
  //auth: authReducer,
  // user: userReducer,
  // products: productsReducer,
})

// Export the combined reducer to be used in the store configuration
export default rootReducer