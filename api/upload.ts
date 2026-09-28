import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { IncomingMessage, ServerResponse } from "node:http";

type ApiRequest = IncomingMessage & { body?: unknown };
type ApiResponse = ServerResponse & {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => ApiResponse;
};

const firebaseKeys = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"),
);
const ADMIN_EMAIL = "almedino.arch@gmail.com";

async function verifyAdminToken(token: string) {
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
  if (!projectId) throw new Error("Firebase project is not configured.");

  const { payload } = await jwtVerify(token, firebaseKeys, {
    algorithms: ["RS256"],
    audience: projectId,
    issuer: `https://securetoken.google.com/${projectId}`,
  });

  if (
    payload.email_verified !== true
    || typeof payload.email !== "string"
    || payload.email.toLowerCase() !== ADMIN_EMAIL
  ) {
    throw new Error("Administrator access required.");
  }
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });

  try {
    const body = request.body as HandleUploadBody;
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!clientPayload || !pathname.startsWith("projects/")) {
          throw new Error("Invalid upload request.");
        }
        await verifyAdminToken(clientPayload);

        return {
          addRandomSuffix: true,
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"],
          maximumSizeInBytes: 15 * 1024 * 1024,
        };
      },
      onUploadCompleted: async () => undefined,
    });

    return response.status(200).json(result);
  } catch {
    return response.status(401).json({ error: "Upload não autorizado ou falhou." });
  }
}