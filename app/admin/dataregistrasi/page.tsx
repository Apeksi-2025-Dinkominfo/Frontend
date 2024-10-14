"use client";
import Sidebar from '../../components/sidebar';
import { useState } from 'react';

export default function DataRegistrasi() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeButton, setActiveButton] = useState(2); // Use number (2 represents Data Registrasi)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSidebarClick = (buttonId: number) => { // Expecting number now
    setActiveButton(buttonId);
  };

  const data = [
    { no: 1, title: "The Moon that Can't be Seen", writer: "Rara", category: "Teen Fiction", keyword: "school, fiction" },
    { no: 2, title: "Given", writer: "Sansa S.", category: "Romance", keyword: "music" },
    { no: 3, title: "Fish Swimming In The Sky", writer: "Kaenarita Faly", category: "Fantasy", keyword: "fantasy, romance" },
    { no: 4, title: "The Science of Fertility PCOS", writer: "Jessie Inchauspé", category: "Non Fiction", keyword: "science, PCOS" },
    { no: 5, title: "The Glucose Goddess Method", writer: "Jessie Inchauspé", category: "Non Fiction", keyword: "glucose, science" }
  ];

  return (
    <div className="flex">
      {/* Passing activeButton as a number */}
      <Sidebar activeButton={activeButton} onButtonClick={handleSidebarClick} />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Search</h2>
            <input
              type="text"
              placeholder="Search by Writers/Title"
              className="border p-2 mt-1"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">+ Add Story</button>
        </div>

        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Writers</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Keyword</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                item.writer.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item) => (
                <tr key={item.no}>
                  <td className="border px-4 py-2">{item.no}</td>
                  <td className="border px-4 py-2">{item.title}</td>
                  <td className="border px-4 py-2">{item.writer}</td>
                  <td className="border px-4 py-2">{item.category}</td>
                  <td className="border px-4 py-2">{item.keyword}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-blue-500 text-white px-4 py-1 mr-2 rounded hover:bg-blue-600">Update</button>
                    <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
