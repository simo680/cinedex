import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="w-full px-4 py-20">
          <div className="mx-auto max-w-[1440px]">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
