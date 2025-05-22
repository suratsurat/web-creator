import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserSite() {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
  fetch(`https://web-creator-umit.onrender.com/user/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => {
        // Parse JSON strings for products and feedbacks if needed
        if (typeof data.products === "string") data.products = JSON.parse(data.products);
        if (typeof data.feedbacks === "string") data.feedbacks = JSON.parse(data.feedbacks);
        setData(data);
      })
      .catch(() => setData(null));
  }, [slug]);

  if (data === null) return <div className="p-6">User data not found or loading...</div>;
  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div
      className="min-h-screen p-6"
      style={{ fontFamily: data.theme.fontFamily, color: data.theme.primaryColor }}
    >
      <header className="mb-10 border-b pb-6">
        <h1 className="text-5xl font-bold">{data.bussiness_name}</h1>
        <p className="text-lg mt-1">Owner: {data.owner_name}</p>
        <p>Contact: {data.mobile_number} | {data.email}</p>
        <p>Location: {data.location}</p>
        <p className="italic mt-2">Our Specialities: {data.our_specialities}</p>
      </header>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-5">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.products && data.products.length ? data.products.map((p, i) => (
            <div key={i} className="border rounded p-4 shadow-lg hover:shadow-2xl transition">
              <h3 className="text-xl font-bold mb-2">{p.product_name}</h3>
              <p>{p.product_description}</p>
            </div>
          )) : <p>No products available.</p>}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-5">Feedback</h2>
        {data.feedbacks && data.feedbacks.length ? data.feedbacks.map((f, i) => (
          <blockquote
            key={i}
            className="border-l-4 border-indigo-600 pl-5 italic mb-6 text-lg"
          >
            “{f.message}”
            <footer className="mt-1 font-semibold">- {f.feedback_name}</footer>
          </blockquote>
        )) : <p>No feedback yet.</p>}
      </section>

      <footer className="border-t mt-16 pt-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} {data.bussiness_name}
      </footer>
    </div>
  );
}
  