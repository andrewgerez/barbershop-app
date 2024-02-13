import { DefaultUser, getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { db } from "../_lib/prisma"
import BookingItem from "../_components/booking-item"
import { BookingType } from "../types"
import { isFuture, isPast } from "date-fns"

const BookingsPage = async () => {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as DefaultUser)?.id

  if (!session?.user) {
    return redirect("/")
  }

  const bookings: BookingType[] = await db.booking.findMany({
    where: {
      userId: userId,
    },
    include: {
      service: true,
      barbershop: true,
    }
  })

  const confirmedBookings = bookings.filter(booking => isFuture(booking.date))

  const finishedBookings = bookings.filter(booking => isPast(booking.date))

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">Confirmados</h2>

        <div className="flex flex-col gap-3">
          {confirmedBookings.map(booking => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">Finalizados</h2>

        <div className="flex flex-col gap-3">
          {finishedBookings.map(booking => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  )
}

export default BookingsPage
