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
    <header className="w-full bg-gradient-to-b from-gray-100 to-gray-300 border-b border-gray-300 shadow-sm">
      <div className="max-w-2xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-gray-800 px-4 ">
          {username}
        </h1>

        <div className="flex items-center gap-2 p-1">
          <Button
            className=" bg-gray-200 hover:bg-gray-300 text-black border border-gray-400 shadow-sm transition-colors text-md"
            onClick={() => {
              document.cookie =
                "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              window.location.href = "/login";
            }}
          >
            İsminizi değiştirin
          </Button>
        </div>
      </div>
    </header>
  );
}
export default Header;
