// Frontend: React + Tailwind CSS
// App.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function App() {
  const [domain, setDomain] = useState("VLSI");
  const [location, setLocation] = useState("Remote");
  const [type, setType] = useState("Internship");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch("http://localhost:5000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain, location, type }),
    });
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hardware Domain Job Scraper</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Domain (e.g., SoC, Embedded)"
          className="p-2 border rounded"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g., Remote, India)"
          className="p-2 border rounded"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded"
        >
          <option>Internship</option>
          <option>Full-Time</option>
        </select>
      </div>
      <Button onClick={handleSearch}>Search</Button>

      <div className="mt-6">
        {results.map((item, index) => (
          <div key={index} className="mb-4 p-4 border rounded shadow">
            <p><strong>Company:</strong> {item.company}</p>
            <p><strong>Title:</strong> {item.title}</p>
            <p><strong>Contact:</strong> {item.contact_name} ({item.contact_email})</p>
            <p><strong>Email Template:</strong></p>
            <pre className="bg-gray-100 p-2 text-sm rounded">{item.email_template}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
