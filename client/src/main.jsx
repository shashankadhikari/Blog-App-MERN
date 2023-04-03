import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { Toaster } from "react-hot-toast";

const store = createStore(
  reducers,
  composeWithDevTools(compose(applyMiddleware(thunk)))
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
  </Provider>
);
