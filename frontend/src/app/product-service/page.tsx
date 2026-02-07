"use client";

import React from "react";
import ProductForm from "../../components/ProductForm/ProductForm";
import "./page.css";

export default function Page() {
  return (
    <main className="ps-page">
      <div className="ps-container">
        <h1 className="ps-heading">Product & Service Details</h1>
        <p className="ps-sub">Provide accurate information so AdPatterns can generate high-performing ad setups for you.</p>
        <ProductForm />
      </div>
    </main>
  );
}
