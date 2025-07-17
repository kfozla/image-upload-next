"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import React from "react";

function LoginPage() {
  const [username, setUsername] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      alert("Lütfen kullanıcı adınızı girin.");
      return;
    }
    document.cookie = "username=" + username + "; path=/";
    window.location.href = "/imageList";
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background dark:bg-[#09090b] transition-colors">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/80 dark:bg-[#18181b] border border-border flex flex-col gap-6 animate-in fade-in zoom-in duration-500"
      >
        <h1 className="text-2xl font-bold text-center mb-2 text-foreground dark:text-white tracking-tight">
          Giriş Yap
        </h1>
        <div className="flex flex-col gap-2 w-full">
          <Label
            htmlFor="username"
            className="text-foreground dark:text-gray-200"
          >
            Kullanıcı Adı
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Kullanıcı adınızı girin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="bg-transparent border-border focus:ring-2 focus:ring-primary/60 dark:bg-[#232329] dark:text-white"
            autoFocus
          />
        </div>
        <Button
          type="submit"
          className="mt-2 w-full py-3 text-base font-semibold"
        >
          Devam Et
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
