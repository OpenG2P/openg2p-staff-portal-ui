import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../_lib/withAuth';

const BACKEND_LOGOUT_URL = 'http://iam.openg2p.my/auth/logout';
const KEYCLOAK_LOGOUT_URL = 'https://keycloak2.openg2p.org/realms/master/protocol/openid-connect/logout';

export async function GET(req: NextRequest) {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;

    try {
        await fetch(BACKEND_LOGOUT_URL, { method: 'POST', headers: auth.backendHeaders });
    } catch { }

    const res = NextResponse.redirect(KEYCLOAK_LOGOUT_URL);

    res.cookies.delete({ name: 'X-Access-Token', path: '/', domain: '.openg2p.my' });
    res.cookies.delete({ name: 'X-ID-Token', path: '/', domain: '.openg2p.my' });

    return res;
}