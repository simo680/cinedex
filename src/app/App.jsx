import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto max-w-[1440px] flex-1 px-4 py-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
