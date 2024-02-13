import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Header from "../_components/header"
import Search from "./_components/search"
import BookingItem from "../_components/booking-item"
import { db } from "../_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { BarbershopType } from "../types"

export default async function Home() {
  const barbershops: BarbershopType[] = await db.barbershop.findMany({})

  const currentDate = format(new Date(), "EEEE',' dd 'de' MMMM", {
    locale: ptBR,
  })

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Andrew!</h2>
        <p className="capitalize text-xs font-light">{currentDate}</p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="px-5 mt-6">
        <h2 className="mb-3 text-xs uppercase text-gray-400 font-bold">Agendamentos</h2>
        {/* <BookingItem /> */}
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
