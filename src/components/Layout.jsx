import { Outlet } from "react-router-dom";
import { Navbar } from "./Shared/MainNav";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center max-w-screen-xl mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-6 bg-white dark:bg-crime-800 border-t border-crime-100 dark:border-crime-700">
        <div className="container mx-auto px-4 text-center text-sm text-crime-500 dark:text-crime-400">
          <p>© 2025 Crime Record Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
