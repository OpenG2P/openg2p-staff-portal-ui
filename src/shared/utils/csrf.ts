export const CSRF_COOKIE_NAME = 'X-CSRF-Token';
export const CSRF_HEADER_NAME = 'X-CSRF-Token';

const UNSAFE_METHODS = new Set(['POST']);

export function getCsrfTokenFromDocument(): string | undefined {
    if (typeof document === 'undefined') {
        return undefined;
    }
    const escaped = CSRF_COOKIE_NAME.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : undefined;
}

export function csrfHeaders(): Record<string, string> {
    const token = getCsrfTokenFromDocument();
    return token ? { [CSRF_HEADER_NAME]: token } : {};
}

export function withCsrfHeaders(
    method: string,
    headers?: HeadersInit,
): HeadersInit {
    if (!UNSAFE_METHODS.has(method.toUpperCase())) {
        return headers ?? {};
    }
    return {
        ...(headers as Record<string, string> | undefined),
        ...csrfHeaders(),
    };
}

export function isUnsafeMethod(method: string): boolean {
    return UNSAFE_METHODS.has(method.toUpperCase());
}
