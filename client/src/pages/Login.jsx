import React from "react";
import { Lock, MailIcon, User2Icon } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import api from "../config/api";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch()
  const query = new URLSearchParams(window.location.search);
  const url_state = query.get("state");

  const [state, setState] = React.useState(url_state || "login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const {data} = await api.post(`/api/users/${state}`,formData)
      dispatch(login(data))
      localStorage.setItem("token", data.token)
      toast.success(data.message)

      if (state === "register") {
      setState("login"); // Switch to login after successful signup
    }
    }catch(err){
      toast.error(err?.response?.data?.message || err.message)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-custompurple blur-[100px] opacity-30"></div>
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">Please {state} to continue</p>

        {/* NAME............. */}

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={16} color="#6B7280" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email ............ */}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <MailIcon size={14} color="#6B7280" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password.............. */}
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={14} color="#6B7280" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forgot*/}
        <div className="mt-4 text-left text-custompurple">
          <button className="text-sm" type="reset">
            Forget password?
          </button>
        </div>

        {/* Login button ........... */}
        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-custompurple hover:bg-purple-700 transition-opacity"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-500 text-sm mt-3 mb-11"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <a href="#" className="text-custompurple hover:underline">
            click here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
