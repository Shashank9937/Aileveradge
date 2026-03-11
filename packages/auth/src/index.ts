import { SignJWT, jwtVerify, importPKCS8, importSPKI, type JWTPayload } from "jose";
import { z } from "zod";

const claimsSchema = z.object({
  sub: z.string(),
  tenantId: z.string().uuid(),
  role: z.enum(["owner", "admin", "member", "viewer"])
});

export type AuthClaims = z.infer<typeof claimsSchema>;

export async function signAccessToken(
  claims: AuthClaims,
  issuer: string,
  audience: string,
  privateKeyPem: string
): Promise<string> {
  const key = await importPKCS8(privateKeyPem, "RS256");
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(issuer)
    .setAudience(audience)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
}

export async function verifyAccessToken(
  token: string,
  issuer: string,
  audience: string,
  publicKeyPem: string
): Promise<AuthClaims & JWTPayload> {
  const key = await importSPKI(publicKeyPem, "RS256");
  const { payload } = await jwtVerify(token, key, { issuer, audience });
  return claimsSchema.parse(payload) as AuthClaims & JWTPayload;
}
