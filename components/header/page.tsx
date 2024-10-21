"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Page = () => {
  const { data: session } = useSession(); // Récupérer l'état de la session

  return (
    <header className="w-full h-auto justify-center rounded-md border-b-4 border-cyan-500 shadow-xl flex">
      <div className="flex flex-1 justify-around items-center">
        <Link href="/">
          <Image
            src={"/images/logo.png"}
            alt="logo"
            width={250}
            height={250}
            priority
          />
        </Link>
        <Menubar className="flex w-auto h-auto p-4">
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Button
                className="font-mono text-lg italic font-semibold"
                variant="ghost"
              >
                Localisations
              </Button>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link href="/pages/localisations">Voir les localisations</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger asChild>
              <Button
                className="font-mono text-lg italic font-semibold"
                variant="ghost"
              >
                About
              </Button>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link href="/about">À propos</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          {/* Si l'utilisateur est connecté */}
          {session ? (
            <MenubarMenu>
              <MenubarTrigger asChild>
                <Button className="font-mono text-lg italic font-semibold" variant="ghost">
                  {`Bienvenue, ${session.user?.name}`}
                </Button>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Link href="/pages/profil">Profil</Link>
                </MenubarItem>
                <MenubarItem onClick={() => signOut()}>
                  Se déconnecter
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          ) : (
            <Button
              className="font-mono text-lg italic font-semibold"
              variant="ghost"
              onClick={() => signIn("google")} // Redirection vers la page de connexion avec Google
            >
              Connexion avec Google
            </Button>
          )}
        </Menubar>
      </div>
    </header>
  );
};

export default Page;
