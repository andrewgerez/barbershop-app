import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

interface IBookingItem {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    }
  }>;
}

const BookingItem = ({ booking }: IBookingItem) => {
  const isBookingConfirm = isFuture(booking.date)

  return (
    <Card className="min-w-full">
      <CardContent className="flex py-0 px-0">
        <div className="flex flex-[3] flex-col pl-5 py-5 gap-2">
          <Badge variant={isBookingConfirm ? "default" : "secondary"} className="w-fit">
            {isBookingConfirm ? "Confirmado" : "Finalizado"}
          </Badge>
          <h2 className="font-bold">{booking.service.name}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.barbershop.imageUrl} />

              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">{booking.barbershop.name}</h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center border-l border-solid border-secondary">
          <p className="text-sm capitalize">{format(booking.date, "MMMM", { locale: ptBR })}</p>
          <p className="text-2xl">{format(booking.date, "dd")}</p>
          <p className="text-sm">{format(booking.date, "hh:mm")}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingItem
