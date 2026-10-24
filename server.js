const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const FALLBACK_KEY = "";

function loadDotEnv() {
    const envPath = path.join(ROOT, ".env");
    if (!fs.existsSync(envPath)) return;

    const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;

        const index = trimmed.indexOf("=");
        if (index === -1) continue;

        const key = trimmed.slice(0, index).trim();
        let value = trimmed.slice(index + 1).trim();

        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        if (!process.env[key]) process.env[key] = value;
    }
}

loadDotEnv();

const API_KEY = process.env.GNEWS_API_KEY || FALLBACK_KEY;
const query = "Ferrari OR Porsche OR Bugatti OR Lamborghini OR McLaren";

const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon"
};

function sendJson(res, status, data) {
    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
    });
    res.end(JSON.stringify(data));
}

async function getNews(res) {
    if (!API_KEY) {
        sendJson(res, 500, {
            error: "GNEWS_API_KEY is missing. Add it to Code/.env."
        });
        return;
    }

    const gnewsUrl = new URL("https://gnews.io/api/v4/search");
    gnewsUrl.searchParams.set("q", query);
    gnewsUrl.searchParams.set("lang", "en");
    gnewsUrl.searchParams.set("max", "5");
    gnewsUrl.searchParams.set("apikey", API_KEY);

    try {
        const response = await fetch(gnewsUrl);
        const text = await response.text();

        let data;
        try {
            data = JSON.parse(text);
        } catch {
            data = { error: text || "Invalid response from GNews." };
        }

        if (!response.ok) {
            const message = Array.isArray(data.errors)
                ? data.errors.join(", ")
                : data.error || `GNews returned HTTP ${response.status}`;

            sendJson(res, response.status, { error: message });
            return;
        }

        sendJson(res, 200, data);
    } catch (error) {
        console.error("GNews request failed:", error);
        sendJson(res, 502, {
            error: "Could not connect to GNews.",
            details: error.message
        });
    }
}

function serveStatic(req, res) {
    let pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);

    if (pathname === "/") pathname = "/index.html";

    const filePath = path.resolve(ROOT, `.${pathname}`);

    if (!filePath.startsWith(path.resolve(ROOT) + path.sep)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }

    fs.stat(filePath, (error, stats) => {
        if (error || !stats.isFile()) {
            res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Not found");
            return;
        }

        const extension = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
            "Content-Type": mimeTypes[extension] || "application/octet-stream"
        });
        fs.createReadStream(filePath).pipe(res);
    });
}

const server = http.createServer(async (req, res) => {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "GET" && requestUrl.pathname === "/api/news") {
        await getNews(res);
        return;
    }

    if (req.method === "GET") {
        serveStatic(req, res);
        return;
    }

    res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Method Not Allowed");
});

server.listen(PORT, () => {
    console.log(`NOIR is running at http://localhost:${PORT}`);
    if (!API_KEY) {
        console.warn("GNEWS_API_KEY is not set. Add it to Code/.env before opening the news section.");
    }
});
