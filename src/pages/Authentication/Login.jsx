import React, { useState, useContext } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { MdArrowRightAlt } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Auth/AuthContext";

const EmailIcon = () => (
  <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
      fill="#6B7280"
    />
  </svg>
);

const PasswordIcon = () => (
  <svg width="13" height="17" viewBox="0 0 13 17" fill="none">
    <path
      d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
      fill="#6B7280"
    />
  </svg>
);

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, googleLogin } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success("Login successful!");
        form.reset();
        setShow(false);
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message || "Login failed.");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Google login successful!");
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(`Google Login Failed: ${error.message}`);
      });
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Helmet>
        <title>SmartSelf | Login</title>
      </Helmet>
      <div className="w-full flex flex-col items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="md:w-96 w-80 flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-3xl font-semibold text-gray-800">Sign in</h2>
          <p className="text-sm text-gray-500 mt-2 mb-6">
            Welcome back! Please sign in to continue
          </p>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700 font-medium"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          <div className="flex items-center gap-4 w-full my-6">
            <div className="w-full h-px bg-gray-200"></div>
            <p className="text-xs text-gray-400 whitespace-nowrap">
              or sign in with email
            </p>
            <div className="w-full h-px bg-gray-200"></div>
          </div>

          <div className="w-full space-y-4">
            {/* Email */}
            <div className="flex items-center border border-gray-300 h-12 rounded-lg px-4 gap-3 focus-within:border-red-500 transition-colors">
              <EmailIcon />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="w-full text-sm bg-transparent text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border border-gray-300 h-12 rounded-lg px-4 gap-3 focus-within:border-red-500 transition-colors">
              <PasswordIcon />
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="w-full text-sm bg-transparent text-gray-700 placeholder-gray-400 outline-none"
              />
              <span
                className="cursor-pointer text-gray-500"
                onClick={() => setShow(!show)}
              >
                {show ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-red-500 hover:text-red-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            Login <MdArrowRightAlt size={20} />
          </button>

          <p className="text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-red-500 hover:text-red-600 font-medium hover:underline"
            >
              Create
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
