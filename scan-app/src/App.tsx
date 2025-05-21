import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./store/AuthContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <AppRoutes />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
