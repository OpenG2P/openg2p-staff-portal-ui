import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../_lib/requireAuth';
import { getBackendConfig } from '../_lib/backend-config';

export async function GET(req: NextRequest) {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;

    const backendConfig = getBackendConfig();

    const iamUrl = `${backendConfig.iamUrl}/auth/get_staff_portal_applications`;

    const res = await fetch(iamUrl, {
        method: 'GET',
        headers: auth.backendHeaders,
        cache: 'no-store',
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
}