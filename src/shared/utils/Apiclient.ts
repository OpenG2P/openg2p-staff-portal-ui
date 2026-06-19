import { withCsrfHeaders } from './csrf';

const UNAUTHORIZED_CODE = 'G2P-AUT-401';

function isUnauthorizedBody(data: unknown): boolean {
    if (typeof data !== 'object' || data === null) return false;
    const d = data as { errors?: Array<{ code?: string }> };
    return d.errors?.some((e) => e.code === UNAUTHORIZED_CODE) ?? false;
}

function emitUnauthorized() {
    window.dispatchEvent(new Event('auth:unauthorized'));
}

async function parseResponse<T>(res: Response): Promise<T> {
    if (res.status === 401) {
        emitUnauthorized();
        throw new Error('Unauthorized');
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
        return (await res.text()) as T;
    }

    const data = await res.json();

    if (isUnauthorizedBody(data)) {
        emitUnauthorized();
        throw new Error('Unauthorized');
    }

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return data as T;
}

export const apiClient = {
    get: <T = unknown>(url: string, options?: RequestInit): Promise<T> =>
        fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', ...options?.headers },
            ...options,
        }).then(parseResponse<T>),

    post: <T = unknown>(url: string, body?: unknown, options?: RequestInit): Promise<T> =>
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: withCsrfHeaders('POST', {
                'Content-Type': 'application/json',
                ...options?.headers,
            }),
            body: body !== undefined ? JSON.stringify(body) : undefined,
            ...options,
        }).then(parseResponse<T>),
};
