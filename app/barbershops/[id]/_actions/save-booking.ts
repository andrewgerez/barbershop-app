"use server";

import { db } from "@/app/_lib/prisma";

interface ISaveBooking {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const saveBooking = async ({ barbershopId, serviceId, userId, date} : ISaveBooking) => {
  await db.booking.create({
    data: {
      barbershopId,
      serviceId,
      userId,
      date
    }
  })
}