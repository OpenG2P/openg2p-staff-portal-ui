import "server-only";

//backend configuration (use in API routes)
export function getBackendConfig() {
    return {
        iamUrl: process.env.IAM_URL ?? "",
        keycloakLogoutUrl: process.env.KEYCLOAK_LOGOUT_URL ?? ""
    };
}
