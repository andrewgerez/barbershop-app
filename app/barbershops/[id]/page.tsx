import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";

interface IBarbershopDetailsPage {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({ params }: IBarbershopDetailsPage) => {
  if (!params.id) {
    // TODO: redirect to home page.
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    }
  });

  if (!barbershop) {
    return null;
  }

  return (
    <BarbershopInfo barbershop={barbershop} />
  );
}
 
export default BarbershopDetailsPage;
