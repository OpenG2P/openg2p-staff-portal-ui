export function iconDataUrl(
  base64: string | null | undefined,
  mimeType = "image/svg+xml",
): string | null {
  if (!base64?.trim()) return null;
  if (base64.startsWith("data:")) return base64;
  return `data:${mimeType};base64,${base64}`;
}

export function detectMimeType(base64: string): string {
  // Try to detect MIME type from base64 string patterns
  if (base64.startsWith('PHN2Zy') || base64.startsWith('<?xml') || base64.includes('<svg')) {
    return 'image/svg+xml';
  }
  if (base64.startsWith('/9j/')) {
    return 'image/jpeg';
  }
  if (base64.startsWith('iVBORw0KGgo')) {
    return 'image/png';
  }
  if (base64.startsWith('R0lGODdh') || base64.startsWith('R0lGODlh')) {
    return 'image/gif';
  }
  if (base64.startsWith('Qk0')) {
    return 'image/bmp';
  }
  // Default to SVG+xml for OpenG2P
  return 'image/svg+xml';
}
