"use client";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { ServiceType } from "@/app/types";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface IServiceItem {
  service: ServiceType;
  isAuthenticated: boolean;
}

const ServiceItem = ({ service, isAuthenticated }: IServiceItem) => {
  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    }

    // TODO: open booking modal.
  }

  const priceFormatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(service.price);

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
              <h2 className="text-primary text-sm font-bold">{priceFormatted}</h2>
              <Button variant="secondary" onClick={handleBookingClick}>Reservar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ServiceItem;
