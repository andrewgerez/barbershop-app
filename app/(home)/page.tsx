import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Header from "../_components/header"
import Search from "./_components/search"
import { db } from "../_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { BarbershopType, BookingType } from "../types"
import { DefaultUser, getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import BookingItem from "../_components/booking-item"

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}) as BarbershopType[],
    session?.user ? db.booking.findMany({
      where: {
        userId: (session?.user as DefaultUser)?.id,
        date: {
          gte: new Date(),
        }
      },
      include: {
        service: true,
        barbershop: true,
      }
    }) as BookingType[] : Promise.resolve([]),
  ])

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Andrew!</h2>
        <p className="capitalize text-xs font-light">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="mt-6">
        <h2 className="pl-5 mb-3 text-xs uppercase text-gray-400 font-bold">Agendamentos</h2>
        <div className="flex gap-3 px-5 mt-6 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map(booking => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Populares</h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
