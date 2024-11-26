"use client";

import React, { useState } from "react";
import { Card } from "@mui/material";
import Image from "next/image";

const budayaImages = [
  "/ladiesprogram.png",
  "/youthcc.png",
  "/indocityexpo.png",
  "/karnaval.png",
];

const BudayaPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="grid grid-cols-1 gap-8 place-items-center w-full max-w-3xl">
        {budayaImages.map((imageSrc, index) => (
          <Card
            key={index}
            className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              width: "100%",
              height: "400px",
              backgroundColor: "#FDE68A",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={imageSrc}
                alt={`Image ${index + 1}`}
                layout="fill"
                className="object-cover"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BudayaPage;
