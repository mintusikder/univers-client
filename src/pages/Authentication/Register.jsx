import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdArrowRightAlt } from "react-icons/md";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Auth/AuthContext";
import useAxiosSecure from "../../hook/useAxiosSecure";

const Register = () => {
  const useAxios = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { createUser, updateUserProfile, setUser, googleLogin } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) return toast.error("Password must be at least 6 characters.");
    if (!/[A-Z]/.test(password)) return toast.error("Include at least one uppercase letter.");
    if (!/[a-z]/.test(password)) return toast.error("Include at least one lowercase letter.");
    if (!/\d/.test(password)) return toast.error("Include at least one number.");
    if (!/[\W_]/.test(password)) return toast.error("Include at least one special character.");

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateUserProfile({ displayName: name, photoURL: photo });
      setUser({ ...user, displayName: name, photoURL: photo });

      await useAxios.post("/users", {
        name,
        email,
        photo,
        role: "user",
      });

      toast.success("Registration successful!");
      form.reset();
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(`Register failed: ${error.message}`);
    }
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Google login successful!");
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch((error) => toast.error(`Google Login Failed: ${error.message}`));
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Helmet>
        <title>The Garden Glow | Register</title>
      </Helmet>

      <div className="w-full flex flex-col items-center justify-center p-6">
        <form
          onSubmit={handleRegister}
          className="md:w-96 w-80 flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-3xl font-semibold text-gray-800">Register</h2>
          <p className="text-sm text-gray-500 mt-2 mb-6">Create a new account to get started</p>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700 font-medium"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          <div className="flex items-center gap-4 w-full my-6">
            <div className="w-full h-px bg-gray-200" />
            <p className="text-xs text-gray-400 whitespace-nowrap">or register with email</p>
            <div className="w-full h-px bg-gray-200" />
          </div>

          <div className="w-full space-y-4">
            {/* Name */}
            <div className="flex items-center border border-gray-300 h-12 rounded-lg px-4 gap-3 focus-within:border-red-500 transition-colors">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6B7280">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M5.121 17.804A7.5 7.5 0 0112 15a7.5 7.5 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              />
            </div>

            {/* Photo */}
            <div className="flex items-center border border-gray-300 h-12 rounded-lg px-4 gap-3 focus-within:border-red-500 transition-colors">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6B7280">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 5a2 2 0 012-2h2l1-1h6l1 1h2a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm4 8l2.586 2.586a1 1 0 001.414 0L15 11l4 5H5l2-3zm1-6a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                />
              </svg>
              <input
                type="url"
                name="photo"
                placeholder="Photo URL"
                required
                className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border border-gray-300 h-12 rounded-lg px-4 gap-3 focus-within:border-red-500 transition-colors">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border border-gray-300 h-12 rounded-lg px-4 gap-3 focus-within:border-red-500 transition-colors">
              <svg width="13" height="17" viewBox="0 0 13 17" fill="none">
                <path
                  d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              />
              <span className="cursor-pointer text-gray-500" onClick={() => setShow(!show)}>
                {show ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Register <MdArrowRightAlt size={20} />
          </button>

          <p className="text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-500 hover:text-red-600 font-medium hover:underline transition-colors"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
