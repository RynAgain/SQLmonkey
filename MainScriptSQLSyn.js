// ==UserScript==
// @name         SQL Syntax Toolbar
// @namespace    http://tampermonkey.net/
// @version      0.102
// @description  Explore SQL syntax examples with a dynamic overlay
// @author       Ryan Satterfield
// @match        *://*/*
// @grant        none
// @require      https://raw.githubusercontent.com/RynAgain/SQLmonkey/refs/heads/main/overlay.jsHQ
// @require      https://raw.githubusercontent.com/RynAgain/SQLmonkey/refs/heads/main/toolbarButton.js

// @updateURL    https://raw.githubusercontent.com/RynAgain/SQLmonkey/refs/heads/main/MainScriptSQLSyn.js
// @downloadURL  https://raw.githubusercontent.com/RynAgain/SQLmonkey/refs/heads/main/MainScriptSQLSyn.js

// ==/UserScript==

(function() {
    'use strict';
    // Initialize the toolbar button; this will be defined in toolbarButton.js
    initToolbarButton();
})();
