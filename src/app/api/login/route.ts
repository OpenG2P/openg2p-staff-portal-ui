import { NextRequest, NextResponse } from 'next/server';
import { getBackendConfig } from '../_lib/backend-config';

export async function GET(req: NextRequest) {
    const redirectUri = req.nextUrl.searchParams.get('redirect_uri') || '/';

    const backendConfig = getBackendConfig()
    const iamUrl = `${backendConfig.iamUrl}${"/auth/start_authentication_transaction"}`;

    const url = `${iamUrl}?id=${backendConfig.loginProviderId}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    const res = await fetch(url, {
        method: 'POST',
        headers: { accept: 'application/json' },
        body: ''
    });

    const data = await res.json();

    if (!data.redirectUrl) {
        return NextResponse.json({ error: 'Failed to initiate auth' }, { status: 500 });
    }

    return NextResponse.redirect(data.redirectUrl);
}