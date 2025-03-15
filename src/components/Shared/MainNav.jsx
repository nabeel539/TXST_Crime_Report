import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-crime-800 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to={"/"}
            className="text-lg font-semibold text-crime-800 dark:text-white flex items-center gap-1"
          >
            <Shield className="w-8 h-6 mr-1.5 " />
            Crime Record Management System
          </Link>
          {/* <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-crime-500 dark:text-crime-400 hover:text-crime-700 dark:hover:text-crime-300"
            >
              Home
            </a>
            <a
              href="#"
              className="text-crime-500 dark:text-crime-400 hover:text-crime-700 dark:hover:text-crime-300"
            >
              Features
            </a>
            <a
              href="#"
              className="text-crime-500 dark:text-crime-400 hover:text-crime-700 dark:hover:text-crime-300"
            >
              Contact
            </a>
          </div> */}
        </div>
      </div>
    </nav>
  );
};
