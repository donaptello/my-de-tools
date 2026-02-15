import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import LoginForm from "../../components/auth/LoginForm";
import { motion } from "framer-motion";
import BrandingLogin from "../../components/auth/Branding";
import { useEffect } from "react";
import { useAuthLogin } from "../../services/hooks/useAuth";

export default function Login() {
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();
  const { login, loading } = useAuthLogin();

  const handleLogin = async (email: string, password: string) => {
    const res = login(email, password);
    const tokenAccess = (await res).accessToken;
    console.log("Token:", tokenAccess);
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
          />
        </motion.div>
      </div>
    </div>
  );
}
