import { NextResponse } from 'next/server';

import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from '@/shared/utils/csrf';

import { getBackendConfig } from './backend-config';

/** Auth cookies set by IAM OAuth callback; must reach backend for silent refresh. */
export const AUTH_COOKIE_NAMES = [
    'X-Access-Token',
    'X-ID-Token',
    'X-Session-Id',
    CSRF_COOKIE_NAME,
] as const;

type CookieReader = {
    get(name: string): { value: string } | undefined;
};

export function buildAuthCookieHeader(cookieReader: CookieReader): string | undefined {
    const parts: string[] = [];
    for (const name of AUTH_COOKIE_NAMES) {
        const value = cookieReader.get(name)?.value;
        if (value) {
            parts.push(`${name}=${value}`);
        }
    }
    return parts.length > 0 ? parts.join('; ') : undefined;
}

export function buildBackendAuthHeaders(
    cookieReader: CookieReader,
    accessToken: string,
): Record<string, string> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
    };
    const cookieHeader = buildAuthCookieHeader(cookieReader);
    if (cookieHeader) {
        headers.Cookie = cookieHeader;
    }
    const csrfToken = cookieReader.get(CSRF_COOKIE_NAME)?.value;
    if (csrfToken) {
        headers[CSRF_HEADER_NAME] = csrfToken;
    }
    return headers;
}

/** Rewrite Set-Cookie Domain to the configured parent domain (COOKIE_DOMAIN). */
function rewriteSetCookieDomain(cookie: string, domain: string): string {
    const parts = cookie.split(';').map((part) => part.trim());
    if (parts.length === 0) {
        return cookie;
    }

    let hasDomain = false;
    const rewritten = parts.map((part, index) => {
        if (index === 0) {
            return part;
        }
        if (part.toLowerCase().startsWith('domain=')) {
            hasDomain = true;
            return `Domain=${domain}`;
        }
        return part;
    });

    if (!hasDomain) {
        rewritten.push(`Domain=${domain}`);
    }

    return rewritten.join('; ');
}

/** Forward refreshed or cleared auth cookies from backend to the browser. */
export function applyBackendSetCookies(source: Response, target: NextResponse): void {
    const cookieDomain = getBackendConfig().cookieDomain;
    const rewriteCookie = (cookie: string) =>
        cookieDomain ? rewriteSetCookieDomain(cookie, cookieDomain) : cookie;

    if (typeof source.headers.getSetCookie === 'function') {
        for (const cookie of source.headers.getSetCookie()) {
            target.headers.append('Set-Cookie', rewriteCookie(cookie));
        }
        return;
    }
    const setCookie = source.headers.get('set-cookie');
    if (setCookie) {
        target.headers.append('Set-Cookie', rewriteCookie(setCookie));
    }
}

export async function jsonResponseFromBackend(source: Response): Promise<NextResponse> {
    const data = await source.json();
    const response = NextResponse.json(data, { status: source.status });
    applyBackendSetCookies(source, response);
    return response;
}
