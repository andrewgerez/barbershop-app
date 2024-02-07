import { Barbershop, Booking, Service } from "@prisma/client";
import { DefaultUser, Session } from "next-auth";

export type BarbershopType = Barbershop;

export type ServiceType = Service;

export type BookingType = Booking;
