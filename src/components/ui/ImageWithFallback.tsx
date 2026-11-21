"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Crown } from "lucide-react";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "https://i.scdn.co/image/ab6761610000e5ebe6395f30987a29e4bec7de11",
  className,
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-900">
      {!hasError ? (
        <Image
          {...rest}
          src={imgSrc || fallbackSrc}
          alt={alt}
          className={className}
          onError={() => {
            if (imgSrc !== fallbackSrc) {
              setImgSrc(fallbackSrc);
            } else {
              setHasError(true);
            }
          }}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-amber-950/40 text-amber-400 p-2">
          <Crown className="h-5 w-5 opacity-70 mb-1" />
          <span className="text-[10px] uppercase font-bold text-zinc-400 text-center tracking-wider line-clamp-1">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}
