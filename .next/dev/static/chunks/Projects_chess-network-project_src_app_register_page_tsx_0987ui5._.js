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
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(71);
    if ($[0] !== "e13541514ae18f7a32f578473078e9bcd0d78a150ed875bacaef18e028af88d4") {
        for(let $i = 0; $i < 71; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e13541514ae18f7a32f578473078e9bcd0d78a150ed875bacaef18e028af88d4";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [userName, setUserName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [confirmPassword, setConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userNameTouched, setUserNameTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [emailTouched, setEmailTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [passwordTouched, setPasswordTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    if ($[1] !== confirmPassword || $[2] !== email || $[3] !== password || $[4] !== router || $[5] !== userName) {
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
                    userName,
                    password,
                    confirmPassword
                })
            });
            const data = await res.json().catch(_RegisterPageHandleSubmitAnonymous);
            if (!res.ok || !data?.ok) {
                setError(data?.error ?? "Register failed.");
                return;
            }
            router.replace("/dashboard");
        };
        $[1] = confirmPassword;
        $[2] = email;
        $[3] = password;
        $[4] = router;
        $[5] = userName;
        $[6] = t0;
    } else {
        t0 = $[6];
    }
    const handleSubmit = t0;
    let t1;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-2xl font-semibold",
            children: "Register"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 63,
            columnNumber: 10
        }, this);
        $[7] = t1;
    } else {
        t1 = $[7];
    }
    let t2;
    let t3;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "Username*"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 71,
            columnNumber: 10
        }, this);
        t3 = ({
            "RegisterPage[<input>.onBlur]": ()=>setUserNameTouched(true)
        })["RegisterPage[<input>.onBlur]"];
        $[8] = t2;
        $[9] = t3;
    } else {
        t2 = $[8];
        t3 = $[9];
    }
    let t4;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "RegisterPage[<input>.onChange]": (e_0)=>setUserName(e_0.target.value)
        })["RegisterPage[<input>.onChange]"];
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    let t5;
    if ($[11] !== userName) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            onBlur: t3,
            value: userName,
            onChange: t4,
            placeholder: "Enter your username",
            className: "border border-solid border-gray-300 w-full p-2 rounded"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 92,
            columnNumber: 10
        }, this);
        $[11] = userName;
        $[12] = t5;
    } else {
        t5 = $[12];
    }
    let t6;
    if ($[13] !== userName || $[14] !== userNameTouched) {
        t6 = userNameTouched && userName.length < 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-red-600 text-sm",
            children: "Username must be at least 3 characters long"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 100,
            columnNumber: 51
        }, this) : null;
        $[13] = userName;
        $[14] = userNameTouched;
        $[15] = t6;
    } else {
        t6 = $[15];
    }
    let t7;
    if ($[16] !== userName || $[17] !== userNameTouched) {
        t7 = userNameTouched && userName.length > 15 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-red-600 text-sm",
            children: "Username must be less than 15 characters"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 109,
            columnNumber: 52
        }, this) : null;
        $[16] = userName;
        $[17] = userNameTouched;
        $[18] = t7;
    } else {
        t7 = $[18];
    }
    let t8;
    if ($[19] !== t5 || $[20] !== t6 || $[21] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex flex-col gap-1",
            children: [
                t2,
                t5,
                t6,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 118,
            columnNumber: 10
        }, this);
        $[19] = t5;
        $[20] = t6;
        $[21] = t7;
        $[22] = t8;
    } else {
        t8 = $[22];
    }
    let t10;
    let t9;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "Email"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 129,
            columnNumber: 10
        }, this);
        t10 = ({
            "RegisterPage[<input>.onBlur]": ()=>setEmailTouched(true)
        })["RegisterPage[<input>.onBlur]"];
        $[23] = t10;
        $[24] = t9;
    } else {
        t10 = $[23];
        t9 = $[24];
    }
    let t11;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = ({
            "RegisterPage[<input>.onChange]": (e_1)=>setEmail(e_1.target.value)
        })["RegisterPage[<input>.onChange]"];
        $[25] = t11;
    } else {
        t11 = $[25];
    }
    let t12;
    if ($[26] !== email) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            onBlur: t10,
            value: email,
            onChange: t11,
            placeholder: "you@example.com",
            className: "border border-solid border-gray-300 w-full p-2 rounded"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 150,
            columnNumber: 11
        }, this);
        $[26] = email;
        $[27] = t12;
    } else {
        t12 = $[27];
    }
    let t13;
    if ($[28] !== email || $[29] !== emailTouched) {
        t13 = emailTouched && !email.includes("@") ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-red-600 text-sm",
            children: "Email must contain an @ symbol"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 158,
            columnNumber: 50
        }, this) : null;
        $[28] = email;
        $[29] = emailTouched;
        $[30] = t13;
    } else {
        t13 = $[30];
    }
    let t14;
    if ($[31] !== t12 || $[32] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex flex-col gap-1",
            children: [
                t9,
                t12,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 167,
            columnNumber: 11
        }, this);
        $[31] = t12;
        $[32] = t13;
        $[33] = t14;
    } else {
        t14 = $[33];
    }
    let t15;
    let t16;
    if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "Password"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 177,
            columnNumber: 11
        }, this);
        t16 = ({
            "RegisterPage[<input>.onBlur]": ()=>setPasswordTouched(true)
        })["RegisterPage[<input>.onBlur]"];
        $[34] = t15;
        $[35] = t16;
    } else {
        t15 = $[34];
        t16 = $[35];
    }
    let t17;
    if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = ({
            "RegisterPage[<input>.onChange]": (e_2)=>setPassword(e_2.target.value)
        })["RegisterPage[<input>.onChange]"];
        $[36] = t17;
    } else {
        t17 = $[36];
    }
    let t18;
    if ($[37] !== password) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            onBlur: t16,
            value: password,
            onChange: t17,
            placeholder: "Choose a password",
            type: "password",
            className: "border border-solid border-gray-300 w-full p-2 rounded"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 198,
            columnNumber: 11
        }, this);
        $[37] = password;
        $[38] = t18;
    } else {
        t18 = $[38];
    }
    let t19;
    if ($[39] !== password || $[40] !== passwordTouched) {
        t19 = passwordTouched && password.length < 8 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-red-600 text-sm",
            children: "Password must be at least 8 characters long"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 206,
            columnNumber: 52
        }, this) : null;
        $[39] = password;
        $[40] = passwordTouched;
        $[41] = t19;
    } else {
        t19 = $[41];
    }
    let t20;
    if ($[42] !== password || $[43] !== passwordTouched) {
        t20 = passwordTouched && password.length > 15 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-red-600 text-sm",
            children: "Password must be less than 15 characters"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 215,
            columnNumber: 53
        }, this) : null;
        $[42] = password;
        $[43] = passwordTouched;
        $[44] = t20;
    } else {
        t20 = $[44];
    }
    let t21;
    if ($[45] !== t18 || $[46] !== t19 || $[47] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex flex-col gap-1",
            children: [
                t15,
                t18,
                t19,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 224,
            columnNumber: 11
        }, this);
        $[45] = t18;
        $[46] = t19;
        $[47] = t20;
        $[48] = t21;
    } else {
        t21 = $[48];
    }
    let t22;
    let t23;
    if ($[49] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "Confirm Password"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 235,
            columnNumber: 11
        }, this);
        t23 = ({
            "RegisterPage[<input>.onBlur]": ()=>setConfirmPasswordTouched(true)
        })["RegisterPage[<input>.onBlur]"];
        $[49] = t22;
        $[50] = t23;
    } else {
        t22 = $[49];
        t23 = $[50];
    }
    let t24;
    if ($[51] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = ({
            "RegisterPage[<input>.onChange]": (e_3)=>setConfirmPassword(e_3.target.value)
        })["RegisterPage[<input>.onChange]"];
        $[51] = t24;
    } else {
        t24 = $[51];
    }
    let t25;
    if ($[52] !== confirmPassword) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            onBlur: t23,
            value: confirmPassword,
            onChange: t24,
            placeholder: "Confirm your password",
            type: "password",
            className: "border border-solid border-gray-300 w-full p-2 rounded"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 256,
            columnNumber: 11
        }, this);
        $[52] = confirmPassword;
        $[53] = t25;
    } else {
        t25 = $[53];
    }
    let t26;
    if ($[54] !== confirmPassword || $[55] !== confirmPasswordTouched || $[56] !== password) {
        t26 = confirmPasswordTouched && confirmPassword !== password ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-red-600 text-sm",
            children: "Passwords do not match"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 264,
            columnNumber: 68
        }, this) : null;
        $[54] = confirmPassword;
        $[55] = confirmPasswordTouched;
        $[56] = password;
        $[57] = t26;
    } else {
        t26 = $[57];
    }
    let t27;
    if ($[58] !== t25 || $[59] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex flex-col gap-1",
            children: [
                t22,
                t25,
                t26
            ]
        }, void 0, true, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 274,
            columnNumber: 11
        }, this);
        $[58] = t25;
        $[59] = t26;
        $[60] = t27;
    } else {
        t27 = $[60];
    }
    let t28;
    if ($[61] !== error) {
        t28 = error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-red-600 text-sm rounded border border-red-200 bg-red-50 p-2",
            role: "alert",
            children: error
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 283,
            columnNumber: 19
        }, this) : null;
        $[61] = error;
        $[62] = t28;
    } else {
        t28 = $[62];
    }
    let t29;
    if ($[63] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "submit",
            className: "bg-[#6c47ff] text-white rounded px-4 py-2 mt-2",
            children: "Create account"
        }, void 0, false, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 291,
            columnNumber: 11
        }, this);
        $[63] = t29;
    } else {
        t29 = $[63];
    }
    let t30;
    if ($[64] !== handleSubmit || $[65] !== t14 || $[66] !== t21 || $[67] !== t27 || $[68] !== t28 || $[69] !== t8) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$chess$2d$network$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleSubmit,
            className: "flex flex-col gap-2 max-w-md w-full",
            children: [
                t1,
                t8,
                t14,
                t21,
                t27,
                t28,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/Projects/chess-network-project/src/app/register/page.tsx",
            lineNumber: 298,
            columnNumber: 11
        }, this);
        $[64] = handleSubmit;
        $[65] = t14;
        $[66] = t21;
        $[67] = t27;
        $[68] = t28;
        $[69] = t8;
        $[70] = t30;
    } else {
        t30 = $[70];
    }
    return t30;
}
_s(RegisterPage, "ceeI7Tn2w3DYCfgZmUhd6oJCxwM=", false, function() {
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