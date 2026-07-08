import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

function normalizeEnv(name?: string | undefined) {
  if (!name) return undefined;
  const v = name.trim();
  if (!v || v === "undefined" || v === "null") return undefined;
  return v;
}

const dbUrl = normalizeEnv(process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URL);
if (!dbUrl) {
  throw new Error("DATABASE_URL or TURSO_DATABASE_URL must be set and non-empty (not 'undefined'/'null')");
}

let prisma: PrismaClient;

const usingTurso = !!normalizeEnv(process.env.TURSO_DATABASE_URL);

if (usingTurso) {
  const authToken = normalizeEnv(process.env.TURSO_AUTH_TOKEN);
  const libsql = createClient({
    url: dbUrl,
    // only include authToken when valid
    ...(authToken ? { authToken } : {}),
  });

  prisma = new PrismaClient({
    adapter: new PrismaLibSql(libsql),
  });
} else {
  prisma = new PrismaClient();
}

export { prisma };
