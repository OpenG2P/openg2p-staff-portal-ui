import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../_lib/withAuth';

const BACKEND_URL = 'http://iam.openg2p.my/auth/get_user_profile';

export async function GET(req: NextRequest) {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;

    const res = await fetch(BACKEND_URL, {
        method: 'GET',
        headers: auth.backendHeaders,
        cache: 'no-store',
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
}