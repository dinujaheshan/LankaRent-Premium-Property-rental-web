"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/inquiries/[id]/route";
exports.ids = ["app/api/inquiries/[id]/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Finquiries%2F%5Bid%5D%2Froute&page=%2Fapi%2Finquiries%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Finquiries%2F%5Bid%5D%2Froute.ts&appDir=F%3A%5Cproperty%20rental%20web%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cproperty%20rental%20web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Finquiries%2F%5Bid%5D%2Froute&page=%2Fapi%2Finquiries%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Finquiries%2F%5Bid%5D%2Froute.ts&appDir=F%3A%5Cproperty%20rental%20web%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cproperty%20rental%20web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var F_property_rental_web_app_api_inquiries_id_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/inquiries/[id]/route.ts */ \"(rsc)/./app/api/inquiries/[id]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/inquiries/[id]/route\",\n        pathname: \"/api/inquiries/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/inquiries/[id]/route\"\n    },\n    resolvedPagePath: \"F:\\\\property rental web\\\\app\\\\api\\\\inquiries\\\\[id]\\\\route.ts\",\n    nextConfigOutput,\n    userland: F_property_rental_web_app_api_inquiries_id_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/inquiries/[id]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZpbnF1aXJpZXMlMkYlNUJpZCU1RCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGaW5xdWlyaWVzJTJGJTVCaWQlNUQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZpbnF1aXJpZXMlMkYlNUJpZCU1RCUyRnJvdXRlLnRzJmFwcERpcj1GJTNBJTVDcHJvcGVydHklMjByZW50YWwlMjB3ZWIlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUYlM0ElNUNwcm9wZXJ0eSUyMHJlbnRhbCUyMHdlYiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDWTtBQUN6RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb3BlcnR5LXJlbnRhbC13ZWIvPzAyZGYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiRjpcXFxccHJvcGVydHkgcmVudGFsIHdlYlxcXFxhcHBcXFxcYXBpXFxcXGlucXVpcmllc1xcXFxbaWRdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9pbnF1aXJpZXMvW2lkXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2lucXVpcmllcy9baWRdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9pbnF1aXJpZXMvW2lkXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkY6XFxcXHByb3BlcnR5IHJlbnRhbCB3ZWJcXFxcYXBwXFxcXGFwaVxcXFxpbnF1aXJpZXNcXFxcW2lkXVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvaW5xdWlyaWVzL1tpZF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Finquiries%2F%5Bid%5D%2Froute&page=%2Fapi%2Finquiries%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Finquiries%2F%5Bid%5D%2Froute.ts&appDir=F%3A%5Cproperty%20rental%20web%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cproperty%20rental%20web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/inquiries/[id]/route.ts":
/*!*****************************************!*\
  !*** ./app/api/inquiries/[id]/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PATCH: () => (/* binding */ PATCH)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _lib_models_Inquiry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/models/Inquiry */ \"(rsc)/./lib/models/Inquiry.ts\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\n\n\nasync function PATCH(request, { params }) {\n    const token = request.cookies.get(_lib_auth__WEBPACK_IMPORTED_MODULE_3__.COOKIE_NAME)?.value;\n    if (!token || !(0,_lib_auth__WEBPACK_IMPORTED_MODULE_3__.verifyAdminToken)(token)) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n        const { isRead } = await request.json();\n        const inquiry = await _lib_models_Inquiry__WEBPACK_IMPORTED_MODULE_2__[\"default\"].findByIdAndUpdate(params.id, {\n            isRead\n        }, {\n            new: true\n        });\n        if (!inquiry) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: \"Not found\"\n        }, {\n            status: 404\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            data: inquiry\n        });\n    } catch  {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: \"Failed to update\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2lucXVpcmllcy9baWRdL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXdEO0FBQ2xCO0FBQ0s7QUFDZ0I7QUFFcEQsZUFBZUssTUFDcEJDLE9BQW9CLEVBQ3BCLEVBQUVDLE1BQU0sRUFBOEI7SUFFdEMsTUFBTUMsUUFBUUYsUUFBUUcsT0FBTyxDQUFDQyxHQUFHLENBQUNOLGtEQUFXQSxHQUFHTztJQUNoRCxJQUFJLENBQUNILFNBQVMsQ0FBQ0wsMkRBQWdCQSxDQUFDSyxRQUFRO1FBQ3RDLE9BQU9SLHFEQUFZQSxDQUFDWSxJQUFJLENBQUM7WUFBRUMsU0FBUztZQUFPQyxPQUFPO1FBQWUsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEY7SUFDQSxJQUFJO1FBQ0YsTUFBTWQsd0RBQVNBO1FBQ2YsTUFBTSxFQUFFZSxNQUFNLEVBQUUsR0FBRyxNQUFNVixRQUFRTSxJQUFJO1FBQ3JDLE1BQU1LLFVBQVUsTUFBTWYsMkRBQU9BLENBQUNnQixpQkFBaUIsQ0FBQ1gsT0FBT1ksRUFBRSxFQUFFO1lBQUVIO1FBQU8sR0FBRztZQUFFSSxLQUFLO1FBQUs7UUFDbkYsSUFBSSxDQUFDSCxTQUFTLE9BQU9qQixxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO1lBQUVDLFNBQVM7WUFBT0MsT0FBTztRQUFZLEdBQUc7WUFBRUMsUUFBUTtRQUFJO1FBQzdGLE9BQU9mLHFEQUFZQSxDQUFDWSxJQUFJLENBQUM7WUFBRUMsU0FBUztZQUFNUSxNQUFNSjtRQUFRO0lBQzFELEVBQUUsT0FBTTtRQUNOLE9BQU9qQixxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO1lBQUVDLFNBQVM7WUFBT0MsT0FBTztRQUFtQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUN4RjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvcGVydHktcmVudGFsLXdlYi8uL2FwcC9hcGkvaW5xdWlyaWVzL1tpZF0vcm91dGUudHM/Y2ZjZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IGRiQ29ubmVjdCBmcm9tICdAL2xpYi9tb25nb2RiJztcbmltcG9ydCBJbnF1aXJ5IGZyb20gJ0AvbGliL21vZGVscy9JbnF1aXJ5JztcbmltcG9ydCB7IHZlcmlmeUFkbWluVG9rZW4sIENPT0tJRV9OQU1FIH0gZnJvbSAnQC9saWIvYXV0aCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQQVRDSChcbiAgcmVxdWVzdDogTmV4dFJlcXVlc3QsXG4gIHsgcGFyYW1zIH06IHsgcGFyYW1zOiB7IGlkOiBzdHJpbmcgfSB9XG4pIHtcbiAgY29uc3QgdG9rZW4gPSByZXF1ZXN0LmNvb2tpZXMuZ2V0KENPT0tJRV9OQU1FKT8udmFsdWU7XG4gIGlmICghdG9rZW4gfHwgIXZlcmlmeUFkbWluVG9rZW4odG9rZW4pKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVW5hdXRob3JpemVkJyB9LCB7IHN0YXR1czogNDAxIH0pO1xuICB9XG4gIHRyeSB7XG4gICAgYXdhaXQgZGJDb25uZWN0KCk7XG4gICAgY29uc3QgeyBpc1JlYWQgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuICAgIGNvbnN0IGlucXVpcnkgPSBhd2FpdCBJbnF1aXJ5LmZpbmRCeUlkQW5kVXBkYXRlKHBhcmFtcy5pZCwgeyBpc1JlYWQgfSwgeyBuZXc6IHRydWUgfSk7XG4gICAgaWYgKCFpbnF1aXJ5KSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdOb3QgZm91bmQnIH0sIHsgc3RhdHVzOiA0MDQgfSk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogaW5xdWlyeSB9KTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFpbGVkIHRvIHVwZGF0ZScgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImRiQ29ubmVjdCIsIklucXVpcnkiLCJ2ZXJpZnlBZG1pblRva2VuIiwiQ09PS0lFX05BTUUiLCJQQVRDSCIsInJlcXVlc3QiLCJwYXJhbXMiLCJ0b2tlbiIsImNvb2tpZXMiLCJnZXQiLCJ2YWx1ZSIsImpzb24iLCJzdWNjZXNzIiwiZXJyb3IiLCJzdGF0dXMiLCJpc1JlYWQiLCJpbnF1aXJ5IiwiZmluZEJ5SWRBbmRVcGRhdGUiLCJpZCIsIm5ldyIsImRhdGEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/inquiries/[id]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   COOKIE_NAME: () => (/* binding */ COOKIE_NAME),\n/* harmony export */   getAdminSession: () => (/* binding */ getAdminSession),\n/* harmony export */   hashPassword: () => (/* binding */ hashPassword),\n/* harmony export */   signAdminToken: () => (/* binding */ signAdminToken),\n/* harmony export */   verifyAdminToken: () => (/* binding */ verifyAdminToken),\n/* harmony export */   verifyPassword: () => (/* binding */ verifyPassword)\n/* harmony export */ });\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\n\nconst JWT_SECRET = process.env.JWT_SECRET;\nconst COOKIE_NAME = \"lankarent_admin_token\";\nasync function hashPassword(password) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_0___default().hash(password, 12);\n}\nasync function verifyPassword(password, hash) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_0___default().compare(password, hash);\n}\nfunction signAdminToken(payload) {\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign(payload, JWT_SECRET, {\n        expiresIn: \"8h\"\n    });\n}\nfunction verifyAdminToken(token) {\n    try {\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().verify(token, JWT_SECRET);\n    } catch  {\n        return null;\n    }\n}\nfunction getAdminSession() {\n    const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_2__.cookies)();\n    const token = cookieStore.get(COOKIE_NAME)?.value;\n    if (!token) return null;\n    return verifyAdminToken(token);\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUNDO0FBQ1E7QUFFdkMsTUFBTUcsYUFBYUMsUUFBUUMsR0FBRyxDQUFDRixVQUFVO0FBQ3pDLE1BQU1HLGNBQWM7QUFFYixlQUFlQyxhQUFhQyxRQUFnQjtJQUNqRCxPQUFPUixvREFBVyxDQUFDUSxVQUFVO0FBQy9CO0FBRU8sZUFBZUUsZUFBZUYsUUFBZ0IsRUFBRUMsSUFBWTtJQUNqRSxPQUFPVCx1REFBYyxDQUFDUSxVQUFVQztBQUNsQztBQUVPLFNBQVNHLGVBQWVDLE9BQXlDO0lBQ3RFLE9BQU9aLHdEQUFRLENBQUNZLFNBQVNWLFlBQVk7UUFBRVksV0FBVztJQUFLO0FBQ3pEO0FBRU8sU0FBU0MsaUJBQWlCQyxLQUFhO0lBQzVDLElBQUk7UUFDRixPQUFPaEIsMERBQVUsQ0FBQ2dCLE9BQU9kO0lBQzNCLEVBQUUsT0FBTTtRQUNOLE9BQU87SUFDVDtBQUNGO0FBRU8sU0FBU2dCO0lBQ2QsTUFBTUMsY0FBY2xCLHFEQUFPQTtJQUMzQixNQUFNZSxRQUFRRyxZQUFZQyxHQUFHLENBQUNmLGNBQWNnQjtJQUM1QyxJQUFJLENBQUNMLE9BQU8sT0FBTztJQUNuQixPQUFPRCxpQkFBaUJDO0FBQzFCO0FBRXVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvcGVydHktcmVudGFsLXdlYi8uL2xpYi9hdXRoLnRzP2JmN2UiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSAnbmV4dC9oZWFkZXJzJztcblxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQhO1xuY29uc3QgQ09PS0lFX05BTUUgPSAnbGFua2FyZW50X2FkbWluX3Rva2VuJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhc2hQYXNzd29yZChwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIGJjcnlwdC5oYXNoKHBhc3N3b3JkLCAxMik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlQYXNzd29yZChwYXNzd29yZDogc3RyaW5nLCBoYXNoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCBoYXNoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNpZ25BZG1pblRva2VuKHBheWxvYWQ6IHsgaWQ6IHN0cmluZzsgdXNlcm5hbWU6IHN0cmluZyB9KTogc3RyaW5nIHtcbiAgcmV0dXJuIGp3dC5zaWduKHBheWxvYWQsIEpXVF9TRUNSRVQsIHsgZXhwaXJlc0luOiAnOGgnIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5QWRtaW5Ub2tlbih0b2tlbjogc3RyaW5nKTogeyBpZDogc3RyaW5nOyB1c2VybmFtZTogc3RyaW5nIH0gfCBudWxsIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gand0LnZlcmlmeSh0b2tlbiwgSldUX1NFQ1JFVCkgYXMgeyBpZDogc3RyaW5nOyB1c2VybmFtZTogc3RyaW5nIH07XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBZG1pblNlc3Npb24oKTogeyBpZDogc3RyaW5nOyB1c2VybmFtZTogc3RyaW5nIH0gfCBudWxsIHtcbiAgY29uc3QgY29va2llU3RvcmUgPSBjb29raWVzKCk7XG4gIGNvbnN0IHRva2VuID0gY29va2llU3RvcmUuZ2V0KENPT0tJRV9OQU1FKT8udmFsdWU7XG4gIGlmICghdG9rZW4pIHJldHVybiBudWxsO1xuICByZXR1cm4gdmVyaWZ5QWRtaW5Ub2tlbih0b2tlbik7XG59XG5cbmV4cG9ydCB7IENPT0tJRV9OQU1FIH07XG4iXSwibmFtZXMiOlsiYmNyeXB0Iiwiand0IiwiY29va2llcyIsIkpXVF9TRUNSRVQiLCJwcm9jZXNzIiwiZW52IiwiQ09PS0lFX05BTUUiLCJoYXNoUGFzc3dvcmQiLCJwYXNzd29yZCIsImhhc2giLCJ2ZXJpZnlQYXNzd29yZCIsImNvbXBhcmUiLCJzaWduQWRtaW5Ub2tlbiIsInBheWxvYWQiLCJzaWduIiwiZXhwaXJlc0luIiwidmVyaWZ5QWRtaW5Ub2tlbiIsInRva2VuIiwidmVyaWZ5IiwiZ2V0QWRtaW5TZXNzaW9uIiwiY29va2llU3RvcmUiLCJnZXQiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/models/Inquiry.ts":
/*!*******************************!*\
  !*** ./lib/models/Inquiry.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst InquirySchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    fullName: {\n        type: String,\n        required: true\n    },\n    email: {\n        type: String,\n        required: true\n    },\n    phone: {\n        type: String,\n        default: \"\"\n    },\n    inquiryType: {\n        type: String,\n        enum: [\n            \"General\",\n            \"Pricing\",\n            \"Availability\",\n            \"Maintenance\",\n            \"Legal\",\n            \"Other\"\n        ],\n        required: true\n    },\n    message: {\n        type: String,\n        required: true\n    },\n    isRead: {\n        type: Boolean,\n        default: false\n    },\n    replyMessage: {\n        type: String\n    },\n    repliedAt: {\n        type: Date\n    },\n    isReplied: {\n        type: Boolean,\n        default: false\n    }\n}, {\n    timestamps: true\n});\nif ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Inquiry) {\n    delete (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Inquiry;\n}\nconst Inquiry = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Inquiry\", InquirySchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Inquiry);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9kZWxzL0lucXVpcnkudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTZEO0FBZTdELE1BQU1FLGdCQUF3QixJQUFJRCw0Q0FBTUEsQ0FDdEM7SUFDRUUsVUFBYTtRQUFFQyxNQUFNQztRQUFRQyxVQUFVO0lBQUs7SUFDNUNDLE9BQWE7UUFBRUgsTUFBTUM7UUFBUUMsVUFBVTtJQUFLO0lBQzVDRSxPQUFhO1FBQUVKLE1BQU1DO1FBQVFJLFNBQVM7SUFBRztJQUN6Q0MsYUFBYTtRQUNYTixNQUFNQztRQUNOTSxNQUFNO1lBQUM7WUFBVztZQUFXO1lBQWdCO1lBQWU7WUFBUztTQUFRO1FBQzdFTCxVQUFVO0lBQ1o7SUFDQU0sU0FBYztRQUFFUixNQUFNQztRQUFRQyxVQUFVO0lBQUs7SUFDN0NPLFFBQWM7UUFBRVQsTUFBTVU7UUFBU0wsU0FBUztJQUFNO0lBQzlDTSxjQUFjO1FBQUVYLE1BQU1DO0lBQU87SUFDN0JXLFdBQWM7UUFBRVosTUFBTWE7SUFBSztJQUMzQkMsV0FBYztRQUFFZCxNQUFNVTtRQUFTTCxTQUFTO0lBQU07QUFDaEQsR0FDQTtJQUFFVSxZQUFZO0FBQUs7QUFHckIsSUFBSW5CLHdEQUFlLENBQUNxQixPQUFPLEVBQUU7SUFDM0IsT0FBTyx3REFBZ0IsQ0FBU0EsT0FBTztBQUN6QztBQUVBLE1BQU1BLFVBQTJCckIscURBQWMsQ0FBVyxXQUFXRTtBQUVyRSxpRUFBZW1CLE9BQU9BLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9wZXJ0eS1yZW50YWwtd2ViLy4vbGliL21vZGVscy9JbnF1aXJ5LnRzP2E5MzYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSwgRG9jdW1lbnQsIE1vZGVsIH0gZnJvbSAnbW9uZ29vc2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElJbnF1aXJ5IGV4dGVuZHMgRG9jdW1lbnQge1xuICBmdWxsTmFtZTogc3RyaW5nO1xuICBlbWFpbDogc3RyaW5nO1xuICBwaG9uZTogc3RyaW5nO1xuICBpbnF1aXJ5VHlwZTogJ0dlbmVyYWwnIHwgJ1ByaWNpbmcnIHwgJ0F2YWlsYWJpbGl0eScgfCAnTWFpbnRlbmFuY2UnIHwgJ0xlZ2FsJyB8ICdPdGhlcic7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgaXNSZWFkOiBib29sZWFuO1xuICByZXBseU1lc3NhZ2U/OiBzdHJpbmc7XG4gIHJlcGxpZWRBdD86IERhdGU7XG4gIGlzUmVwbGllZD86IGJvb2xlYW47XG4gIGNyZWF0ZWRBdDogRGF0ZTtcbn1cblxuY29uc3QgSW5xdWlyeVNjaGVtYTogU2NoZW1hID0gbmV3IFNjaGVtYShcbiAge1xuICAgIGZ1bGxOYW1lOiAgICB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICBlbWFpbDogICAgICAgeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgcGhvbmU6ICAgICAgIHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnJyB9LFxuICAgIGlucXVpcnlUeXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBlbnVtOiBbJ0dlbmVyYWwnLCAnUHJpY2luZycsICdBdmFpbGFiaWxpdHknLCAnTWFpbnRlbmFuY2UnLCAnTGVnYWwnLCAnT3RoZXInXSxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gICAgbWVzc2FnZTogICAgICB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICBpc1JlYWQ6ICAgICAgIHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfSxcbiAgICByZXBseU1lc3NhZ2U6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgcmVwbGllZEF0OiAgICB7IHR5cGU6IERhdGUgfSxcbiAgICBpc1JlcGxpZWQ6ICAgIHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfSxcbiAgfSxcbiAgeyB0aW1lc3RhbXBzOiB0cnVlIH1cbik7XG5cbmlmIChtb25nb29zZS5tb2RlbHMuSW5xdWlyeSkge1xuICBkZWxldGUgKG1vbmdvb3NlLm1vZGVscyBhcyBhbnkpLklucXVpcnk7XG59XG5cbmNvbnN0IElucXVpcnk6IE1vZGVsPElJbnF1aXJ5PiA9IG1vbmdvb3NlLm1vZGVsPElJbnF1aXJ5PignSW5xdWlyeScsIElucXVpcnlTY2hlbWEpO1xuXG5leHBvcnQgZGVmYXVsdCBJbnF1aXJ5O1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiU2NoZW1hIiwiSW5xdWlyeVNjaGVtYSIsImZ1bGxOYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwiZW1haWwiLCJwaG9uZSIsImRlZmF1bHQiLCJpbnF1aXJ5VHlwZSIsImVudW0iLCJtZXNzYWdlIiwiaXNSZWFkIiwiQm9vbGVhbiIsInJlcGx5TWVzc2FnZSIsInJlcGxpZWRBdCIsIkRhdGUiLCJpc1JlcGxpZWQiLCJ0aW1lc3RhbXBzIiwibW9kZWxzIiwiSW5xdWlyeSIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/models/Inquiry.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable inside .env.local\");\n}\nlet cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>mongoose);\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsY0FBY0MsUUFBUUMsR0FBRyxDQUFDRixXQUFXO0FBRTNDLElBQUksQ0FBQ0EsYUFBYTtJQUNoQixNQUFNLElBQUlHLE1BQU07QUFDbEI7QUFZQSxJQUFJQyxTQUF3QkMsT0FBT04sUUFBUTtBQUUzQyxJQUFJLENBQUNLLFFBQVE7SUFDWEEsU0FBU0MsT0FBT04sUUFBUSxHQUFHO1FBQUVPLE1BQU07UUFBTUMsU0FBUztJQUFLO0FBQ3pEO0FBRUEsZUFBZUM7SUFDYixJQUFJSixPQUFPRSxJQUFJLEVBQUU7UUFDZixPQUFPRixPQUFPRSxJQUFJO0lBQ3BCO0lBRUEsSUFBSSxDQUFDRixPQUFPRyxPQUFPLEVBQUU7UUFDbkIsTUFBTUUsT0FBTztZQUNYQyxnQkFBZ0I7UUFDbEI7UUFDQU4sT0FBT0csT0FBTyxHQUFHUix1REFBZ0IsQ0FBQ0MsYUFBYVMsTUFBTUcsSUFBSSxDQUFDLENBQUNiLFdBQWFBO0lBQzFFO0lBRUEsSUFBSTtRQUNGSyxPQUFPRSxJQUFJLEdBQUcsTUFBTUYsT0FBT0csT0FBTztJQUNwQyxFQUFFLE9BQU9NLEdBQUc7UUFDVlQsT0FBT0csT0FBTyxHQUFHO1FBQ2pCLE1BQU1NO0lBQ1I7SUFFQSxPQUFPVCxPQUFPRSxJQUFJO0FBQ3BCO0FBRUEsaUVBQWVFLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9wZXJ0eS1yZW50YWwtd2ViLy4vbGliL21vbmdvZGIudHM/MDViZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJITtcblxuaWYgKCFNT05HT0RCX1VSSSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBkZWZpbmUgdGhlIE1PTkdPREJfVVJJIGVudmlyb25tZW50IHZhcmlhYmxlIGluc2lkZSAuZW52LmxvY2FsJyk7XG59XG5cbmludGVyZmFjZSBNb25nb29zZUNhY2hlIHtcbiAgY29ubjogdHlwZW9mIG1vbmdvb3NlIHwgbnVsbDtcbiAgcHJvbWlzZTogUHJvbWlzZTx0eXBlb2YgbW9uZ29vc2U+IHwgbnVsbDtcbn1cblxuZGVjbGFyZSBnbG9iYWwge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdmFyXG4gIHZhciBtb25nb29zZTogTW9uZ29vc2VDYWNoZTtcbn1cblxubGV0IGNhY2hlZDogTW9uZ29vc2VDYWNoZSA9IGdsb2JhbC5tb25nb29zZTtcblxuaWYgKCFjYWNoZWQpIHtcbiAgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlID0geyBjb25uOiBudWxsLCBwcm9taXNlOiBudWxsIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRiQ29ubmVjdCgpOiBQcm9taXNlPHR5cGVvZiBtb25nb29zZT4ge1xuICBpZiAoY2FjaGVkLmNvbm4pIHtcbiAgICByZXR1cm4gY2FjaGVkLmNvbm47XG4gIH1cblxuICBpZiAoIWNhY2hlZC5wcm9taXNlKSB7XG4gICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgIGJ1ZmZlckNvbW1hbmRzOiBmYWxzZSxcbiAgICB9O1xuICAgIGNhY2hlZC5wcm9taXNlID0gbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSwgb3B0cykudGhlbigobW9uZ29vc2UpID0+IG1vbmdvb3NlKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY2FjaGVkLmNvbm4gPSBhd2FpdCBjYWNoZWQucHJvbWlzZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZC5wcm9taXNlID0gbnVsbDtcbiAgICB0aHJvdyBlO1xuICB9XG5cbiAgcmV0dXJuIGNhY2hlZC5jb25uO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkYkNvbm5lY3Q7XG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbCIsImNvbm4iLCJwcm9taXNlIiwiZGJDb25uZWN0Iiwib3B0cyIsImJ1ZmZlckNvbW1hbmRzIiwiY29ubmVjdCIsInRoZW4iLCJlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/jws","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/bcryptjs","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/lodash.once","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isinteger","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.includes","vendor-chunks/jwa","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Finquiries%2F%5Bid%5D%2Froute&page=%2Fapi%2Finquiries%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Finquiries%2F%5Bid%5D%2Froute.ts&appDir=F%3A%5Cproperty%20rental%20web%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cproperty%20rental%20web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();