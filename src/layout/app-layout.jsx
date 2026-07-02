import Header from "@/components/header";
import React from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <div className="grid-background"></div>

      <main className="max-w-7xl mx-auto px-4 min-h-screen">
        <Header />
        <Outlet />
      </main>

      <div className="p-10 text-center bg-gray-800 mt-10 ">
        Made with love by preeti
      </div>
    </div>
  );
}
