import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { BarbershopType, ServiceType } from "@/app/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface IBarbershopDetailsPage {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({ params }: IBarbershopDetailsPage) => {
  const session = await getServerSession(authOptions);

  if (!params.id) {
    // TODO: redirect to home page.
    return null;
  }

  const barbershop: BarbershopType = await db.barbershop.findUnique({
    where: {
      id: params.id
    },
    include: {
      services: true
    }
  });

  if (!barbershop) {
    return null;
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />
      <div className="px-5 py-6 flex flex-col gap-4">
        {barbershop.services.map((service: ServiceType) => (
          <ServiceItem
            key={service.id}
            barbershop={barbershop}
            service={service}
            session={session}
            isAuthenticated={!!session?.user}
          />
        ))}
      </div>
    </div>
  );
}

export default BarbershopDetailsPage;
