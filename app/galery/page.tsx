// app/pendaftars/page.jsx
"use client"; // Ini harus di bagian atas agar komponen berjalan di client

import { useEffect, useState } from "react";

export default function PendaftarsPage() {
  const [pendaftars, setPendaftars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API on the client side
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:1337/api/pendaftars');
        const data = await res.json();
        setPendaftars(data.data); // Update state with the fetched data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures fetching happens once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Daftar Pendaftar</h1>
      <ul>
        {pendaftars.map((pendaftar) => (
          <li key={pendaftar.id}>
            {pendaftar.asal_kota}
          </li>
        ))}
      </ul>
    </div>
  );
}
