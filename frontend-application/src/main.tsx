import React from "react";
import ReactDOM from "react-dom/client"
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./auth/AuthContext.tsx";
import App from './App.tsx'
import { store } from "./store/index.ts";
import { Provider } from "react-redux";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
