import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";
import routes from "./routes/routes";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>
  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import { store, persistor } from './redux/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <PersistGate persistor={persistor}>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </PersistGate>
//     ,
//   </React.StrictMode>
// );