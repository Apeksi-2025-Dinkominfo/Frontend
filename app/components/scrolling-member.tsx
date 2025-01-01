"use client";

import { useEffect, useState } from "react";
import { nationalConferenceMembers } from "../utils/walikota";

interface Member {
  komwil: string;
  cityName: string;
  province: string;
}

export default function ScrollingMembers() {
  const [offset1, setOffset1] = useState(0);
  const [offset2, setOffset2] = useState(0);
  const [offset3, setOffset3] = useState(0);

  useEffect(() => {
    const animate = () => {
      setOffset1((prev) => (prev + 1) % (firstRow.length * 200));
      setOffset2((prev) => (prev - 1.5 + secondRow.length * 200) % (secondRow.length * 200));
      setOffset3((prev) => (prev + 2) % (thirdRow.length * 200));
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  const rowSize = Math.ceil(nationalConferenceMembers.length / 3);
  const firstRow = nationalConferenceMembers.slice(0, rowSize);
  const secondRow = nationalConferenceMembers.slice(rowSize, rowSize * 2);
  const thirdRow = nationalConferenceMembers.slice(rowSize * 2);

  const renderMemberRow = (data: Member[], offset: number, reverse: boolean = false) => (
    <div
      className="flex gap-4 absolute whitespace-nowrap"
      style={{
        transform: `translateX(${reverse ? offset : -offset}px)`
      }}
    >
      {[...data, ...data].map((member, index) => (
        <div key={index} className="inline-flex flex-col items-center min-w-[150px]">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-2" />
          <p className="font-semibold text-sm">{member.komwil}</p>
          <p className="text-xs">{member.cityName}</p>
          <p className="text-xs text-gray-600">{member.province}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">Anggota Munas</h2>
      <div className="relative h-[600px] overflow-hidden">
        <div className="relative h-[150px] mb-8 overflow-hidden">
          {renderMemberRow(firstRow, offset1)}
        </div>
        <div className="relative h-[150px] mb-8 overflow-hidden">
          {renderMemberRow(secondRow, offset2)}
        </div>
        <div className="relative h-[150px] overflow-hidden">
          {renderMemberRow(thirdRow, offset3)}
        </div>
      </div>
    </div>
  );
}
