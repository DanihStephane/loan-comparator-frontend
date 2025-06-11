import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { routing } from "@/i18n/routing";
import { ROUTES } from "@/shared/config/routes";

export interface DecodedToken {
  exp: number;
  roles: string;
  email: string;
}

export class AuthService {
  /**
   * Décode un token JWT et vérifie s'il est expiré
   */
  static decodeToken(token: string | undefined): { decodedToken: DecodedToken | null, isExpired: boolean } {
    if (!token) {
      return { decodedToken: null, isExpired: true };
    }

    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const isExpired = decodedToken.exp * 1000 < Date.now();
      return { decodedToken, isExpired };
    } catch (error) {
      return { decodedToken: null, isExpired: true };
    }
  }

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   */
  static hasRole(decodedToken: DecodedToken | null, role: string): boolean {
    if (!decodedToken) return false;
    return decodedToken.roles.includes(role);
  }

  /**
   * Vérifie si l'utilisateur a au moins un des rôles spécifiés
   */
  static hasAnyRole(decodedToken: DecodedToken | null, roles: string[]): boolean {
    if (!decodedToken) return false;
    return roles.some(role => decodedToken.roles.includes(role));
  }

  /**
   * Redirige vers la page de login
   */
  static redirectToLogin(request: NextRequest, callbackUrl?: string): NextResponse {
    const locale = request.nextUrl.locale || routing.defaultLocale;
    const loginUrl = new URL(`/${locale}${ROUTES.AUTH.LOGIN}`, request.url);
    
    if (callbackUrl) {
      loginUrl.searchParams.set("callbackUrl", callbackUrl);
    }
    
    return NextResponse.redirect(loginUrl);
  }

  /**
   * Redirige vers une page spécifique
   */
  static redirectTo(request: NextRequest, path: string): NextResponse {
    const locale = request.nextUrl.locale || routing.defaultLocale;
    const url = new URL(`/${locale}${path}`, request.url);
    return NextResponse.redirect(url);
  }
}
