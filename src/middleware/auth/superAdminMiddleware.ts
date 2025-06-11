import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "./authService";

export const handleSuperAdminMiddleware = (request: NextRequest, token: string | undefined) => {
  // Vérifier si le token existe
  if (!token) {
    return AuthService.redirectToLogin(request, request.nextUrl.pathname);
  }

  // Décoder et vérifier le token
  const { decodedToken, isExpired } = AuthService.decodeToken(token);
  
  // Vérifier si le token est valide et si l'utilisateur a le rôle SUPER_ADMIN
  if (isExpired || !AuthService.hasRole(decodedToken, "ROLE_SUPER_ADMIN")) {
    return AuthService.redirectTo(request, "/dashboard");
  }

  // Si tout est OK, continuer la requête
  return null;
}
