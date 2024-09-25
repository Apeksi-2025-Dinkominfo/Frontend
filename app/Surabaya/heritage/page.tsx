// app/Surabaya/heritage/page.tsx
import React from 'react';

export default async function HeritagePage() {
  const res = await fetch('https://tourism.surabaya.go.id/api/kominfo/destination?page=1');
  const result = await res.json();

  // Correctly access the nested 'data' field
  const destinations = result.data?.data || [];

  // Check if destinations array has data
  if (destinations.length === 0) {
    return <div>No destinations available.</div>;
  }

  return (
    <div>
      <h1>Tourist Destinations</h1>
      <div className="grid grid-cols-2 gap-4">
        {destinations.map((destination: any) => (
          <div className="border p-4">
            <h2>{destination.nameIndonesia}</h2>
            <p><strong>Address:</strong> {destination.address}</p>
            <p>{destination.descriptionIndonesia}</p>
            <p><strong>Latitude:</strong> {destination.latitude}</p>
            <p><strong>Longitude:</strong> {destination.longitude}</p>
            {destination.touristDestinationFiles.length > 0 && (
              <img 
              src={destination.touristDestinationFiles[0].link}  
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
