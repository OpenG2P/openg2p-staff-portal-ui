import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'http://staff-portal.openg2p.my/staff-portal/api/auth/start_authentication_transaction';

export async function GET(req: NextRequest) {
    const redirectUri = req.nextUrl.searchParams.get('redirect_uri') || '/';

    const res = await fetch(
        `${BACKEND_URL}?id=1&redirect_uri=${encodeURIComponent(redirectUri)}`,
        { method: 'POST', headers: { accept: 'application/json' } }
    );

    const data = await res.json();

    if (!data.redirectUrl) {
        return NextResponse.json({ error: 'Failed to initiate auth' }, { status: 500 });
    }

    return NextResponse.redirect(data.redirectUrl);
}