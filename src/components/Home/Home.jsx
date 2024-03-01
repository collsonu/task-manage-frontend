import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from "../"
import { useForm } from "react-hook-form"
import { postApiCall } from '../../services/api.js';

function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")


  const userLogin = async (data) => {
    const response = await postApiCall("users/login-user", data)
    if (response.errors) {
      setError(response.errors[0])
      return;
    }
    localStorage.setItem("accessToken", response.data.accessToken)
    alert(response.message);
    navigate("/task");
  };

  return (
    <div
      className='flex items-center justify-center w-full'
    >
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(userLogin)} className='mt-8'>
          <div className='space-y-5'>
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full"
            >Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login