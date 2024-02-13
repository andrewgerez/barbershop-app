"use client"
import { Button } from "@/app/_components/ui/button"
import { Calendar } from "@/app/_components/ui/calendar"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet"
import { BarbershopType, BookingType, ServiceType } from "@/app/types"
import { ptBR } from "date-fns/locale"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { generateDayTimeList } from "../_helpers/hours"
import { priceFormatted } from "../_helpers/price"
import { format, setHours, setMinutes } from "date-fns"
import { saveBooking } from "../_actions/save-booking"
import { DefaultUser, Session } from "next-auth"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { getDayBookings } from "../_actions/get-day-bookings"

interface IServiceItem {
  barbershop: BarbershopType;
  service: ServiceType;
  session: Session | null;
  isAuthenticated: boolean;
}

const ServiceItem = ({ barbershop, service, session, isAuthenticated }: IServiceItem) => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<string | undefined>()
  const [isFetching, setIsFetching] = useState(false)
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const [dayBookings, setDayBookings] = useState<BookingType[]>([])
  const router = useRouter()

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google")
    }
  }

  const timeList = useMemo(() => {
    if (!date) return []

    return generateDayTimeList(date).filter(time => {
      const timeHour = Number(time.split(':')[0])
      const timeMinutes = Number(time.split(':')[1])

      const booking = dayBookings.find(booking => {
        const bookingHour = Number(booking.date.getHours())  
        const bookingMinutes = Number(booking.date.getMinutes())

        return bookingHour === timeHour && bookingMinutes === timeMinutes
      })

      if (!booking) return true

      return false
    })
  }, [date, dayBookings])

  const handleDateClick = (date: Date | undefined) => {
    setDate(date)
    setHour(undefined)
  }

  const handleHourClick = (time: string) => {
    setHour(time)
  }

  const handleBookingSubmit = async () => {
    setIsFetching(true)
    try {
      if (!date || !hour || !session?.user) return

      const dateHour = Number(hour.split(':')[0])
      const dateMinutes = Number(hour.split(':')[1])

      const newDate = setMinutes( setHours(date, dateHour), dateMinutes)

      await saveBooking({
        barbershopId: barbershop.id,
        serviceId: service.id,
        date: newDate,
        userId: (session?.user as DefaultUser)?.id,
      })

      setSheetIsOpen(false)
      setHour(undefined)
      setDate(undefined)
      toast("Reserva realizada com sucesso!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.", { locale: ptBR }),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings"),
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    if (!date) return

    const refreshAvailableHours = async () => {
      const bookings = await getDayBookings(barbershop.id, date)

      setDayBookings(bookings)
    }

    refreshAvailableHours()
  }, [date, barbershop.id])

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4 items-center">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400 font-light">{service.description}</p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-primary text-sm font-bold">{priceFormatted(service.price)}</p>
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBookingClick}>Reservar</Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>

                  <div className="py-6">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      fromDate={new Date()}
                      locale={ptBR}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "2rem",
                          height: "2rem",
                        },
                        nav_button_next: {
                          width: "2rem",
                          height: "2rem",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {date && (
                    <div className="flex overflow-scroll py-6 px-5 gap-3 border-t border-solid border-secondary [&::-webkit-scrollbar]:hidden">
                      {timeList.map((time) => (
                        <Button
                          key={time}
                          size="sm"
                          variant={hour === time ? "default" : "outline"}
                          className="rounded-full"
                          onClick={() => handleHourClick(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="py-6 px-5 border-t border-solid border-secondary">
                    <Card>
                      <CardContent className="flex flex-col p-3 gap-3">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="font-bold text-sm">{priceFormatted(service.price)}</h3>
                        </div>

                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-400">Data</h3>
                            <h4 className="text-sm">
                              {format(date, "dd 'de' MMMM", { locale: ptBR })}
                            </h4>
                          </div>
                        )}


                        {hour && (
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-400">Horário</h3>
                            <h4 className="text-sm">{hour}</h4>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <h3 className="text-sm text-gray-400">Barbearia</h3>
                          <h4 className="text-sm">{barbershop.name}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <SheetFooter className="px-5">
                    <Button onClick={handleBookingSubmit} disabled={!date || !hour || isFetching}>
                      {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Confirmar reserva
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
