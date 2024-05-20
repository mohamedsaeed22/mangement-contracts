import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import AppRouter from "./routes/AppRouter";
import store from "./store/index";

// styles
// import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import { registerLicense, enableRtl } from "@syncfusion/ej2-base";
enableRtl(true);

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVJ+WmFZfVpgcl9EZFZUQWYuP1ZhSXxXdkBhWX9Zc3FQRWJfU0M="
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
