import { Menu } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";

const Add = lazy(() => import("./pages/Add"));
const List = lazy(() => import("./pages/List"));
const Orders = lazy(() => import("./pages/Orders"));

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [menuOpen, setMenuOpen] = useState(false);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="md:hidden">
        <button
          aria-label="Open menu"
          className="fixed top-3.5 left-4 z-50 cursor-pointer rounded-md bg-white p-1.5 shadow-sm"
          onClick={() => setMenuOpen(true)}
          type="button"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <Navbar setToken={setToken} />

      <div className="flex flex-1">
        <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 overflow-y-auto">
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-10">
                <span className="text-gray-400">Đang tải...</span>
              </div>
            }
          >
            <Routes>
              <Route element={<Add />} path="/add" />
              <Route element={<Add />} path="/add/:productId" />
              <Route element={<List />} path="/list" />
              <Route element={<Orders />} path="/orders" />
              <Route element={<Navigate replace to="/orders" />} path="*" />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default App;
