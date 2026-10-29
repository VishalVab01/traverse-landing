import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match || process.env[match[1]] !== undefined) continue;

    let value = match[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    } else {
      value = value.replace(/\s+#.*$/, "");
    }
    process.env[match[1]] = value;
  }
}

// Keep host/CI variables authoritative while making local ignored env files
// available to Tina's build step, which runs before Next.js loads its env files.
loadEnvFile(".env");
loadEnvFile(".env.local");

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit", env: process.env });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN) {
  run("npx", ["tinacms", "build", "--skip-cloud-checks"]);
} else {
  console.log("TinaCloud credentials not set; building the public site without the hosted editor.");
}

run("npx", ["next", "build"]);
