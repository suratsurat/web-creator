import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [formData, setFormData] = useState({
    bussiness_name: "",
    owner_name: "",
    mobile_number: "",
    email: "",
    whatsapp_number: "",
    location: "",
    phone_number: "",
    comapny_name: "",
    year_of_east: "",
    gst_number: "",
    our_specialities: "",
    upi_id: "",
    enquiry_name: "",
    enquiry_phone_number: "",
    enquiry_email: "",
    enquiry_message: "",
    products: JSON.stringify([
      { product_name: "Sample Product 1", product_description: "Description 1" },
      { product_name: "Sample Product 2", product_description: "Description 2" },
    ]),
    feedbacks: JSON.stringify([
      { feedback_name: "Customer 1", message: "Great service!" },
      { feedback_name: "Customer 2", message: "Loved it." },
    ]),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        navigate(`/${data.slug}`);
      } else {
        alert("Submission failed");
      }
    } catch (err) {
      alert("Error submitting form");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Your Live Website</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="bussiness_name"
          placeholder="Business Name"
          required
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="owner_name"
          placeholder="Owner Name"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="mobile_number"
          placeholder="Mobile Number"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {/* Add more fields if needed */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Website"}
        </button>
      </form>
    </div>
  );
}
