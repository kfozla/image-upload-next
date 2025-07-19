import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

function throttle(fn, wait) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      fn(...args);
      lastTime = now;
    }
  };
}

function Login() {
  const [username, setUsername] = useState("");
  const imageWrapperRef = useRef(null);
  const lastScrollTop = useRef(0);

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
    <div className="bg-[#f8f5ef] flex flex-col items-center justify-center min-h-screen ">
      <div className="max-w-xl w-full font-serif text-[#333] text-center bg-[#f8f5ef]">
        <div
          ref={imageWrapperRef}
          className="border-b border-border mb-4 top-0 z-10 bg-[#f8f5ef] mx-auto w-full px-4 "
        >
          <Image
            src="/login-image.png"
            alt="Wedding"
            width={360}
            height={400}
            priority
            className="rounded-lg mb-6 mx-auto"
          />
        </div>
        <div className="px-4 w-full">
          <h2 className="text-[17px] mb-2 font-bold">
            🎉 Şükran &amp; Yasin'in Düğün Arşivi 🎉
          </h2>
          <p className="text-[16px] leading-[1.6] mb-2">
            9 Ağustos 2025’te bizimle bu özel günü paylaşan tüm dostlarımıza
            sonsuz teşekkürler!
          </p>
          <p className="text-[16px] leading-[1.6] mb-2">
            Bu site, o mutlu gecenin fotoğraf ve videolarını bir araya getirmek
            için hazırlandı. Lütfen siz de bu anılara katkıda bulunun,
            çektiğiniz görüntüleri buradan bizimle paylaşın.
          </p>
          <p className="text-[16px] font-bold leading-[1.6] mb-2">
            📸 Yükleme yapmak için sadece isminizi girmeniz yeterli.
          </p>
          <p className="text-[16px] leading-[1.6]">
            Şimdiden katkılarınız için teşekkür ederiz. Bu arşiv, ömür boyu
            sürecek güzel anıların bir parçası olacak.
          </p>
          <p className="mt-3 italic text-[16px]">
            Sevgiler, <br />
            <strong>Şükran &amp; Yasin</strong>
          </p>
          <hr className="my-3 border-t border-border"></hr>
          <form
            onSubmit={handleSubmit}
            className="mx-auto bg-[#f8f5ef] w-full max-w-md pb-4 flex flex-col gap-2 "
          >
            <div className="flex flex-col gap-2 w-full">
              <Label
                htmlFor="username"
                className="text-foreground dark:text-gray-200 self-center text-[16px] leading-[1.6] mb-2 font-serif font-semibold"
              >
                Adınızı Girin
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Adınız & Soyadınız"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="font-serif bg-white border-border"
                autoFocus
              />
            </div>
            <Button
              type="submit"
              className="mt-2 w-fit w-full mx-auto text-[16px] leading-[1.6] mb-0 font-serif"
            >
              Devam Et
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
