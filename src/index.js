import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";
import { Provider, ReactReduxContext } from "react-redux";
import { store } from "./store/";
import "antd/dist/antd.css";
import "./index.css";
import "./assets/fonts/font.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store} context={ReactReduxContext}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// ReactDOM.render(
//             <App />,
//             document.getElementById('root')
// );
serviceWorker.unregister();
