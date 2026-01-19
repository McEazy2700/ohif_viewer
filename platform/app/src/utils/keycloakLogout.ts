/**
 * Keycloak/OIDC Logout utility for OHIF
 */

/**
 * Performs a proper Keycloak logout
 * This function handles both OIDC-aware logout and fallback logout
 * @param appConfig - The OHIF app configuration
 * @param userManager - The OIDC UserManager instance (if available)
 * @param navigate - React Router navigate function
 */
export async function performKeycloakLogout(appConfig: any, userManager: any, navigate: any) {
  try {
    // Clear local storage and session storage
    localStorage.removeItem('ohif-redirect-to');
    sessionStorage.clear();

    if (appConfig.oidc && userManager) {
      // Get current user to extract tokens
      const user = await userManager.getUser();

      if (user && user.id_token) {
        // Perform proper OIDC logout with id_token_hint
        const oidcConfig = appConfig.oidc[0];
        const logoutUrl = `${oidcConfig.authority}/protocol/openid-connect/logout`;
        const params = new URLSearchParams({
          id_token_hint: user.id_token,
          post_logout_redirect_uri: window.location.origin + (oidcConfig.post_logout_redirect_uri || '/logout-redirect.html'),
          redirect_uri: window.location.origin + '/'
        });

        // Use UserManager's signoutRedirect for proper cleanup
        await userManager.signoutRedirect({
          post_logout_redirect_uri: window.location.origin + (oidcConfig.post_logout_redirect_uri || '/logout-redirect.html')
        });

        return;
      }
    }

    // Fallback logout - just redirect to home
    window.location.href = '/';
  } catch (error) {
    console.error('Logout error:', error);
    // On error, at least clear storage and redirect
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  }
}

/**
 * Simple logout that works without OIDC
 */
export function performSimpleLogout() {
  // Clear all stored data
  localStorage.clear();
  sessionStorage.clear();

  // Redirect to home
  window.location.href = '/';
}