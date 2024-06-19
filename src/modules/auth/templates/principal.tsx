"use client";

import Link from "next/link";

export default function Principal() {
  return (
    <section className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex flex-col justify-center p-10 rounded-3xl gap-3 border border-black h-60 w-60">
        <div className="flex flex-col">
          <h1 className="text-2xl">OptiTech</h1>
          <p>Welcome back</p>
        </div>
        <div className="flex  justify-between">
          <Link
            href="/login"
            className="bg-black text-white p-1 border border-black rounded-md hover:bg-white hover:text-black text-xs"
          >
            Sign In
          </Link>
          <Link
            href="/signUp"
            className="p-1 border border-black rounded-md hover:bg-black hover:text-white text-xs"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
