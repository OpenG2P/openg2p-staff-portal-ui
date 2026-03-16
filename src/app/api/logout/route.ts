import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, withAuth } from '../_lib/withAuth';

const BACKEND_LOGOUT_URL = 'http://staff-portal.openg2p.my/staff-portal/api/auth/logout';
const KEYCLOAK_LOGOUT_URL = 'https://keycloak2.openg2p.org/realms/master/protocol/openid-connect/logout';
const CLIENT_ID = 'staff-portal';
const POST_LOGOUT_REDIRECT = 'http://staff-portal.openg2p.my';

export async function GET(req: NextRequest) {
    // const { token, backendHeaders } = withAuth(req);
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;

    // if (token) {
        try {
            await fetch(BACKEND_LOGOUT_URL, { method: 'POST', headers: auth.backendHeaders });
        } catch {
        }
    // }

    const keycloakUrl =
        `${KEYCLOAK_LOGOUT_URL}` +
        `?post_logout_redirect_uri=${encodeURIComponent(POST_LOGOUT_REDIRECT)}` +
        `&client_id=${CLIENT_ID}`;

    return NextResponse.redirect(keycloakUrl);
}