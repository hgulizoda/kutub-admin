import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";

const PrivateRoutes = () => {
  const auth = useAuthStore((s) => s.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/login");
      return;
    }
  }, [auth]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
