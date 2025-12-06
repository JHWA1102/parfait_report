import React, { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  function login() {
    const url = "/api/login";
    axios
      .post(url, {
        title: "New Post",
        body: "This is the content of the new post.",
        userId: 1,
      })
      .then((response) => {
        console.log("Post created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  }

  return (
    <div>
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-12 border border-gray-100">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center color-gray-700 tracking-tight mb-10">
          PARFAIT ERP
        </h1>

        {/* ID */}
        <div className="mb-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              👤
            </span>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none placeholder-gray-400"
              placeholder="ID"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              🔒
            </span>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none placeholder-gray-400"
              placeholder="PASSWORD"
            />
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between mb-8">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded" />
            Remember me
          </label>

          <button className="text-sm color-gray-700 hover:text-indigo-700">
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <button
          className="w-full bg-indigo-600 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-indigo-700 transition-all"
          onClick={login}
        >
          LOGIN
        </button>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          © {new Date().getFullYear()} Parfait ERP — All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Login;
