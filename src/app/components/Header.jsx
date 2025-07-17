"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
function Header() {
  const [username, setUsername] = React.useState("");
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      const cookieUser =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("username="))
          ?.split("=")[1] || "Giriş Yapılmadı";
      setUsername(cookieUser);
    }
  }, []);
  return (
    <header className="w-full bg-background  border-b border-border shadow-sm">
      <div className="max-w-2xl mx-auto flex flex-col items-center py-4 gap-1">
        <h1 className="text-lg font-bold tracking-tight text-foreground ">
          Kullanıcı Adınız: {username}
        </h1>

        <Button
          variant="destructive"
          className=""
          onClick={() => {
            document.cookie =
              "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/login";
          }}
        >
          Kullanıcı Adı Değiştir
        </Button>
      </div>
    </header>
  );
}
export default Header;
