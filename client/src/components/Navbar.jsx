import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import LanguageSwitcher from "./LanguageSwitcher"; // om du har en separat komponent

export default function Navbar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/services", label: t("nav.services") },
    { path: "/about", label: t("nav.about") },
    { path: "/contact", label: t("nav.contact") },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800">
              {t("brand.prefix")}
              <span className="text-blue-600">{t("brand.suffix")}</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 transition ${
                    isActive ? "text-blue-600 font-semibold" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right side: Auth & Language */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                {t("common.login")}
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">{user?.name}</span>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {t("common.admin")}
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-blue-600"
                >
                  {t("common.profile")}
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="text-red-600 hover:text-red-800"
                >
                  {t("common.logout")}
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${
                      isActive ? "bg-gray-100 font-semibold" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3 border-t">
                <LanguageSwitcher />
              </div>
              <div className="pt-2">
                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    {t("common.login")}
                  </Link>
                ) : (
                  <>
                    <div className="px-3 py-2 text-gray-600">{user?.name}</div>
                    {user?.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={toggleMenu}
                        className="block px-3 py-2 text-gray-700"
                      >
                        {t("common.admin")}
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      onClick={toggleMenu}
                      className="block px-3 py-2 text-gray-700"
                    >
                      {t("common.profile")}
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(logout());
                        toggleMenu();
                      }}
                      className="block w-full text-left px-3 py-2 text-red-600"
                    >
                      {t("common.logout")}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
