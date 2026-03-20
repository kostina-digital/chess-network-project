module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Projects/chess-network-project/src/app/favicon.ico (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/Projects/chess-network-project/src/app/favicon.ico.mjs { IMAGE => \"[project]/Projects/chess-network-project/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/Projects/chess-network-project/src/app/favicon.ico (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 256,
    height: 256
};
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/Projects/chess-network-project/src/auth/prisma.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/Projects/chess-network-project/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/chess-network-project/node_modules/@prisma/adapter-pg/dist/index.mjs [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
// Avoid creating a new PrismaClient on every hot reload in development.
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    adapter: new __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PrismaPg"]({
        connectionString: getDatabaseUrl()
    })
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForPrisma.prisma = prisma;
}
function getDatabaseUrl() {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("Missing DATABASE_URL env var.");
    return url;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Projects/chess-network-project/src/auth/userStore.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "authenticateUser",
    ()=>authenticateUser,
    "getUserById",
    ()=>getUserById,
    "normalizeEmail",
    ()=>normalizeEmail,
    "registerUser",
    ()=>registerUser
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/chess-network-project/src/auth/prisma.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function normalizeEmail(email) {
    return email.trim().toLowerCase();
}
function hashPassword(password, saltBytes) {
    // Reasonable defaults for dev. Increase iterations for production.
    const hash = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["pbkdf2Sync"])(password, saltBytes, 310_000, 32, "sha256");
    return hash.toString("base64");
}
function normalizeUserName(userName) {
    return userName.trim();
}
async function registerUser(email, userName, password) {
    const normalizedEmail = normalizeEmail(email);
    const normalizedUserName = normalizeUserName(userName);
    if (normalizedUserName.length < 3) throw new Error("Username must be at least 3 characters long.");
    if (normalizedEmail.length < 4) throw new Error("Email is too short.");
    if (password.length < 8) throw new Error("Password must be at least 8 characters long.");
    const [existingEmail, existingName] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                email: normalizedEmail
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                userName: normalizedUserName
            }
        })
    ]);
    if (existingEmail && existingName) {
        throw new Error("This email and username are already registered.");
    }
    if (existingEmail) {
        throw new Error("This email is already registered.");
    }
    if (existingName) {
        throw new Error("This username is already taken.");
    }
    const saltBytes = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(16);
    const passwordHashB64 = hashPassword(password, saltBytes);
    const saltB64 = saltBytes.toString("base64");
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.create({
        data: {
            userName: normalizedUserName,
            email: normalizedEmail,
            passwordHashB64,
            saltB64
        }
    });
    return user;
}
async function authenticateUser(email, password) {
    const normalizedEmail = normalizeEmail(email);
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            email: normalizedEmail
        }
    });
    if (!user) throw new Error("Invalid email or password.");
    const saltBytes = Buffer.from(user.saltB64, "base64");
    const attemptedHashB64 = hashPassword(password, saltBytes);
    const attemptedHash = Buffer.from(attemptedHashB64, "base64");
    const storedHash = Buffer.from(user.passwordHashB64, "base64");
    if (attemptedHash.length !== storedHash.length || !(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["timingSafeEqual"])(attemptedHash, storedHash)) {
        throw new Error("Invalid email or password.");
    }
    return user;
}
async function getUserById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id
        }
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Projects/chess-network-project/src/auth/session.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCookieName",
    ()=>getCookieName,
    "signSession",
    ()=>signSession,
    "verifySession",
    ()=>verifySession
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const COOKIE_NAME = "auth_session";
function base64urlEncode(input) {
    return Buffer.from(input, "utf8").toString("base64").replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}
function base64urlDecode(input) {
    const base64 = input.replaceAll("-", "+").replaceAll("_", "/");
    // Pad to multiple of 4
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, "=");
    return Buffer.from(padded, "base64").toString("utf8");
}
function getSecret() {
    const secret = process.env.AUTH_SECRET;
    if (!secret) {
        // Fail loudly so auth can't silently run insecurely.
        throw new Error("Missing AUTH_SECRET env var.");
    }
    return secret;
}
function signSession(payload) {
    const payloadStr = JSON.stringify(payload);
    const encoded = base64urlEncode(payloadStr);
    const signature = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac("sha256", getSecret()).update(encoded).digest("base64");
    const signatureB64Url = signature.replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
    return `${encoded}.${signatureB64Url}`;
}
function verifySession(cookieValue) {
    try {
        const parts = cookieValue.split(".");
        if (parts.length !== 2) return null;
        const [encoded, signature] = parts;
        const expectedSignature = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac("sha256", getSecret()).update(encoded).digest("base64").replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
        if (signature.length !== expectedSignature.length || !__TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
            return null;
        }
        const payloadStr = base64urlDecode(encoded);
        const payload = JSON.parse(payloadStr);
        if (payload?.userId == null || typeof payload.exp !== "number") return null;
        if (Date.now() > payload.exp) return null;
        const userId = String(payload.userId);
        if (!userId) return null;
        return {
            userId,
            exp: payload.exp
        };
    } catch  {
        return null;
    }
}
function getCookieName() {
    return COOKIE_NAME;
}
}),
"[project]/Projects/chess-network-project/src/auth/getCurrentUser.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/chess-network-project/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$userStore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/chess-network-project/src/auth/userStore.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/chess-network-project/src/auth/session.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$userStore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$userStore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function getCurrentUser() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const cookieValue = cookieStore.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCookieName"])())?.value;
    if (!cookieValue) return null;
    const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifySession"])(cookieValue);
    if (!session) return null;
    const userId = Number.parseInt(session.userId, 10);
    if (!Number.isInteger(userId) || userId < 1) return null;
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$userStore$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserById"])(userId);
    if (!user) return null;
    return {
        id: user.id,
        userName: user.userName,
        email: user.email
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Projects/chess-network-project/src/app/dashboard/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/chess-network-project/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Projects/chess-network-project/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/chess-network-project/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$getCurrentUser$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/chess-network-project/src/auth/getCurrentUser.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$getCurrentUser$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$getCurrentUser$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function Dashboard() {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$src$2f$auth$2f$getCurrentUser$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/login");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Dashboard"
            }, void 0, false, {
                fileName: "[project]/Projects/chess-network-project/src/app/dashboard/page.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Signed in as ",
                    user.email
                ]
            }, void 0, true, {
                fileName: "[project]/Projects/chess-network-project/src/app/dashboard/page.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Projects/chess-network-project/src/app/dashboard/page.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Projects/chess-network-project/src/app/dashboard/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Projects/chess-network-project/src/app/dashboard/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0w_~o.h._.js.map