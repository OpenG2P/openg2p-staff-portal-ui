import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../_lib/requireAuth';
import { getBackendConfig } from '../_lib/backend-config';

export async function GET(req: NextRequest) {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;

    const backendConfig = getBackendConfig()
    const iamUrl = `${backendConfig.iamUrl}${"/auth/logout"}`;

    try {
        await fetch(iamUrl, { method: 'POST', headers: auth.backendHeaders });
    } catch { }

    const res = NextResponse.redirect(backendConfig.keycloakLogoutUrl);

    res.cookies.delete({ name: 'X-Access-Token', path: '/', domain: '.openg2p.my' });
    res.cookies.delete({ name: 'X-ID-Token', path: '/', domain: '.openg2p.my' });

    return res;
}