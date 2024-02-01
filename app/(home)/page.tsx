import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Header from "../_components/header";
import Search from "./_components/search";

export default function Home() {
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
    </div>
  );
}
