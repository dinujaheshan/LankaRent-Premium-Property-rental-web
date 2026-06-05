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
exports.id = "app/api/admin/login/route";
exports.ids = ["app/api/admin/login/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Flogin%2Froute&page=%2Fapi%2Fadmin%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Flogin%2Froute.ts&appDir=F%3A%5Cproperty%20rental%20web%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cproperty%20rental%20web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Flogin%2Froute&page=%2Fapi%2Fadmin%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Flogin%2Froute.ts&appDir=F%3A%5Cproperty%20rental%20web%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cproperty%20rental%20web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var F_property_rental_web_app_api_admin_login_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/login/route.ts */ \"(rsc)/./app/api/admin/login/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/login/route\",\n        pathname: \"/api/admin/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/login/route\"\n    },\n    resolvedPagePath: \"F:\\\\property rental web\\\\app\\\\api\\\\admin\\\\login\\\\route.ts\",\n    nextConfigOutput,\n    userland: F_property_rental_web_app_api_admin_login_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/login/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmxvZ2luJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhZG1pbiUyRmxvZ2luJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWRtaW4lMkZsb2dpbiUyRnJvdXRlLnRzJmFwcERpcj1GJTNBJTVDcHJvcGVydHklMjByZW50YWwlMjB3ZWIlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUYlM0ElNUNwcm9wZXJ0eSUyMHJlbnRhbCUyMHdlYiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDUztBQUN0RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb3BlcnR5LXJlbnRhbC13ZWIvPzZjODUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiRjpcXFxccHJvcGVydHkgcmVudGFsIHdlYlxcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXGxvZ2luXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZG1pbi9sb2dpbi9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FkbWluL2xvZ2luXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hZG1pbi9sb2dpbi9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkY6XFxcXHByb3BlcnR5IHJlbnRhbCB3ZWJcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxsb2dpblxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYWRtaW4vbG9naW4vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Flogin%2Froute&page=%2Fapi%2Fadmin%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Flogin%2Froute.ts&appDir=F%3A%5Cproperty%20rental%20web%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cproperty%20rental%20web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/admin/login/route.ts":
/*!**************************************!*\
  !*** ./app/api/admin/login/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _lib_models_AdminUser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/models/AdminUser */ \"(rsc)/./lib/models/AdminUser.ts\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\n\n\nasync function POST(request) {\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n        const { username, password } = await request.json();\n        if (!username || !password) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                error: \"Username and password required\"\n            }, {\n                status: 400\n            });\n        }\n        const admin = await _lib_models_AdminUser__WEBPACK_IMPORTED_MODULE_2__[\"default\"].findOne({\n            username\n        });\n        if (!admin) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                error: \"Invalid credentials\"\n            }, {\n                status: 401\n            });\n        }\n        const isValid = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_3__.verifyPassword)(password, admin.passwordHash);\n        if (!isValid) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                error: \"Invalid credentials\"\n            }, {\n                status: 401\n            });\n        }\n        const token = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_3__.signAdminToken)({\n            id: admin._id.toString(),\n            username: admin.username\n        });\n        const response = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: \"Login successful\"\n        });\n        response.cookies.set(_lib_auth__WEBPACK_IMPORTED_MODULE_3__.COOKIE_NAME, token, {\n            httpOnly: true,\n            secure: \"development\" === \"production\",\n            sameSite: \"lax\",\n            maxAge: 60 * 60 * 8,\n            path: \"/\"\n        });\n        return response;\n    } catch  {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: \"Login failed\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL2xvZ2luL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXdEO0FBQ2xCO0FBQ1M7QUFDMEI7QUFFbEUsZUFBZU0sS0FBS0MsT0FBb0I7SUFDN0MsSUFBSTtRQUNGLE1BQU1OLHdEQUFTQTtRQUNmLE1BQU0sRUFBRU8sUUFBUSxFQUFFQyxRQUFRLEVBQUUsR0FBRyxNQUFNRixRQUFRRyxJQUFJO1FBRWpELElBQUksQ0FBQ0YsWUFBWSxDQUFDQyxVQUFVO1lBQzFCLE9BQU9ULHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7Z0JBQUVDLFNBQVM7Z0JBQU9DLE9BQU87WUFBaUMsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3RHO1FBRUEsTUFBTUMsUUFBUSxNQUFNWiw2REFBU0EsQ0FBQ2EsT0FBTyxDQUFDO1lBQUVQO1FBQVM7UUFDakQsSUFBSSxDQUFDTSxPQUFPO1lBQ1YsT0FBT2QscURBQVlBLENBQUNVLElBQUksQ0FBQztnQkFBRUMsU0FBUztnQkFBT0MsT0FBTztZQUFzQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDM0Y7UUFFQSxNQUFNRyxVQUFVLE1BQU1iLHlEQUFjQSxDQUFDTSxVQUFVSyxNQUFNRyxZQUFZO1FBQ2pFLElBQUksQ0FBQ0QsU0FBUztZQUNaLE9BQU9oQixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO2dCQUFFQyxTQUFTO2dCQUFPQyxPQUFPO1lBQXNCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUMzRjtRQUVBLE1BQU1LLFFBQVFkLHlEQUFjQSxDQUFDO1lBQUVlLElBQUlMLE1BQU1NLEdBQUcsQ0FBQ0MsUUFBUTtZQUFJYixVQUFVTSxNQUFNTixRQUFRO1FBQUM7UUFFbEYsTUFBTWMsV0FBV3RCLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRUMsU0FBUztZQUFNWSxTQUFTO1FBQW1CO1FBQ2hGRCxTQUFTRSxPQUFPLENBQUNDLEdBQUcsQ0FBQ3BCLGtEQUFXQSxFQUFFYSxPQUFPO1lBQ3ZDUSxVQUFVO1lBQ1ZDLFFBQVFDLGtCQUF5QjtZQUNqQ0MsVUFBVTtZQUNWQyxRQUFRLEtBQUssS0FBSztZQUNsQkMsTUFBTTtRQUNSO1FBRUEsT0FBT1Q7SUFDVCxFQUFFLE9BQU07UUFDTixPQUFPdEIscURBQVlBLENBQUNVLElBQUksQ0FBQztZQUFFQyxTQUFTO1lBQU9DLE9BQU87UUFBZSxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNwRjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvcGVydHktcmVudGFsLXdlYi8uL2FwcC9hcGkvYWRtaW4vbG9naW4vcm91dGUudHM/ZjQ0YSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IGRiQ29ubmVjdCBmcm9tICdAL2xpYi9tb25nb2RiJztcbmltcG9ydCBBZG1pblVzZXIgZnJvbSAnQC9saWIvbW9kZWxzL0FkbWluVXNlcic7XG5pbXBvcnQgeyB2ZXJpZnlQYXNzd29yZCwgc2lnbkFkbWluVG9rZW4sIENPT0tJRV9OQU1FIH0gZnJvbSAnQC9saWIvYXV0aCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgYXdhaXQgZGJDb25uZWN0KCk7XG4gICAgY29uc3QgeyB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuXG4gICAgaWYgKCF1c2VybmFtZSB8fCAhcGFzc3dvcmQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1VzZXJuYW1lIGFuZCBwYXNzd29yZCByZXF1aXJlZCcgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBhZG1pbiA9IGF3YWl0IEFkbWluVXNlci5maW5kT25lKHsgdXNlcm5hbWUgfSk7XG4gICAgaWYgKCFhZG1pbikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnSW52YWxpZCBjcmVkZW50aWFscycgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBpc1ZhbGlkID0gYXdhaXQgdmVyaWZ5UGFzc3dvcmQocGFzc3dvcmQsIGFkbWluLnBhc3N3b3JkSGFzaCk7XG4gICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdJbnZhbGlkIGNyZWRlbnRpYWxzJyB9LCB7IHN0YXR1czogNDAxIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHRva2VuID0gc2lnbkFkbWluVG9rZW4oeyBpZDogYWRtaW4uX2lkLnRvU3RyaW5nKCksIHVzZXJuYW1lOiBhZG1pbi51c2VybmFtZSB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiAnTG9naW4gc3VjY2Vzc2Z1bCcgfSk7XG4gICAgcmVzcG9uc2UuY29va2llcy5zZXQoQ09PS0lFX05BTUUsIHRva2VuLCB7XG4gICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyxcbiAgICAgIHNhbWVTaXRlOiAnbGF4JyxcbiAgICAgIG1heEFnZTogNjAgKiA2MCAqIDgsIC8vIDggaG91cnNcbiAgICAgIHBhdGg6ICcvJyxcbiAgICB9KTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTG9naW4gZmFpbGVkJyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZGJDb25uZWN0IiwiQWRtaW5Vc2VyIiwidmVyaWZ5UGFzc3dvcmQiLCJzaWduQWRtaW5Ub2tlbiIsIkNPT0tJRV9OQU1FIiwiUE9TVCIsInJlcXVlc3QiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwianNvbiIsInN1Y2Nlc3MiLCJlcnJvciIsInN0YXR1cyIsImFkbWluIiwiZmluZE9uZSIsImlzVmFsaWQiLCJwYXNzd29yZEhhc2giLCJ0b2tlbiIsImlkIiwiX2lkIiwidG9TdHJpbmciLCJyZXNwb25zZSIsIm1lc3NhZ2UiLCJjb29raWVzIiwic2V0IiwiaHR0cE9ubHkiLCJzZWN1cmUiLCJwcm9jZXNzIiwic2FtZVNpdGUiLCJtYXhBZ2UiLCJwYXRoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/login/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   COOKIE_NAME: () => (/* binding */ COOKIE_NAME),\n/* harmony export */   getAdminSession: () => (/* binding */ getAdminSession),\n/* harmony export */   hashPassword: () => (/* binding */ hashPassword),\n/* harmony export */   signAdminToken: () => (/* binding */ signAdminToken),\n/* harmony export */   verifyAdminToken: () => (/* binding */ verifyAdminToken),\n/* harmony export */   verifyPassword: () => (/* binding */ verifyPassword)\n/* harmony export */ });\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\n\nconst JWT_SECRET = process.env.JWT_SECRET;\nconst COOKIE_NAME = \"lankarent_admin_token\";\nasync function hashPassword(password) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_0___default().hash(password, 12);\n}\nasync function verifyPassword(password, hash) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_0___default().compare(password, hash);\n}\nfunction signAdminToken(payload) {\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign(payload, JWT_SECRET, {\n        expiresIn: \"8h\"\n    });\n}\nfunction verifyAdminToken(token) {\n    try {\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().verify(token, JWT_SECRET);\n    } catch  {\n        return null;\n    }\n}\nfunction getAdminSession() {\n    const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_2__.cookies)();\n    const token = cookieStore.get(COOKIE_NAME)?.value;\n    if (!token) return null;\n    return verifyAdminToken(token);\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUNDO0FBQ1E7QUFFdkMsTUFBTUcsYUFBYUMsUUFBUUMsR0FBRyxDQUFDRixVQUFVO0FBQ3pDLE1BQU1HLGNBQWM7QUFFYixlQUFlQyxhQUFhQyxRQUFnQjtJQUNqRCxPQUFPUixvREFBVyxDQUFDUSxVQUFVO0FBQy9CO0FBRU8sZUFBZUUsZUFBZUYsUUFBZ0IsRUFBRUMsSUFBWTtJQUNqRSxPQUFPVCx1REFBYyxDQUFDUSxVQUFVQztBQUNsQztBQUVPLFNBQVNHLGVBQWVDLE9BQXlDO0lBQ3RFLE9BQU9aLHdEQUFRLENBQUNZLFNBQVNWLFlBQVk7UUFBRVksV0FBVztJQUFLO0FBQ3pEO0FBRU8sU0FBU0MsaUJBQWlCQyxLQUFhO0lBQzVDLElBQUk7UUFDRixPQUFPaEIsMERBQVUsQ0FBQ2dCLE9BQU9kO0lBQzNCLEVBQUUsT0FBTTtRQUNOLE9BQU87SUFDVDtBQUNGO0FBRU8sU0FBU2dCO0lBQ2QsTUFBTUMsY0FBY2xCLHFEQUFPQTtJQUMzQixNQUFNZSxRQUFRRyxZQUFZQyxHQUFHLENBQUNmLGNBQWNnQjtJQUM1QyxJQUFJLENBQUNMLE9BQU8sT0FBTztJQUNuQixPQUFPRCxpQkFBaUJDO0FBQzFCO0FBRXVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvcGVydHktcmVudGFsLXdlYi8uL2xpYi9hdXRoLnRzP2JmN2UiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSAnbmV4dC9oZWFkZXJzJztcblxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQhO1xuY29uc3QgQ09PS0lFX05BTUUgPSAnbGFua2FyZW50X2FkbWluX3Rva2VuJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhc2hQYXNzd29yZChwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIGJjcnlwdC5oYXNoKHBhc3N3b3JkLCAxMik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlQYXNzd29yZChwYXNzd29yZDogc3RyaW5nLCBoYXNoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCBoYXNoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNpZ25BZG1pblRva2VuKHBheWxvYWQ6IHsgaWQ6IHN0cmluZzsgdXNlcm5hbWU6IHN0cmluZyB9KTogc3RyaW5nIHtcbiAgcmV0dXJuIGp3dC5zaWduKHBheWxvYWQsIEpXVF9TRUNSRVQsIHsgZXhwaXJlc0luOiAnOGgnIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5QWRtaW5Ub2tlbih0b2tlbjogc3RyaW5nKTogeyBpZDogc3RyaW5nOyB1c2VybmFtZTogc3RyaW5nIH0gfCBudWxsIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gand0LnZlcmlmeSh0b2tlbiwgSldUX1NFQ1JFVCkgYXMgeyBpZDogc3RyaW5nOyB1c2VybmFtZTogc3RyaW5nIH07XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBZG1pblNlc3Npb24oKTogeyBpZDogc3RyaW5nOyB1c2VybmFtZTogc3RyaW5nIH0gfCBudWxsIHtcbiAgY29uc3QgY29va2llU3RvcmUgPSBjb29raWVzKCk7XG4gIGNvbnN0IHRva2VuID0gY29va2llU3RvcmUuZ2V0KENPT0tJRV9OQU1FKT8udmFsdWU7XG4gIGlmICghdG9rZW4pIHJldHVybiBudWxsO1xuICByZXR1cm4gdmVyaWZ5QWRtaW5Ub2tlbih0b2tlbik7XG59XG5cbmV4cG9ydCB7IENPT0tJRV9OQU1FIH07XG4iXSwibmFtZXMiOlsiYmNyeXB0Iiwiand0IiwiY29va2llcyIsIkpXVF9TRUNSRVQiLCJwcm9jZXNzIiwiZW52IiwiQ09PS0lFX05BTUUiLCJoYXNoUGFzc3dvcmQiLCJwYXNzd29yZCIsImhhc2giLCJ2ZXJpZnlQYXNzd29yZCIsImNvbXBhcmUiLCJzaWduQWRtaW5Ub2tlbiIsInBheWxvYWQiLCJzaWduIiwiZXhwaXJlc0luIiwidmVyaWZ5QWRtaW5Ub2tlbiIsInRva2VuIiwidmVyaWZ5IiwiZ2V0QWRtaW5TZXNzaW9uIiwiY29va2llU3RvcmUiLCJnZXQiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/models/AdminUser.ts":
/*!*********************************!*\
  !*** ./lib/models/AdminUser.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst AdminUserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    username: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    passwordHash: {\n        type: String,\n        required: true\n    }\n}, {\n    timestamps: true\n});\nconst AdminUser = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).AdminUser || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"AdminUser\", AdminUserSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdminUser);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9kZWxzL0FkbWluVXNlci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNkQ7QUFRN0QsTUFBTUUsa0JBQTBCLElBQUlELDRDQUFNQSxDQUN4QztJQUNFRSxVQUFjO1FBQUVDLE1BQU1DO1FBQVFDLFVBQVU7UUFBTUMsUUFBUTtJQUFLO0lBQzNEQyxjQUFjO1FBQUVKLE1BQU1DO1FBQVFDLFVBQVU7SUFBSztBQUMvQyxHQUNBO0lBQUVHLFlBQVk7QUFBSztBQUdyQixNQUFNQyxZQUNKVix3REFBZSxDQUFDVSxTQUFTLElBQUlWLHFEQUFjLENBQWEsYUFBYUU7QUFFdkUsaUVBQWVRLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9wZXJ0eS1yZW50YWwtd2ViLy4vbGliL21vZGVscy9BZG1pblVzZXIudHM/MmRmYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UsIHsgU2NoZW1hLCBEb2N1bWVudCwgTW9kZWwgfSBmcm9tICdtb25nb29zZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFkbWluVXNlciBleHRlbmRzIERvY3VtZW50IHtcbiAgdXNlcm5hbWU6IHN0cmluZztcbiAgcGFzc3dvcmRIYXNoOiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogRGF0ZTtcbn1cblxuY29uc3QgQWRtaW5Vc2VyU2NoZW1hOiBTY2hlbWEgPSBuZXcgU2NoZW1hKFxuICB7XG4gICAgdXNlcm5hbWU6ICAgICB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSB9LFxuICAgIHBhc3N3b3JkSGFzaDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gIH0sXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XG4pO1xuXG5jb25zdCBBZG1pblVzZXI6IE1vZGVsPElBZG1pblVzZXI+ID1cbiAgbW9uZ29vc2UubW9kZWxzLkFkbWluVXNlciB8fCBtb25nb29zZS5tb2RlbDxJQWRtaW5Vc2VyPignQWRtaW5Vc2VyJywgQWRtaW5Vc2VyU2NoZW1hKTtcblxuZXhwb3J0IGRlZmF1bHQgQWRtaW5Vc2VyO1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiU2NoZW1hIiwiQWRtaW5Vc2VyU2NoZW1hIiwidXNlcm5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJ1bmlxdWUiLCJwYXNzd29yZEhhc2giLCJ0aW1lc3RhbXBzIiwiQWRtaW5Vc2VyIiwibW9kZWxzIiwibW9kZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/models/AdminUser.ts\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/jws","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/bcryptjs","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/lodash.once","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isinteger","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.includes","vendor-chunks/jwa","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Flogin%2Froute&page=%2Fapi%2Fadmin%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Flogin%2Froute.ts&appDir=F%3A%5Cproperty%20rental%20web%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cproperty%20rental%20web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();