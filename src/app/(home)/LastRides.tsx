import { RideCard } from '@/components/ride/RideCard'
import { IRide } from '@/models/IRide'
import Link from 'next/link'
import React from 'react'

export function LastRides({ rides }: { rides: IRide[]}) {
  return (
    <>
      <div className="flex justify-between">
        <h3 className="font-bold">Últimas caronas:</h3>
        <Link className="text-emerald-600 font-semibold" href="/rides">
          Ver todas
        </Link>
      </div>
      <ul className="space-y-2">
        {rides.map((ride) => (
          <li key={ride._id}>
            <Link href={`/ride/${ride._id}`}>
              <RideCard ride={ride} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
