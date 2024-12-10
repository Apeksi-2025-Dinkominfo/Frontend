'use client'

import { useEffect, useState } from 'react'
import { nationalConferenceMembers } from '.././utils/walikota'

export default function ScrollingMembers() {
  const [offset1, setOffset1] = useState(0)
  const [offset2, setOffset2] = useState(0)
  const [offset3, setOffset3] = useState(0)

  useEffect(() => {
    const animate = () => {
      setOffset1((prev) => (prev + 1) % (nationalConferenceMembers.length * 200))
      setOffset2((prev) => (prev - 1.5) % (nationalConferenceMembers.length * 200))
      setOffset3((prev) => (prev + 2) % (nationalConferenceMembers.length * 200))
    }

    const interval = setInterval(animate, 50)
    return () => clearInterval(interval)
  }, [])

  const renderMemberRow = (offset: number, reverse: boolean = false) => (
    <div
      className="flex gap-4 absolute whitespace-nowrap transition-transform duration-100"
      style={{
        transform: `translateX(${reverse ? offset : -offset}px)`,
      }}
    >
      {[...nationalConferenceMembers, ...nationalConferenceMembers].map((member, index) => (
        <div key={index} className="inline-flex flex-col items-center min-w-[150px]">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-2" />
          <p className="font-semibold text-sm">{member.komwil}</p>
          <p className="text-xs">{member.cityName}</p>
          <p className="text-xs text-gray-600">{member.province}</p>
        </div>
      ))}
    </div>
  )

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">Anggota Munas</h2>
      <div className="relative h-[600px] overflow-hidden">
        <div className="relative h-[150px] mb-8 overflow-hidden">
          {renderMemberRow(offset1)}
        </div>
        <div className="relative h-[150px] mb-8 overflow-hidden">
          {renderMemberRow(offset2, true)}
        </div>
        <div className="relative h-[150px] overflow-hidden">
          {renderMemberRow(offset3)}
        </div>
      </div>
    </div>
  )
}

