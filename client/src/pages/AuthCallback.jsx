import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCredentials } from "../features/auth/authSlice";

export default function AuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const userParam = params.get("user");
    if (token && userParam) {
      const user = JSON.parse(decodeURIComponent(userParam));
      dispatch(setCredentials({ user, token }));
      navigate(user.role === "admin" ? "/admin" : "/profile");
    } else {
      navigate("/login");
    }
  }, [dispatch, location, navigate]);

  return <div className="text-center mt-10">{t("common.loading")}</div>;
}
