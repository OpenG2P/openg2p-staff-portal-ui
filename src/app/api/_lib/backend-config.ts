import "server-only";

// Backend configuration (use in API routes).
export function getBackendConfig() {
    return {
        iamUrl: process.env.IAM_URL ?? "",
        loginProviderId: process.env.LOGIN_PROVIDER_ID ?? "",
        cookieDomain: process.env.COOKIE_DOMAIN?.trim() ?? "",
    };
}
