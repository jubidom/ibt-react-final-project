// 1. React & Router Imports 
import { Outlet } from "react-router-dom";
import { ToastContainer, Slide} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ----------------------
// 2. Global Layout Components
// ----------------------
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// ----------------------
// 3. Context Provider
// ----------------------
import { AppProvider } from "./context/AppContext";
import AuthForm from "./components/AuthForm/AuthForm";

// ----------------------
// 4. Main Layout Component
// ----------------------
const App = () => {
  return (
    <AppProvider>
      {/* Wrap the whole app with context → makes state accessible everywhere */}
      <div className="app-container flex flex-col min-h-screen">
        {/* Navbar always stays at the top */}
        <Navbar />
        <AuthForm />

        {/* Dynamic page content goes here via React Router */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Footer always stays at the bottom */}
        <Footer />

        {/* Toast container (centered, modern config) */}
        <ToastContainer
          position="top-center"   
          autoClose={2000}        
          hideProgressBar={false} 
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"         
          transition={Slide}   
        />
      </div>
    </AppProvider>
  );
};

export default App;
