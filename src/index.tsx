import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals";
import "./global.css";
import { store, persistor } from "./redux/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider } from "antd";
import { AuthProvider } from "./context/AuthProvoider.tsx";

const container = document.getElementById("root");
const root = createRoot(container!);
async function enableMocking() {
  // implement if the API is available
  // if (process.env.NODE_ENV !== 'development') {
  //   return
  // }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}
enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <AuthProvider>
            <ConfigProvider>
              <App />
            </ConfigProvider>
          </AuthProvider>
        </Provider>
      </PersistGate>
    </React.StrictMode>
  );
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
