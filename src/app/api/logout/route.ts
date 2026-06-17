import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../_lib/requireAuth';
import { getBackendConfig } from '../_lib/backend-config';
import { AUTH_COOKIE_NAMES } from '../_lib/auth-cookies';

export async function GET(req: NextRequest) {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;

    const backendConfig = getBackendConfig();

    const idToken = req.cookies.get('X-ID-Token')?.value;

    const redirectUri = `${backendConfig.redirectUrl}`;

    const logoutUrl =
        `${backendConfig.keycloakLogoutUrl}` +
        `?post_logout_redirect_uri=${encodeURIComponent(redirectUri)}` +
        (idToken ? `&id_token_hint=${idToken}` : '');

    try {
        await fetch(`${backendConfig.iamUrl}/auth/logout`, {
            method: 'POST',
            headers: auth.backendHeaders,
        });
    } catch { }

    const res = NextResponse.redirect(logoutUrl);

    for (const name of AUTH_COOKIE_NAMES) {
        res.cookies.delete({
            name,
            path: '/',
            domain: backendConfig.cookieDomain,
        });
    }

    return res;
}