"use client";

import { iconDataUrl, detectMimeType } from "@/shared/utils/iconBase64";

interface IconDisplayProps {
  icon_base64: string | null | undefined;
  className?: string;
}

export default function IconDisplay({ icon_base64, className = "" }: IconDisplayProps) {
  const mimeType = icon_base64 ? detectMimeType(icon_base64) : "image/svg+xml";
  const previewSrc = iconDataUrl(icon_base64, mimeType);

  return (
    <>
      {previewSrc ? (
        <img
          src={previewSrc}
          alt=""
          className={`h-10 ${className}`}
        />
      ) : (
        <div className={`h-10 w-10 bg-gray-500 ${className}`} />
      )}
    </>
  );
}
