"use client";
import { signIn } from 'next-auth/react';
import React from 'react';
import { Button } from '@/components/ui/button';

export default function ConnectYou() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Veuillez vous connecter pour accéder à votre profil.</h1>
        {/* Bouton de connexion avec redirection vers la page de profil */}
        <Button onClick={() => signIn('google', { callbackUrl: '/pages/profil' })}>
          Se connecter avec Google
        </Button>
      </div>
    </div>
  );
}
