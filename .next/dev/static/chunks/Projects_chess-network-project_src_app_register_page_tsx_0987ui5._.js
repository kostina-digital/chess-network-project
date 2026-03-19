(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Projects/chess-network-project/src/app/register/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RegisterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/chess-network-project/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/chess-network-project/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/chess-network-project/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/chess-network-project/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function RegisterPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(22);
    if ($[0] !== "248893000a45961734e2fc13127fa9f733b443e07b8cfb49f2bb24932054a910") {
        for(let $i = 0; $i < 22; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "248893000a45961734e2fc13127fa9f733b443e07b8cfb49f2bb24932054a910";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t0;
    if ($[1] !== email || $[2] !== password || $[3] !== router) {
        t0 = async function handleSubmit(e) {
            e.preventDefault();
            setError(null);
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await res.json().catch(_RegisterPageHandleSubmitAnonymous);
            if (!res.ok || !data?.ok) {
                setError(data?.error ?? "Register failed.");
                return;
            }
            router.replace("/dashboard");
        };
        $[1] = email;
        $[2] = password;
        $[3] = router;
        $[4] = t0;
    } else {
        t0 = $[4];
    }
    const handleSubmit = t0;
    let t1;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-2xl font-semibold",
            children: "Register"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 53,
            columnNumber: 10
        }, this);
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "Email"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 60,
            columnNumber: 10
        }, this);
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    let t3;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "RegisterPage[<input>.onChange]": (e_0)=>setEmail(e_0.target.value)
        })["RegisterPage[<input>.onChange]"];
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    let t4;
    if ($[8] !== email) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex flex-col gap-1",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: email,
                    onChange: t3,
                    placeholder: "you@example.com",
                    className: "border border-solid border-gray-300 w-full p-2 rounded"
                }, void 0, false, {
                    fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
                    lineNumber: 76,
                    columnNumber: 53
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 76,
            columnNumber: 10
        }, this);
        $[8] = email;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    let t5;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "Password"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, this);
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "RegisterPage[<input>.onChange]": (e_1)=>setPassword(e_1.target.value)
        })["RegisterPage[<input>.onChange]"];
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] !== password) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex flex-col gap-1",
            children: [
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: password,
                    onChange: t6,
                    placeholder: "Choose a password",
                    type: "password",
                    className: "border border-solid border-gray-300 w-full p-2 rounded"
                }, void 0, false, {
                    fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
                    lineNumber: 100,
                    columnNumber: 53
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 100,
            columnNumber: 10
        }, this);
        $[12] = password;
        $[13] = t7;
    } else {
        t7 = $[13];
    }
    let t8;
    if ($[14] !== error) {
        t8 = error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-red-600 text-sm",
            children: error
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 108,
            columnNumber: 18
        }, this) : null;
        $[14] = error;
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    let t9;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "submit",
            className: "bg-[#6c47ff] text-white rounded px-4 py-2 mt-2",
            children: "Create account"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 116,
            columnNumber: 10
        }, this);
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] !== handleSubmit || $[18] !== t4 || $[19] !== t7 || $[20] !== t8) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleSubmit,
            className: "flex flex-col gap-2 max-w-md w-full",
            children: [
                t1,
                t4,
                t7,
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 123,
            columnNumber: 11
        }, this);
        $[17] = handleSubmit;
        $[18] = t4;
        $[19] = t7;
        $[20] = t8;
        $[21] = t10;
    } else {
        t10 = $[21];
    }
    return t10;
}
_s(RegisterPage, "5gegbvPKNJSENPEOOlfMFtVzGKA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = RegisterPage;
function _RegisterPageHandleSubmitAnonymous() {
    return null;
}
var _c;
__turbopack_context__.k.register(_c, "RegisterPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Projects_chess-network-project_src_app_register_page_tsx_0987ui5._.js.map