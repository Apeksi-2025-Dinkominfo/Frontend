// pages/hotels/page.tsx 
"use client";
import React from "react";
import { accommodationsData } from "../utils/accommodations"; // Import data
import BedIcon from '@mui/icons-material/Hotel'; // MUI Bed icon
import BathIcon from '@mui/icons-material/Bathtub'; // MUI Bath icon
import LocationOnIcon from '@mui/icons-material/LocationOn'; // MUI Location icon

const Hotels: React.FC = () => {
    return (
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5">Available Accommodations</h1>
        
        {/* Grid responsive untuk 2 kolom di ukuran kecil */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {accommodationsData.map((item) => (
            <div 
              key={item.id}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transition duration-300 hover:opacity-90"
              />

              {/* Distance overlay, dengan border-radius 12px */}
              <div className="absolute top-[220px] left-2 bg-light text-white text-sm px-2 py-1 rounded-lg flex items-center">
                <LocationOnIcon style={{ fontSize: '16px', marginRight: '4px' }} />
                <span>{item.distance}</span>
              </div>

              <div className="p-4">
                <h6 className="text-xl font-bold transition-colors duration-300 hover:text-light">
                  {item.price}
                </h6>
                <h4 className="text-lg font-semibold transition-colors duration-300 hover:text-second">
                  {item.title}
                </h4>
                <p className="text-gray-600">{item.address}</p>

                {/* Beds and Baths info */}
                <div className="flex items-center mt-2 space-x-4">
                  {/* Beds */}
                  <div className="flex items-center space-x-1">
                    <BedIcon style={{ fontSize: '24px', color: '#4A4A4A' }} />
                    <span>{item.beds} Beds</span>
                  </div>
                  {/* Baths */}
                  <div className="flex items-center space-x-1">
                    <BathIcon style={{ fontSize: '24px', color: '#4A4A4A' }} />
                    <span>{item.baths} Baths</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Hotels;
