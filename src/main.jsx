import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StoreContextProvider from "./context/StoreContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./services/axiosConfig.js"; // Import axios config for side effects

createRoot(document.getElementById("root")).render(
  <StoreContextProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StoreContextProvider>
);
