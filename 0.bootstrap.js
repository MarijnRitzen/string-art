(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/string_art.js":
/*!****************************!*\
  !*** ../pkg/string_art.js ***!
  \****************************/
/*! exports provided: __wbg_set_wasm, Disk, __wbindgen_object_drop_ref, __wbindgen_string_new, __wbg_new_abda76e883ba8a5f, __wbg_stack_658279fe44541cf6, __wbg_error_f851667af71bcfc6, __wbg_instanceof_HtmlCanvasElement_da5f9efa0688cf6d, __wbg_setwidth_a667a942dba6656e, __wbg_setheight_a747d440760fe5aa, __wbg_getContext_7c5944ea807bf5d3, __wbg_instanceof_Window_9029196b662bc42a, __wbg_document_f7ace2b956f30a4f, __wbg_getElementById_cc0e0d931b0d9a28, __wbg_instanceof_CanvasRenderingContext2d_bc0a6635c96eca9b, __wbg_setglobalAlpha_97edbae8133ee6af, __wbg_setfillStyle_401fa583a1c8863c, __wbg_beginPath_b3943a4f4af02eac, __wbg_fill_4c8fa136a217e4c7, __wbg_stroke_ee7601ba7abc0ba2, __wbg_arc_a67bede1795ab076, __wbg_closePath_1ccba0ac1c9b169a, __wbg_lineTo_76baf70710a4f382, __wbg_moveTo_d2635b364d869fa8, __wbg_clearRect_517d3360d8be8a55, __wbg_fillRect_e285f7b46668b7fa, __wbg_newnoargs_581967eacc0e2604, __wbg_call_cb65541d95d71282, __wbg_self_1ff1d729e9aae938, __wbg_window_5f4faef6c12b79ec, __wbg_globalThis_1d39714405582d3c, __wbg_global_651f05c6a0944d1c, __wbindgen_is_undefined, __wbindgen_object_clone_ref, __wbg_random_5f61cd0d6777a993, __wbindgen_debug_string, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _string_art_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./string_art_bg.wasm */ \"../pkg/string_art_bg.wasm\");\n/* harmony import */ var _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./string_art_bg.js */ \"../pkg/string_art_bg.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_set_wasm\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_set_wasm\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Disk\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Disk\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_object_drop_ref\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_string_new\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_string_new\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_new_abda76e883ba8a5f\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_new_abda76e883ba8a5f\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_stack_658279fe44541cf6\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_stack_658279fe44541cf6\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_error_f851667af71bcfc6\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_error_f851667af71bcfc6\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_instanceof_HtmlCanvasElement_da5f9efa0688cf6d\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_instanceof_HtmlCanvasElement_da5f9efa0688cf6d\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_setwidth_a667a942dba6656e\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_setwidth_a667a942dba6656e\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_setheight_a747d440760fe5aa\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_setheight_a747d440760fe5aa\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_getContext_7c5944ea807bf5d3\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_getContext_7c5944ea807bf5d3\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_instanceof_Window_9029196b662bc42a\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_instanceof_Window_9029196b662bc42a\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_document_f7ace2b956f30a4f\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_document_f7ace2b956f30a4f\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_getElementById_cc0e0d931b0d9a28\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_getElementById_cc0e0d931b0d9a28\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_instanceof_CanvasRenderingContext2d_bc0a6635c96eca9b\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_instanceof_CanvasRenderingContext2d_bc0a6635c96eca9b\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_setglobalAlpha_97edbae8133ee6af\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_setglobalAlpha_97edbae8133ee6af\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_setfillStyle_401fa583a1c8863c\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_setfillStyle_401fa583a1c8863c\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_beginPath_b3943a4f4af02eac\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_beginPath_b3943a4f4af02eac\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_fill_4c8fa136a217e4c7\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_fill_4c8fa136a217e4c7\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_stroke_ee7601ba7abc0ba2\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_stroke_ee7601ba7abc0ba2\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_arc_a67bede1795ab076\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_arc_a67bede1795ab076\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_closePath_1ccba0ac1c9b169a\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_closePath_1ccba0ac1c9b169a\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_lineTo_76baf70710a4f382\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_lineTo_76baf70710a4f382\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_moveTo_d2635b364d869fa8\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_moveTo_d2635b364d869fa8\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_clearRect_517d3360d8be8a55\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_clearRect_517d3360d8be8a55\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_fillRect_e285f7b46668b7fa\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_fillRect_e285f7b46668b7fa\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_newnoargs_581967eacc0e2604\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_newnoargs_581967eacc0e2604\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_call_cb65541d95d71282\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_call_cb65541d95d71282\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_self_1ff1d729e9aae938\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_self_1ff1d729e9aae938\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_window_5f4faef6c12b79ec\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_window_5f4faef6c12b79ec\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_globalThis_1d39714405582d3c\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_globalThis_1d39714405582d3c\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_global_651f05c6a0944d1c\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_global_651f05c6a0944d1c\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_is_undefined\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_is_undefined\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_clone_ref\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_object_clone_ref\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_random_5f61cd0d6777a993\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_random_5f61cd0d6777a993\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_debug_string\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_debug_string\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return _string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_throw\"]; });\n\n\n\nObject(_string_art_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_set_wasm\"])(_string_art_bg_wasm__WEBPACK_IMPORTED_MODULE_0__);\n\n\n\n//# sourceURL=webpack:///../pkg/string_art.js?");

/***/ }),

/***/ "../pkg/string_art_bg.js":
/*!*******************************!*\
  !*** ../pkg/string_art_bg.js ***!
  \*******************************/
/*! exports provided: __wbg_set_wasm, Disk, __wbindgen_object_drop_ref, __wbindgen_string_new, __wbg_new_abda76e883ba8a5f, __wbg_stack_658279fe44541cf6, __wbg_error_f851667af71bcfc6, __wbg_instanceof_HtmlCanvasElement_da5f9efa0688cf6d, __wbg_setwidth_a667a942dba6656e, __wbg_setheight_a747d440760fe5aa, __wbg_getContext_7c5944ea807bf5d3, __wbg_instanceof_Window_9029196b662bc42a, __wbg_document_f7ace2b956f30a4f, __wbg_getElementById_cc0e0d931b0d9a28, __wbg_instanceof_CanvasRenderingContext2d_bc0a6635c96eca9b, __wbg_setglobalAlpha_97edbae8133ee6af, __wbg_setfillStyle_401fa583a1c8863c, __wbg_beginPath_b3943a4f4af02eac, __wbg_fill_4c8fa136a217e4c7, __wbg_stroke_ee7601ba7abc0ba2, __wbg_arc_a67bede1795ab076, __wbg_closePath_1ccba0ac1c9b169a, __wbg_lineTo_76baf70710a4f382, __wbg_moveTo_d2635b364d869fa8, __wbg_clearRect_517d3360d8be8a55, __wbg_fillRect_e285f7b46668b7fa, __wbg_newnoargs_581967eacc0e2604, __wbg_call_cb65541d95d71282, __wbg_self_1ff1d729e9aae938, __wbg_window_5f4faef6c12b79ec, __wbg_globalThis_1d39714405582d3c, __wbg_global_651f05c6a0944d1c, __wbindgen_is_undefined, __wbindgen_object_clone_ref, __wbg_random_5f61cd0d6777a993, __wbindgen_debug_string, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module, global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_set_wasm\", function() { return __wbg_set_wasm; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Disk\", function() { return Disk; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return __wbindgen_object_drop_ref; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_string_new\", function() { return __wbindgen_string_new; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_new_abda76e883ba8a5f\", function() { return __wbg_new_abda76e883ba8a5f; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_stack_658279fe44541cf6\", function() { return __wbg_stack_658279fe44541cf6; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_error_f851667af71bcfc6\", function() { return __wbg_error_f851667af71bcfc6; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_instanceof_HtmlCanvasElement_da5f9efa0688cf6d\", function() { return __wbg_instanceof_HtmlCanvasElement_da5f9efa0688cf6d; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_setwidth_a667a942dba6656e\", function() { return __wbg_setwidth_a667a942dba6656e; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_setheight_a747d440760fe5aa\", function() { return __wbg_setheight_a747d440760fe5aa; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_getContext_7c5944ea807bf5d3\", function() { return __wbg_getContext_7c5944ea807bf5d3; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_instanceof_Window_9029196b662bc42a\", function() { return __wbg_instanceof_Window_9029196b662bc42a; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_document_f7ace2b956f30a4f\", function() { return __wbg_document_f7ace2b956f30a4f; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_getElementById_cc0e0d931b0d9a28\", function() { return __wbg_getElementById_cc0e0d931b0d9a28; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_instanceof_CanvasRenderingContext2d_bc0a6635c96eca9b\", function() { return __wbg_instanceof_CanvasRenderingContext2d_bc0a6635c96eca9b; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_setglobalAlpha_97edbae8133ee6af\", function() { return __wbg_setglobalAlpha_97edbae8133ee6af; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_setfillStyle_401fa583a1c8863c\", function() { return __wbg_setfillStyle_401fa583a1c8863c; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_beginPath_b3943a4f4af02eac\", function() { return __wbg_beginPath_b3943a4f4af02eac; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_fill_4c8fa136a217e4c7\", function() { return __wbg_fill_4c8fa136a217e4c7; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_stroke_ee7601ba7abc0ba2\", function() { return __wbg_stroke_ee7601ba7abc0ba2; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_arc_a67bede1795ab076\", function() { return __wbg_arc_a67bede1795ab076; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_closePath_1ccba0ac1c9b169a\", function() { return __wbg_closePath_1ccba0ac1c9b169a; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_lineTo_76baf70710a4f382\", function() { return __wbg_lineTo_76baf70710a4f382; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_moveTo_d2635b364d869fa8\", function() { return __wbg_moveTo_d2635b364d869fa8; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_clearRect_517d3360d8be8a55\", function() { return __wbg_clearRect_517d3360d8be8a55; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_fillRect_e285f7b46668b7fa\", function() { return __wbg_fillRect_e285f7b46668b7fa; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_newnoargs_581967eacc0e2604\", function() { return __wbg_newnoargs_581967eacc0e2604; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_call_cb65541d95d71282\", function() { return __wbg_call_cb65541d95d71282; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_self_1ff1d729e9aae938\", function() { return __wbg_self_1ff1d729e9aae938; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_window_5f4faef6c12b79ec\", function() { return __wbg_window_5f4faef6c12b79ec; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_globalThis_1d39714405582d3c\", function() { return __wbg_globalThis_1d39714405582d3c; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_global_651f05c6a0944d1c\", function() { return __wbg_global_651f05c6a0944d1c; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_is_undefined\", function() { return __wbindgen_is_undefined; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_clone_ref\", function() { return __wbindgen_object_clone_ref; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_random_5f61cd0d6777a993\", function() { return __wbg_random_5f61cd0d6777a993; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_debug_string\", function() { return __wbindgen_debug_string; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\nlet wasm;\nfunction __wbg_set_wasm(val) {\n    wasm = val;\n}\n\n\nconst heap = new Array(128).fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nfunction getObject(idx) { return heap[idx]; }\n\nlet heap_next = heap.length;\n\nfunction dropObject(idx) {\n    if (idx < 132) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction takeObject(idx) {\n    const ret = getObject(idx);\n    dropObject(idx);\n    return ret;\n}\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachedUint8Memory0 = null;\n\nfunction getUint8Memory0() {\n    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {\n        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);\n    }\n    return cachedUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    ptr = ptr >>> 0;\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nfunction addHeapObject(obj) {\n    if (heap_next === heap.length) heap.push(heap.length + 1);\n    const idx = heap_next;\n    heap_next = heap[idx];\n\n    heap[idx] = obj;\n    return idx;\n}\n\nfunction debugString(val) {\n    // primitive types\n    const type = typeof val;\n    if (type == 'number' || type == 'boolean' || val == null) {\n        return  `${val}`;\n    }\n    if (type == 'string') {\n        return `\"${val}\"`;\n    }\n    if (type == 'symbol') {\n        const description = val.description;\n        if (description == null) {\n            return 'Symbol';\n        } else {\n            return `Symbol(${description})`;\n        }\n    }\n    if (type == 'function') {\n        const name = val.name;\n        if (typeof name == 'string' && name.length > 0) {\n            return `Function(${name})`;\n        } else {\n            return 'Function';\n        }\n    }\n    // objects\n    if (Array.isArray(val)) {\n        const length = val.length;\n        let debug = '[';\n        if (length > 0) {\n            debug += debugString(val[0]);\n        }\n        for(let i = 1; i < length; i++) {\n            debug += ', ' + debugString(val[i]);\n        }\n        debug += ']';\n        return debug;\n    }\n    // Test for built-in\n    const builtInMatches = /\\[object ([^\\]]+)\\]/.exec(toString.call(val));\n    let className;\n    if (builtInMatches.length > 1) {\n        className = builtInMatches[1];\n    } else {\n        // Failed to match the standard '[object ClassName]'\n        return toString.call(val);\n    }\n    if (className == 'Object') {\n        // we're a user defined class or Object\n        // JSON.stringify avoids problems with cycles, and is generally much\n        // easier than looping through ownProperties of `val`.\n        try {\n            return 'Object(' + JSON.stringify(val) + ')';\n        } catch (_) {\n            return 'Object';\n        }\n    }\n    // errors\n    if (val instanceof Error) {\n        return `${val.name}: ${val.message}\\n${val.stack}`;\n    }\n    // TODO we could test for more things here, like `Set`s and `Map`s.\n    return className;\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nconst lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;\n\nlet cachedTextEncoder = new lTextEncoder('utf-8');\n\nconst encodeString = (typeof cachedTextEncoder.encodeInto === 'function'\n    ? function (arg, view) {\n    return cachedTextEncoder.encodeInto(arg, view);\n}\n    : function (arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n        read: arg.length,\n        written: buf.length\n    };\n});\n\nfunction passStringToWasm0(arg, malloc, realloc) {\n\n    if (realloc === undefined) {\n        const buf = cachedTextEncoder.encode(arg);\n        const ptr = malloc(buf.length, 1) >>> 0;\n        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);\n        WASM_VECTOR_LEN = buf.length;\n        return ptr;\n    }\n\n    let len = arg.length;\n    let ptr = malloc(len, 1) >>> 0;\n\n    const mem = getUint8Memory0();\n\n    let offset = 0;\n\n    for (; offset < len; offset++) {\n        const code = arg.charCodeAt(offset);\n        if (code > 0x7F) break;\n        mem[ptr + offset] = code;\n    }\n\n    if (offset !== len) {\n        if (offset !== 0) {\n            arg = arg.slice(offset);\n        }\n        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;\n        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);\n        const ret = encodeString(arg, view);\n\n        offset += ret.written;\n    }\n\n    WASM_VECTOR_LEN = offset;\n    return ptr;\n}\n\nlet cachedInt32Memory0 = null;\n\nfunction getInt32Memory0() {\n    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {\n        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);\n    }\n    return cachedInt32Memory0;\n}\n\nlet cachedFloat64Memory0 = null;\n\nfunction getFloat64Memory0() {\n    if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {\n        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);\n    }\n    return cachedFloat64Memory0;\n}\n\nfunction passArrayF64ToWasm0(arg, malloc) {\n    const ptr = malloc(arg.length * 8, 8) >>> 0;\n    getFloat64Memory0().set(arg, ptr / 8);\n    WASM_VECTOR_LEN = arg.length;\n    return ptr;\n}\n\nfunction isLikeNone(x) {\n    return x === undefined || x === null;\n}\n\nfunction handleError(f, args) {\n    try {\n        return f.apply(this, args);\n    } catch (e) {\n        wasm.__wbindgen_exn_store(addHeapObject(e));\n    }\n}\n\nfunction notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }\n/**\n*/\nclass Disk {\n\n    static __wrap(ptr) {\n        ptr = ptr >>> 0;\n        const obj = Object.create(Disk.prototype);\n        obj.__wbg_ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.__wbg_ptr;\n        this.__wbg_ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_disk_free(ptr);\n    }\n    /**\n    * @returns {Disk}\n    */\n    static new() {\n        const ret = wasm.disk_new();\n        return Disk.__wrap(ret);\n    }\n    /**\n    */\n    draw_nails() {\n        wasm.disk_draw_nails(this.__wbg_ptr);\n    }\n    /**\n    */\n    draw_canvas() {\n        wasm.disk_draw_canvas(this.__wbg_ptr);\n    }\n    /**\n    */\n    resize() {\n        wasm.disk_resize(this.__wbg_ptr);\n    }\n    /**\n    */\n    draw_strings() {\n        wasm.disk_draw_strings(this.__wbg_ptr);\n    }\n    /**\n    */\n    initialize_drawing_strings() {\n        wasm.disk_initialize_drawing_strings(this.__wbg_ptr);\n    }\n    /**\n    */\n    clear() {\n        wasm.disk_clear(this.__wbg_ptr);\n    }\n    /**\n    */\n    reset() {\n        wasm.disk_reset(this.__wbg_ptr);\n    }\n    /**\n    * @param {number} size\n    */\n    set_pixel_size(size) {\n        wasm.disk_set_pixel_size(this.__wbg_ptr, size);\n    }\n    /**\n    * @returns {number}\n    */\n    get_radius() {\n        const ret = wasm.disk_get_radius(this.__wbg_ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    get_center() {\n        const ret = wasm.disk_get_center(this.__wbg_ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @param {Float64Array} pixels\n    */\n    process_pixels(pixels) {\n        const ptr0 = passArrayF64ToWasm0(pixels, wasm.__wbindgen_malloc);\n        const len0 = WASM_VECTOR_LEN;\n        wasm.disk_process_pixels(this.__wbg_ptr, ptr0, len0);\n    }\n}\n\nfunction __wbindgen_object_drop_ref(arg0) {\n    takeObject(arg0);\n};\n\nfunction __wbindgen_string_new(arg0, arg1) {\n    const ret = getStringFromWasm0(arg0, arg1);\n    return addHeapObject(ret);\n};\n\nfunction __wbg_new_abda76e883ba8a5f() {\n    const ret = new Error();\n    return addHeapObject(ret);\n};\n\nfunction __wbg_stack_658279fe44541cf6(arg0, arg1) {\n    const ret = getObject(arg1).stack;\n    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len1 = WASM_VECTOR_LEN;\n    getInt32Memory0()[arg0 / 4 + 1] = len1;\n    getInt32Memory0()[arg0 / 4 + 0] = ptr1;\n};\n\nfunction __wbg_error_f851667af71bcfc6(arg0, arg1) {\n    let deferred0_0;\n    let deferred0_1;\n    try {\n        deferred0_0 = arg0;\n        deferred0_1 = arg1;\n        console.error(getStringFromWasm0(arg0, arg1));\n    } finally {\n        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);\n    }\n};\n\nfunction __wbg_instanceof_HtmlCanvasElement_da5f9efa0688cf6d(arg0) {\n    let result;\n    try {\n        result = getObject(arg0) instanceof HTMLCanvasElement;\n    } catch {\n        result = false;\n    }\n    const ret = result;\n    return ret;\n};\n\nfunction __wbg_setwidth_a667a942dba6656e(arg0, arg1) {\n    getObject(arg0).width = arg1 >>> 0;\n};\n\nfunction __wbg_setheight_a747d440760fe5aa(arg0, arg1) {\n    getObject(arg0).height = arg1 >>> 0;\n};\n\nfunction __wbg_getContext_7c5944ea807bf5d3() { return handleError(function (arg0, arg1, arg2) {\n    const ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));\n    return isLikeNone(ret) ? 0 : addHeapObject(ret);\n}, arguments) };\n\nfunction __wbg_instanceof_Window_9029196b662bc42a(arg0) {\n    let result;\n    try {\n        result = getObject(arg0) instanceof Window;\n    } catch {\n        result = false;\n    }\n    const ret = result;\n    return ret;\n};\n\nfunction __wbg_document_f7ace2b956f30a4f(arg0) {\n    const ret = getObject(arg0).document;\n    return isLikeNone(ret) ? 0 : addHeapObject(ret);\n};\n\nfunction __wbg_getElementById_cc0e0d931b0d9a28(arg0, arg1, arg2) {\n    const ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));\n    return isLikeNone(ret) ? 0 : addHeapObject(ret);\n};\n\nfunction __wbg_instanceof_CanvasRenderingContext2d_bc0a6635c96eca9b(arg0) {\n    let result;\n    try {\n        result = getObject(arg0) instanceof CanvasRenderingContext2D;\n    } catch {\n        result = false;\n    }\n    const ret = result;\n    return ret;\n};\n\nfunction __wbg_setglobalAlpha_97edbae8133ee6af(arg0, arg1) {\n    getObject(arg0).globalAlpha = arg1;\n};\n\nfunction __wbg_setfillStyle_401fa583a1c8863c(arg0, arg1) {\n    getObject(arg0).fillStyle = getObject(arg1);\n};\n\nfunction __wbg_beginPath_b3943a4f4af02eac(arg0) {\n    getObject(arg0).beginPath();\n};\n\nfunction __wbg_fill_4c8fa136a217e4c7(arg0) {\n    getObject(arg0).fill();\n};\n\nfunction __wbg_stroke_ee7601ba7abc0ba2(arg0) {\n    getObject(arg0).stroke();\n};\n\nfunction __wbg_arc_a67bede1795ab076() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {\n    getObject(arg0).arc(arg1, arg2, arg3, arg4, arg5);\n}, arguments) };\n\nfunction __wbg_closePath_1ccba0ac1c9b169a(arg0) {\n    getObject(arg0).closePath();\n};\n\nfunction __wbg_lineTo_76baf70710a4f382(arg0, arg1, arg2) {\n    getObject(arg0).lineTo(arg1, arg2);\n};\n\nfunction __wbg_moveTo_d2635b364d869fa8(arg0, arg1, arg2) {\n    getObject(arg0).moveTo(arg1, arg2);\n};\n\nfunction __wbg_clearRect_517d3360d8be8a55(arg0, arg1, arg2, arg3, arg4) {\n    getObject(arg0).clearRect(arg1, arg2, arg3, arg4);\n};\n\nfunction __wbg_fillRect_e285f7b46668b7fa(arg0, arg1, arg2, arg3, arg4) {\n    getObject(arg0).fillRect(arg1, arg2, arg3, arg4);\n};\n\nfunction __wbg_newnoargs_581967eacc0e2604(arg0, arg1) {\n    const ret = new Function(getStringFromWasm0(arg0, arg1));\n    return addHeapObject(ret);\n};\n\nfunction __wbg_call_cb65541d95d71282() { return handleError(function (arg0, arg1) {\n    const ret = getObject(arg0).call(getObject(arg1));\n    return addHeapObject(ret);\n}, arguments) };\n\nfunction __wbg_self_1ff1d729e9aae938() { return handleError(function () {\n    const ret = self.self;\n    return addHeapObject(ret);\n}, arguments) };\n\nfunction __wbg_window_5f4faef6c12b79ec() { return handleError(function () {\n    const ret = window.window;\n    return addHeapObject(ret);\n}, arguments) };\n\nfunction __wbg_globalThis_1d39714405582d3c() { return handleError(function () {\n    const ret = globalThis.globalThis;\n    return addHeapObject(ret);\n}, arguments) };\n\nfunction __wbg_global_651f05c6a0944d1c() { return handleError(function () {\n    const ret = global.global;\n    return addHeapObject(ret);\n}, arguments) };\n\nfunction __wbindgen_is_undefined(arg0) {\n    const ret = getObject(arg0) === undefined;\n    return ret;\n};\n\nfunction __wbindgen_object_clone_ref(arg0) {\n    const ret = getObject(arg0);\n    return addHeapObject(ret);\n};\n\nconst __wbg_random_5f61cd0d6777a993 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');\n\nfunction __wbindgen_debug_string(arg0, arg1) {\n    const ret = debugString(getObject(arg1));\n    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len1 = WASM_VECTOR_LEN;\n    getInt32Memory0()[arg0 / 4 + 1] = len1;\n    getInt32Memory0()[arg0 / 4 + 0] = ptr1;\n};\n\nfunction __wbindgen_throw(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../www/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module), __webpack_require__(/*! ./../www/node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///../pkg/string_art_bg.js?");

/***/ }),

/***/ "../pkg/string_art_bg.wasm":
/*!*********************************!*\
  !*** ../pkg/string_art_bg.wasm ***!
  \*********************************/
/*! exports provided: memory, __wbg_disk_free, disk_new, disk_draw_nails, disk_draw_canvas, disk_resize, disk_draw_strings, disk_initialize_drawing_strings, disk_clear, disk_reset, disk_set_pixel_size, disk_get_radius, disk_get_center, disk_process_pixels, __wbindgen_malloc, __wbindgen_realloc, __wbindgen_free, __wbindgen_exn_store */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./string_art_bg.js */ \"../pkg/string_art_bg.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/string_art_bg.wasm?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var wasm_string_art__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wasm-string-art */ \"../pkg/string_art.js\");\n\n\nconst disk = wasm_string_art__WEBPACK_IMPORTED_MODULE_0__[\"Disk\"].new();\n\nfunction getNewImage() {\n  fetch(\"https://faceapi.herokuapp.com/faces?n=1\")\n    .then((response) => response.json())\n    .then((data) => {\n      const imageUrl = data[0].image_url;\n      const img = new Image();\n\n      // Request cross-origin access\n      img.crossOrigin = \"anonymous\";\n\n      img.onload = () => {\n        const canvas = document.createElement(\"canvas\");\n        canvas.width = 64;\n        canvas.height = 64;\n        const context = canvas.getContext(\"2d\");\n\n        // Calculate scale and offset to maintain aspect ratio\n        const scale = Math.min(\n          canvas.width / img.width,\n          canvas.height / img.height\n        );\n        const x = canvas.width / 2 - (img.width / 2) * scale;\n        const y = canvas.height / 2 - (img.height / 2) * scale;\n\n        // Draw the image onto the canvas\n        context.drawImage(img, x, y, img.width * scale, img.height * scale);\n\n        let imgData = context.getImageData(0, 0, canvas.width, canvas.height);\n        let pixels = imgData.data;\n\n        let pixelValues = [];\n        for (let i = 0; i < pixels.length; i += 4) {\n          let grayscale =\n            0.3 * pixels[i] + 0.59 * pixels[i + 1] + 0.11 * pixels[i + 2];\n\n          pixelValues.push(1 - grayscale / 255.0); // just use one channel as they are all the same\n        }\n\n        let pixelArray = new Float64Array(pixelValues);\n\n        disk.process_pixels(pixelArray);\n        disk.draw_nails();\n        disk.draw_canvas();\n        disk.draw_strings();\n      };\n\n      img.src = imageUrl;\n    });\n}\nconst newImageButton = document.getElementById(\"new-image\");\n\nnewImageButton.addEventListener(\"click\", (event) => {\n  getNewImage();\n});\nconst imageModeButton = document.getElementById(\"image-mode-button\");\nlet imageMode = true;\n\nconst activateImageMode = () => {\n  clear();\n  getNewImage();\n  imageModeButton.textContent = \"stringify\";\n  imageMode = true;\n  newImageButton.style.display = \"inline-block\";\n};\n\nconst clear = () => {\n  disk.reset();\n  disk.clear();\n};\n\nlet canvas = document.getElementById(\"string-art-canvas\");\nlet ctx = canvas.getContext(\"2d\");\n\nconst activateStringMode = () => {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  disk.initialize_drawing_strings();\n  imageModeButton.textContent = \"reset\";\n  imageMode = false;\n  newImageButton.style.display = \"none\";\n\n  renderLoop();\n};\nimageModeButton.addEventListener(\"click\", (event) => {\n  if (imageMode) {\n    activateStringMode();\n  } else {\n    activateImageMode();\n  }\n});\n\n// Initialize the canvas with the disk\nconst renderLoop = () => {\n  // disk.clear();\n  // disk.draw_nails();\n  // disk.draw_canvas();\n  disk.draw_strings();\n\n  requestAnimationFrame(renderLoop);\n};\n\ndisk.draw_nails();\ndisk.draw_canvas();\ndisk.draw_strings();\ngetNewImage();\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ })

}]);