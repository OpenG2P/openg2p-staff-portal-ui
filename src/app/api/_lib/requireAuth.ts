import { NextRequest, NextResponse } from 'next/server';

const TOKEN_COOKIE = 'X-Access-Token';

export interface AuthContext {
    token: string;
    backendHeaders: Record<string, string>;
}

export function requireAuth(req: NextRequest): AuthContext | NextResponse {
    const token = req.cookies.get(TOKEN_COOKIE)?.value;

    if (!token) {
        return NextResponse.json(
            { errors: [{ code: 'G2P-AUT-401', message: 'Unauthorized' }] },
            { status: 401 }
        );
    }
    return {
        token,
        backendHeaders: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
}