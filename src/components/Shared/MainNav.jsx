import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Assuming you're using React Router for navigation
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Menu, X } from "lucide-react"; // Assuming you're using Lucide icons

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // React Router's useLocation instead of Next.js's usePathname

  // Check if the user is on the admin pages
  const isAdminPage = location.pathname.startsWith("/admin");
  console.log("isAdminPage", isAdminPage);

  // Check if the user is logged in (this would be replaced with actual auth check)
  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">GovTestPrep</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium ${
              location.pathname === "/"
                ? "text-primary"
                : "text-muted-foreground"
            } transition-colors hover:text-primary`}
          >
            Home
          </Link>
          <Link
            to="/tests"
            className={`text-sm font-medium ${
              location.pathname === "/tests"
                ? "text-primary"
                : "text-muted-foreground"
            } transition-colors hover:text-primary`}
          >
            Tests
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium ${
              location.pathname === "/about"
                ? "text-primary"
                : "text-muted-foreground"
            } transition-colors hover:text-primary`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-medium ${
              location.pathname === "/contact"
                ? "text-primary"
                : "text-muted-foreground"
            } transition-colors hover:text-primary`}
          >
            Contact
          </Link>
          <Link
            to="/admin/dashboard"
            className={`text-sm font-medium ${
              location.pathname === "/admin/dashboard"
                ? "text-primary"
                : "text-muted-foreground"
            } transition-colors hover:text-primary`}
          >
            Admin
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="outline">Logout</Button>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/tests"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Tests
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/admin/dashboard"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
            <div className="border-t pt-4 mt-2 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
