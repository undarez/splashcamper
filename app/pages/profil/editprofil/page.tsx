"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthForm } from "@/app/hooks/useAuthForm"; // Import du hook pour gérer les états

interface Departement {
  num: string; // Utilisez string pour inclure les départements corses (2A, 2B)
  name: string;
}

// Cette page permettra d'éditer les informations de profil
const EditProfil = () => {
  const { data: session } = useSession(); // Récupère les infos de la session pour pré-remplir le formulaire
  const { email, handleEmailChange } = useAuthForm(); // Utilisation des états depuis le hook

  const [userData, setUserData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    city: "",
    department: "",
    age: "",
    camperModel: "",
    usageFrequency: "",
  });

  // Gestion de l'avatar (uploader une nouvelle image)
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Logique pour uploader et prévisualiser l'avatar
      console.log("Fichier d'avatar sélectionné :", file);
    }
  };

  // Gestion des changements de valeurs dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // State pour les départements
  const [departments, setDepartments] = useState<Departement[]>([]);

  // Charger les départements depuis le fichier JSON lors du montage du composant
  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await fetch('/data/listeDep.json'); // Ajustez le chemin si nécessaire
      const data = await res.json();
      setDepartments([...data.metropole, ...data.outre_mer]);
    };

    fetchDepartments();
  }, []);

  const handleSelectChange = (value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      department: value,
    }));
  };

  // Enregistrement des modifications
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/savedoc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du profil');
      }

      const data = await response.json();
      console.log('Données utilisateur mises à jour : ', data);
      // Afficher un message de succès ou rediriger
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil :', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-lg mx-auto shadow-md p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Modifier le profil</h1>

        {/* Avatar */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={session?.user?.image || "/images/default-avatar.png"} alt="User Avatar" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <Input id="avatar" type="file" onChange={handleAvatarUpload} />
        </div>

        {/* Nom */}
        <div className="mb-4">
          <Label htmlFor="name">Nom</Label>
          <Input id="name" type="text" value={userData.name} onChange={handleChange} />
        </div>

        {/* Email */}
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={handleEmailChange} disabled />
        </div>

        {/* Département */}
        <div className="mb-4">
          <Label htmlFor="department">Département</Label>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un département" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((department) => (
                <SelectItem key={department.num} value={department.num}>
                  {department.name} ({department.num})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Autres champs comme Âge, Modèle de camping-car, Fréquence d'utilisation */}
        <div className="mb-4">
          <Label htmlFor="age">Âge</Label>
          <Input id="age" type="number" value={userData.age} onChange={handleChange} />
        </div>
        
        <div className="mb-4">
          <Label htmlFor="camperModel">Modèle de Camping-Car</Label>
          <Input id="camperModel" type="text" value={userData.camperModel} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <Label htmlFor="usageFrequency">Fréquence Utilisation</Label>
          <Input id="usageFrequency" type="text" value={userData.usageFrequency} onChange={handleChange} />
        </div>

        {/* Bouton pour sauvegarder les modifications */}
        <Button onClick={handleSubmit} className="mt-6">Sauvegarder les modifications</Button>
      </div>
    </div>
  );
};

export default EditProfil;
