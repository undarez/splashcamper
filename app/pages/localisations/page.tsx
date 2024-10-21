// app/localisations/page.tsx

"use client"; // Nécessaire pour utiliser les hooks client-side

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assure-toi que ce chemin est correct
import { formSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof formSchema>;

const AddLocationPage = () => {
  // Initialiser useForm avec le schéma de validation
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, reset, formState: { errors } } = methods;
  const router = useRouter();

  // Fonction de soumission du formulaire
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("/api/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Localisation ajoutée avec succès !");
        reset(); // Réinitialiser le formulaire après succès
        router.push("/"); // Rediriger vers la page principale pour voir la nouvelle localisation
      } else {
        const errorData = await response.json();
        alert(`Échec de l'ajout de la localisation : ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      alert("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ajouter une Localisation</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Champ pour le nom */}
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nom de la localisation"
                    {...field}
                    className={`w-full border p-2 rounded ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </FormControl>
                <FormMessage>{errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Champ pour la latitude */}
          <FormField
            name="lat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any" // Permet les décimales
                    placeholder="Latitude"
                    {...field}
                    className={`w-full border p-2 rounded ${
                      errors.lat ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </FormControl>
                <FormMessage>{errors.lat?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Champ pour la longitude */}
          <FormField
            name="lng"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any" // Permet les décimales
                    placeholder="Longitude"
                    {...field}
                    className={`w-full border p-2 rounded ${
                      errors.lng ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </FormControl>
                <FormMessage>{errors.lng?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Champ pour l'adresse */}
          <FormField
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Adresse complète"
                    {...field}
                    className={`w-full border p-2 rounded ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </FormControl>
                <FormMessage>{errors.address?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Bouton de soumission */}
          <Button type="submit">Ajouter la Localisation</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddLocationPage;
