import { useOutletContext, useNavigate } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import LoginForm from "../../components/auth/LoginForm";
import { motion } from "framer-motion";
import BrandingLogin from "../../components/auth/Branding";
import { useEffect, useState } from "react";
import { useAuthLogin } from "../../services/hooks/useAuth";
import { useAuth } from "../../context/AuthContext";
import { parseJwt } from "../../helpers/tokenParser";

export default function Login() {
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();
  const { login: loginAPI, loading } = useAuthLogin();
  const { login: loginContext } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await loginAPI(email, password);

      if (res.statusCode === 201 && res.accessToken !== null) {
        const tokenAccess = res.accessToken;
        const userData = parseJwt(tokenAccess);

        if (userData) {
          loginContext({
            user: userData,
            token: tokenAccess,
          });
          
          setError("");
          navigate("/");
        } else {
          throw new Error("Invalid token format");
        }
      } else if (res.statusCode === 404) {
        setError("Username is not found!");
      } else if (res.statusCode === 401) {
        setError("Password is incorrect!");
      }
    } catch (error) {
      setError(`Login failed: ${error}`);
    }
  };

  useEffect(() => {
    setTitle("Login");
  }, [setTitle]);
  return (
    <div className="h-full min-h-0 flex-1 items-stretch flex justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl w-full">
        <BrandingLogin darkMode={darkMode} />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <LoginForm
            onSubmit={handleLogin}
            darkMode={darkMode}
            isLoading={loading}
            error={error}
          />
        </motion.div>
      </div>
    </div>
  );
}
