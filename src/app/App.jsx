import Footer from "../components/Footer";
import Header from "../components/Header";
import "./App.css";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
