import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./rootReducer";

export const history = createBrowserHistory();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, promiseMiddleware(), routerMiddleware(history))
  // other store enhancers if any
);
export const store = createStore(rootReducer(history), enhancer);
