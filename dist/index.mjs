/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./src/contextMenu.js":
/*!****************************!*\
  !*** ./src/contextMenu.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ContextMenu: () => (/* binding */ ContextMenu)\n/* harmony export */ });\nclass ContextMenu {\r\n    constructor(elements, parent = null) {\r\n        this.generateHtml(elements);\r\n        this.bindGlobalEvents();\r\n        this.subMenu = null;\r\n    }\r\n\r\n    generateHtml(elements) {\r\n        this.html = document.create('ul.contextMenu');\r\n        for (const element of elements) {\r\n            this.html.append(this.generateElementHtml(element));\r\n        }\r\n        this.html.onmousedown = e => e.stopPropagation();\r\n    }\r\n\r\n    generateElementHtml(element) {\r\n        const elementHtml = document.create('li.element', {tabIndex: 0});\r\n        if (element.submenu) {\r\n            elementHtml.classList.add('hasSubmenu');\r\n        }\r\n        if (element.icon)\r\n            elementHtml.addChild('span.icon', {className: element.icon});\r\n        else\r\n            elementHtml.addChild('span.iconPlaceholder');\r\n\r\n        elementHtml.addChild('span.content', {text: element.text || ''});\r\n        if (element.onclick) {\r\n            elementHtml.onclick = e => {\r\n                element.onclick.call(elementHtml, e);\r\n                this.destroy()\r\n            };\r\n            elementHtml.onkeydown = e => {\r\n                if (e.key == 'Enter') {\r\n                    element.onclick.call(elementHtml, e);\r\n                    this.destroy()\r\n                } else if (e.key == 'ArrowDown') {\r\n                    (elementHtml.nextElementSibling ?? elementHtml.parentNode.firstElementChild).focus();\r\n                } else if (e.key == 'ArrowUp') {\r\n                    (elementHtml.previousElementSibling ?? elementHtml.parentNode.lastElementChild).focus();\r\n                }\r\n            };\r\n        }\r\n        elementHtml.onmouseenter = e => {\r\n            elementHtml.focus();\r\n            if (this.submenu) {\r\n                this.submenu.destroy();\r\n                this.submenu = null;\r\n            }\r\n            if (element.submenu) {\r\n                this.submenu = new ContextMenu(element.submenu);\r\n                document.body.appendChild(this.submenu.html);\r\n                this.submenu.setPositionToParent(elementHtml);\r\n            }\r\n        };\r\n        return elementHtml;\r\n    }\r\n\r\n    bindGlobalEvents() {\r\n        this.bindedDestroyEvent = this.destroy.bind(this);\r\n        addEventListener('mousedown', this.bindedDestroyEvent);\r\n        addEventListener('blur', this.bindedDestroyEvent);\r\n    }\r\n\r\n    setPositionToPointer(event) {\r\n        const placeHorizontal = innerWidth - event.clientX;\r\n        const placeVertical = innerHeight - event.clientY;\r\n        const isRight = this.html.offsetWidth <= placeHorizontal;\r\n        const isBottom = this.html.offsetHeight <= placeVertical;\r\n\r\n        this.html.style.left = 'auto';\r\n        this.html.style.right = 'auto';\r\n        this.html.style.top = 'auto';\r\n        this.html.style.bottom = 'auto';\r\n\r\n        if (isRight)\r\n            this.html.style.left = `${event.clientX}px`;\r\n        else\r\n            this.html.style.right = `${Math.min(innerWidth - event.clientX + 1, innerWidth - this.html.offsetWidth)}px`;\r\n\r\n        if (isBottom)\r\n            this.html.style.top = `${event.clientY}px`;\r\n        else\r\n            this.html.style.bottom = `${Math.min(innerHeight - event.clientY + 1, innerHeight - this.html.offsetHeight)}px`;\r\n    }\r\n\r\n    setPositionToParent(parent) {\r\n        const parentBoundingBox = parent.getBoundingClientRect();\r\n        const placeRight = innerWidth - parentBoundingBox.right;\r\n        const placeLeft = parentBoundingBox.left;\r\n        const placeBottom = innerHeight - parentBoundingBox.top;\r\n        const isRight = this.html.offsetWidth <= placeRight;\r\n        const isBottom = this.html.offsetHeight <= placeBottom;\r\n\r\n        this.html.style.left = 'auto';\r\n        this.html.style.right = 'auto';\r\n        this.html.style.top = 'auto';\r\n        this.html.style.bottom = 'auto';\r\n\r\n        if (isRight)\r\n            this.html.style.left = `${parentBoundingBox.right}px`;\r\n        else\r\n            this.html.style.right = `${Math.min(innerWidth - parentBoundingBox.left, innerWidth - this.html.offsetWidth)}px`;\r\n\r\n        if (isBottom)\r\n            this.html.style.top = `${parentBoundingBox.top}px`;\r\n        else\r\n            this.html.style.bottom = `${Math.min(innerHeight - parentBoundingBox.bottom, innerHeight - this.html.offsetHeight)}px`;\r\n    }\r\n\r\n    destroy() {\r\n        this.html.remove();\r\n        removeEventListener('mousedown', this.bindedDestroyEvent);\r\n        removeEventListener('blur', this.bindedDestroyEvent);\r\n    }\r\n\r\n    static openContextMenu(event, elements) {\r\n        const menu = new ContextMenu(elements);\r\n        document.body.appendChild(menu.html);\r\n        menu.setPositionToPointer(event);\r\n        event.preventDefault();\r\n        if (menu.html.firstChild)\r\n            menu.html.firstChild.focus();\r\n\r\n        return menu;\r\n    }\r\n}\n\n//# sourceURL=webpack://@green-code-studio/context-menu/./src/contextMenu.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ContextMenu: () => (/* reexport safe */ _contextMenu_js__WEBPACK_IMPORTED_MODULE_0__.ContextMenu)\n/* harmony export */ });\n/* harmony import */ var _contextMenu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contextMenu.js */ \"./src/contextMenu.js\");\n\r\n\n\n//# sourceURL=webpack://@green-code-studio/context-menu/./src/index.js?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ var __webpack_exports__ContextMenu = __webpack_exports__.ContextMenu;
/******/ export { __webpack_exports__ContextMenu as ContextMenu };
/******/ 
