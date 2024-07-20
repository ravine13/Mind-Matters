import React, { useContext, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";

const Login = () => {
  const { login } = useContext(UserContext);
  const [formErrors, setFormErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    let errors = {};
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      Swal.fire({
        icon: "error",
        text: "Please correct the errors in the form.",
      });
      return;
    }

    try {
      await login(email, password);
      Swal.fire({
        icon: "success",
        text: "Logged in successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-md mx-auto mt-24 px-4 md:px-6 flex-col gap-4 border py-10 rounded-2xl border-zinc-300 shadow-xl"
    >
      <h3 className="text-2xl text-center">Login</h3>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          className="px-4 text-black"
          color={formErrors.email ? "failure" : "default"}
        />
        {formErrors.email && (
          <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
        )}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="on"
          required
          className="px-4 text-black"
          color={formErrors.password ? "failure" : "default"}
        />
        {formErrors.password && (
          <p className="text-red-600 text-sm mt-1">{formErrors.password}</p>
        )}
      </div>

      <Button
        className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full"
        type="submit"
      >
        Login
      </Button>

      <div className="flex justify-between">
        <p>
          Don't have an account?
          <Link className="text-cyan-500 ml-1" to="/signup">
            Sign Up
          </Link>
        </p>
        <Link className="text-cyan-500 ml-1" to="/reset_password">
          Forgot password
        </Link>
      </div>
    </form>
  );
};

export default Login;
