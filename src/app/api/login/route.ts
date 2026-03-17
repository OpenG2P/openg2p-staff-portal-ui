import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'http://iam.openg2p.my/auth/start_authentication_transaction';

export async function GET(req: NextRequest) {
    const redirectUri = req.nextUrl.searchParams.get('redirect_uri') || '/';

    const url = `${BACKEND_URL}?id=1&redirect_uri=${encodeURIComponent(redirectUri)}`;

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