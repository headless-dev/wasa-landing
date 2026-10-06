import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(projectRoot, "dist");
const serverPath = path.join(distDir, "index.js");

const serverSource = `import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "public");
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

const safePath = (requestPath) => {
  const decoded = decodeURIComponent(requestPath.split("?")[0]);
  const candidate = path.resolve(root, "." + decoded);
  return candidate.startsWith(root) ? candidate : null;
};

const sendFile = async (response, filePath) => {
  const extension = path.extname(filePath).toLowerCase();
  const content = await readFile(filePath);
  response.writeHead(200, {
    "Content-Type": mimeTypes[extension] || "application/octet-stream",
    "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
  });
  response.end(content);
};

const server = http.createServer(async (request, response) => {
  if (!request.url || request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405).end();
    return;
  }
  const requestedFile = safePath(request.url);
  try {
    if (requestedFile && (await stat(requestedFile)).isFile()) {
      if (request.method === "HEAD") {
        response.writeHead(200).end();
        return;
      }
      await sendFile(response, requestedFile);
      return;
    }
  } catch {}
  await sendFile(response, path.join(root, "index.html"));
});

const port = Number(process.env.PORT || 3000);
server.listen(port, "0.0.0.0", () => console.log("WASA static server listening on " + port));
`;

await mkdir(distDir, { recursive: true });
await writeFile(serverPath, serverSource, "utf8");
