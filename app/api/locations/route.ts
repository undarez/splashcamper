// app/api/locations/route.ts
// test réaliser avec postman et tous fonctionne realiser le 14/10/2024

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialiser Prisma
const prisma = new PrismaClient();

// Interface pour les données de location
export interface LocationData {
  name: string;
  lng: number;
  lat: number;
  address: string;
}

// Gestion de la requête GET
export async function GET() {
  try {
    const locations = await prisma.camperWashStation.findMany();
    return NextResponse.json(locations);
  } catch (error) {
    console.error("Erreur lors de la récupération des stations :", error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données.' },
      { status: 500 }
    );
  }
}

// Gestion de la requête POST
export async function POST(request: Request) {
  try {
    const body: LocationData = await request.json();
    const { name, lng, lat, address } = body;

    const newLocation = await prisma.camperWashStation.create({
      data: {
        name,
        lng,
        lat,
        address,
      },
    });

    return NextResponse.json(newLocation, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la récupération des stations :", error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la location.' },
      { status: 500 }
    );
  }
}


