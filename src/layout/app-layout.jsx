import Header from "@/components/header";
import React from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <div className="grid-background"></div>

      <main className="max-w-7xl mx-auto px-4 min-h-screen mb-10">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
