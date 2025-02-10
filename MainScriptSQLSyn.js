// ==UserScript==
// @name         SQL Syntax Toolbar
// @namespace    http://tampermonkey.net/
// @version      0.101
// @description  Explore SQL syntax examples with a dynamic overlay
// @author       Ryan Satterfield
// @match        *://*/*
// @grant        none
// @require      https://raw.githubusercontent.com/RynAgain/SQLmonkey/refs/heads/main/overlay.js?token=GHSAT0AAAAAAC5MJZOYQMKGJNVEP6XTBOXEZ5JLUHQ
// @require      https://raw.githubusercontent.com/RynAgain/SQLmonkey/refs/heads/main/toolbarButton.js?token=GHSAT0AAAAAAC5MJZOY6WZL2RDVA5A5IYS4Z5JLVCQ

// @updateURL    https://raw.githubusercontent.com/RynAgain/SQLmonkey/refs/heads/main/MainScriptSQLSyn.js?token=GHSAT0AAAAAAC5MJZOZAXN3Z2KZBECF4ZHWZ5JLWIA
// ==/UserScript==

(function() {
    'use strict';
    // Initialize the toolbar button; this will be defined in toolbarButton.js
    initToolbarButton();
})();
