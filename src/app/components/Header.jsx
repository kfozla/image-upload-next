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
    <header className="w-full bg-[#faf4e6] border-b border-border shadow-sm font-serif text-[#333]">
      <div className="max-w-xl mx-auto flex justify-between items-center py-2 px-4">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#333] px-2 font-serif">
          {username}
        </h1>
        <div className="flex items-center gap-2 p-1">
          <Button
            className="bg-[#e0d9c8] text-[#333] hover:bg-[#f8f5ef] hover:text-[#222] hover:bg-white text-[#333] border border-border shadow-sm transition-colors text-[15px] font-serif px-4 py-2 rounded-lg font-semibold"
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
