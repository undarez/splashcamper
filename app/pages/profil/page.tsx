"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//importer le composant ConnectYou pour obliger l'utilisateur a ce connecter pour modifier son profil
import ConnectYou from "../auth/connect-you/page";
const Page = () => {
  const { data: session } = useSession();

   // Afficher le composant de connexion si l'utilisateur n'est pas connecté
   if (status === "loading") {
    return <div>Chargement...</div>;
  }

  if (!session) {
    return <ConnectYou />; // Rediriger vers ConnectYou si l'utilisateur n'est pas connecté
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-lg mx-auto shadow-md">
        <CardHeader>
          <CardTitle>Profil utilisateur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            {/* Avatar de l'utilisateur */}
            <Avatar className="w-24 h-24">
              <AvatarImage src={session?.user?.image || "/images/default-avatar.png"} alt="User Avatar" />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>

            {/* Information personnelle */}
            <div className="w-full">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" type="text" value={session?.user?.name || ""} disabled />
            </div>

            <div className="w-full">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={session?.user?.email || ""} disabled />
            </div>
            <Link href="/pages/profil/editprofil">
            <Button variant="destructive">Modifier le profil</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
