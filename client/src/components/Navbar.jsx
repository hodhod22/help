import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { SUPPORTED_LANGS } from "../i18n";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">
            {t("brand.prefix")}
            {t("brand.suffix")}
          </Link>
        </div>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-600">
            {t("nav.home")}
          </Link>
          <Link to="/services" className="hover:text-blue-600">
            {t("nav.services")}
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            {t("nav.about")}
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            {t("nav.contact")}
          </Link>

          {/* Språkväxlare */}
          <div className="flex gap-2 ml-4">
            {SUPPORTED_LANGS.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`px-2 py-1 text-sm rounded ${
                  i18n.language === lang.code
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>

          {/* Inloggning / användarmeny */}
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {t("common.login")}
            </Link>
          ) : (
            <div className="flex gap-4 items-center">
              <span className="text-gray-700">{user?.name}</span>
              {user?.role === "admin" && (
                <Link to="/admin" className="text-red-600 hover:underline">
                  {t("common.admin")}
                </Link>
              )}
              <Link to="/profile" className="text-blue-600 hover:underline">
                {t("common.profile")}
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                {t("common.logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
