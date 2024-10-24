import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOption } from '@/lib/authOptions'; // Assurez-vous que le chemin est correct

const prisma = new PrismaClient();

// Interface pour les données du profil
interface UserProfileData {
  name: string;
  city?: string;
  department?: string;
  age?: number;
  camperModel?: string;
  usageFrequency?: string;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOption);

  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: UserProfileData = await req.json();
    const { name, city, department, age, camperModel, usageFrequency } = body;

    const ageNumber = age !== undefined ? parseInt(age.toString(), 10) : undefined;

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        city,
        department,
        age: ageNumber,
        camperModel,
        usageFrequency,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    return NextResponse.json(
      { message: 'Error updating profile' },
      { status: 500 }
    );
  }
}
