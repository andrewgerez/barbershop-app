"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

const Header = () => {
  const { data } = useSession();
  const handleLoginClick = async () => {
    await signIn();
  }

  const renderButtonComponent = () => {
    if (data?.user) {
      return (
        <Button variant="outline" size="icon" className="h-8 w-8">
          <MenuIcon size={18} />
        </Button>
      )
    } else {
      return (
        <Button onClick={handleLoginClick}>Login</Button>
      )
    }
  }

  return (
    <Card className="border-none">
      <CardContent className="p-5 justify-between items-center flex flex-row">
        <Image src="/logo.png" alt="Barber Shop" height={22} width={120} />
        {renderButtonComponent()}
      </CardContent>
    </Card>
  );
}

export default Header;
