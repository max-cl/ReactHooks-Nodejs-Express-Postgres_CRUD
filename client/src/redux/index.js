import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from 'redux-logger'; //dev
import { composeWithDevTools } from 'redux-devtools-extension'; //dev
import rootReducer from "./reducers";


/** DEV */
const loggerMiddleware = createLogger();
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware));
export const store = createStore(rootReducer, middleware);

/** PRODUCTION */
// const middleware = applyMiddleware(thunkMiddleware);
// export const store = createStore(rootReducer, middleware);