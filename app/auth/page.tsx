import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Recapcha from "react-google-recaptcha";
import { useAuthForm } from "@/app/hooks/useAuthForm"  // Import du hook personnalisé

const AuthForm = () => {
  const {
    email,
    password,
    confirmPassword,
    captchaValue,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleCaptchaChange,
    validatePasswords,
  } = useAuthForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswords()) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    // Appel à ton backend ou service d'authentification ici
    console.log("Formulaire soumis", { email, password, captchaValue });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <Input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <Input
        type="password"
        placeholder="Confirmer le mot de passe"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        required
      />
      <Recapcha
        sitekey="TA_CLE_SITE_RECAPTCHA"
        onChange={handleCaptchaChange}
      />
      <Button type="submit" variant="default">
        inscription
      </Button>
    </form>
  );
};

export default AuthForm;
