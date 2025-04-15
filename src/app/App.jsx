import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import "./App.css";


const App = () => {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1440px] px-4 py-20">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
