import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
  return (
    <Card className="rounded border border-solid">
      <CardContent className="p-5 py-0 flex flex-row justify-between">
        <div className="py-5 flex flex-col gap-2">
          <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit">Confirmado</Badge>
          <h2 className="font-bold">Corte de cabelo</h2>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />

              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>

        <div className="px-6 flex flex-col items-center justify-center border-l border-solid border-secondary">
          <p className="text-sm">Fevereiro</p>
          <p className="text-2xl">01</p>
          <p className="text-sm">07:00</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default BookingItem;