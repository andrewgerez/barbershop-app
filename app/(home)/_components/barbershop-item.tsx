"use client"

import { Badge } from "@/app/_components/ui/badge"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Barbershop } from "@prisma/client"
import { StarIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface IBarberShopItem {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: IBarberShopItem) => {
  const router = useRouter()

  const handleBookingClick = () => {
    router.push(`/barbershops/${barbershop.id}`)
  }

  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="px-1 py-0">
        <div className="w-full h-[159px] relative">
          <div className="absolute top-2 left-2 z-50">
            <Badge variant="secondary" className="flex gap-1 items-center top-3 left-3 z-50 opacity-90">
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="text-xs">5,0</span>
            </Badge>
          </div>
          <Image
            src={barbershop.imageUrl}
            alt={`${barbershop.name}`}
            fill
            style={{ objectFit: "cover" }}
            className="h-[159px] w-full rounded"
          />
        </div>

        <div className="px-2 pb-3">
          <h2 className="mt-2 font-bold overflow-hidden text-ellipsis text-nowrap whitespace-pre">{barbershop.name}</h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap whitespace-pre">{barbershop.address}</p>
          <Button className="mt-3 w-full" variant="secondary" onClick={handleBookingClick}>
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
