"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { Music2 } from "lucide-react";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/marilia-crown-banner.jpg",
  className,
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-900">
      {!hasError ? (
        <Image
          {...rest}
          src={imgSrc || fallbackSrc}
          alt={alt}
          unoptimized
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
          <Music2 className="h-5 w-5 opacity-70 mb-1" />
          <span className="text-[10px] uppercase font-bold text-zinc-400 text-center tracking-wider line-clamp-1">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}
