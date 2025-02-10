(function() {
    var overlay;
    var baseURL = "https://raw.githubusercontent.com/RynAgain/SQLmonkey/refs/heads/main/tabs/";

    // Function to load external script if not already loaded
    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }

    // Function to load external CSS
    function loadCSS(url) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        document.head.appendChild(link);
    }

    // Check and load Highlight.js if not present
    if (!window.hljs) {
        loadCSS("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/dark.min.css");
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js", function() {
            if (overlay && overlay.style.display === "block") {
                hljs.highlightAll();
            }
        });
    }

    // Wrap GM_xmlhttpRequest in a promise to load a tab file's content
    function loadTabContent(fileName) {
        return new Promise(function(resolve, reject) {
            if (typeof GM_xmlhttpRequest !== "undefined") {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: baseURL + fileName,
                    onload: function(response) {
                        resolve(response.responseText);
                    },
                    onerror: function(err) {
                        reject(err);
                    }
                });
            } else {
                // Fallback using fetch if GM_xmlhttpRequest is not available
                fetch(baseURL + fileName)
                    .then(response => response.text())
                    .then(text => resolve(text))
                    .catch(err => reject(err));
            }
        });
    }

    function createOverlay() {
        overlay = document.createElement("div");
        overlay.id = "sql-syntax-overlay";
        // Accessibility: set role and aria attributes for dialog
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-label", "SQL Syntax Explorer");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        overlay.style.color = "#fff";
        overlay.style.zIndex = "999";
        overlay.style.display = "none";
        overlay.style.overflowY = "auto";
        overlay.style.padding = "20px";

        // Create container for SQL explorer content
        var contentContainer = document.createElement("div");
        contentContainer.id = "sql-explorer-container";
        // Accessibility: role "document"
        contentContainer.setAttribute("role", "document");
        contentContainer.style.maxWidth = "800px";
        contentContainer.style.margin = "50px auto";
        contentContainer.style.backgroundColor = "#222";
        contentContainer.style.padding = "20px";
        contentContainer.style.borderRadius = "8px";

        // Load tab contents asynchronously from GitHub
        Promise.all([
            loadTabContent("syntaxTab.html"),
            loadTabContent("vocabTab.html"),
            loadTabContent("snippetsTab.html"),
            loadTabContent("settingsTab.html")
        ]).then(function(contents) {
            var syntaxContent = contents[0];
            var vocabContent = contents[1];
            var snippetsContent = contents[2];
            var settingsContent = contents[3];

            // Header with search field (with Clear button) and tab navigation.
            var headerHTML = "<h1>Snowflake SQL Explorer</h1>" +
                             "<p>Select a tab to view SQL syntax, common vocabulary, code snippets, or settings.</p>" +
                             "<div style='display:flex; align-items:center; margin-bottom:20px;'>" +
                             "  <input type='text' id='syntax-search' aria-label='Search SQL content' placeholder='Search...' style='flex:1; padding:10px; border-radius:4px; border:1px solid #555; color: #000;'>" +
                             "  <button id='clear-search' style='margin-left:5px; padding:10px; border:none; border-radius:4px; background-color:#ccc; cursor:pointer;'>Clear</button>" +
                             "</div>" +
                             "<div id='tab-nav' role='tablist' style='margin-bottom:20px;'>" +
                             "  <button class='tab-btn active' data-tab='syntax' role='tab' aria-selected='true' style='padding:8px 12px; margin-right:5px; cursor:pointer; border:none; border-radius:4px; background-color:#007BFF; color:#fff;'>Syntax</button>" +
                             "  <button class='tab-btn' data-tab='vocab' role='tab' aria-selected='false' style='padding:8px 12px; margin-right:5px; cursor:pointer; border:none; border-radius:4px; background-color:#555; color:#fff;'>Vocabulary</button>" +
                             "  <button class='tab-btn' data-tab='snippets' role='tab' aria-selected='false' style='padding:8px 12px; margin-right:5px; cursor:pointer; border:none; border-radius:4px; background-color:#555; color:#fff;'>Snippets</button>" +
                             "  <button class='tab-btn' data-tab='settings' role='tab' aria-selected='false' style='padding:8px 12px; cursor:pointer; border:none; border-radius:4px; background-color:#555; color:#fff;'>Settings</button>" +
                             "</div>";

            // Build Tabs container using the loaded content
            var tabsContainer = "<div id='tabs-container'>" +
                                "  <div id='syntax-tab' class='tab-content active' role='tabpanel'>" + syntaxContent + "</div>" +
                                "  <div id='vocab-tab' class='tab-content' style='display:none;' role='tabpanel'>" + vocabContent + "</div>" +
                                "  <div id='snippets-tab' class='tab-content' style='display:none;' role='tabpanel'>" + snippetsContent + "</div>" +
                                "  <div id='settings-tab' class='tab-content' style='display:none;' role='tabpanel'>" + settingsContent + "</div>" +
                                "</div>";

            var fullHTML = headerHTML + tabsContainer;
            contentContainer.innerHTML = fullHTML;

            // Tab switching functionality
            var navButtons = contentContainer.querySelectorAll('#tab-nav button');
            navButtons.forEach(function(btn) {
                btn.addEventListener("click", function() {
                    navButtons.forEach(function(b) {
                        b.classList.remove("active");
                        b.style.backgroundColor = "#555";
                        b.setAttribute("aria-selected", "false");
                    });
                    contentContainer.querySelectorAll(".tab-content").forEach(function(tc) {
                        tc.style.display = "none";
                        tc.classList.remove("active");
                    });
                    btn.classList.add("active");
                    btn.style.backgroundColor = "#007BFF";
                    btn.setAttribute("aria-selected", "true");
                    var tabName = btn.getAttribute("data-tab");
                    var tabContent = contentContainer.querySelector("#" + tabName + "-tab");
                    if (tabContent) {
                        tabContent.style.display = "block";
                        tabContent.classList.add("active");
                    }
                });
            });

            // Apply theme settings in Settings tab
            var applyThemeBtn = contentContainer.querySelector("#apply-theme");
            if (applyThemeBtn) {
                applyThemeBtn.addEventListener("click", function() {
                    var theme = contentContainer.querySelector('input[name="theme"]:checked').value;
                    if (theme === "light") {
                        contentContainer.style.backgroundColor = "#f5f5f5";
                        contentContainer.style.color = "#000";
                    } else {
                        contentContainer.style.backgroundColor = "#222";
                        contentContainer.style.color = "#fff";
                    }
                });
            }

            // Initialize Snippets Tab
            function initSnippetsTab() {
                var addSnippetBtn = contentContainer.querySelector("#add-snippet");
                var snippetTitleInput = contentContainer.querySelector("#snippet-title");
                var snippetCodeInput = contentContainer.querySelector("#snippet-code");
                var snippetsListDiv = contentContainer.querySelector("#snippets-list");

                function renderSnippets() {
                    var snippets = JSON.parse(localStorage.getItem("sqlSnippets") || "[]");
                    if (snippets.length === 0) {
                        snippetsListDiv.innerHTML = "<p>No snippets stored yet.</p>";
                    } else {
                        snippetsListDiv.innerHTML = "";
                        snippets.forEach(function(snippet, index) {
                            var snippetDiv = document.createElement("div");
                            snippetDiv.style.marginBottom = "15px";
                            snippetDiv.innerHTML = "<strong>" + snippet.title + "</strong><pre><code class='sql'>" + snippet.code + "</code></pre>";
                            snippetsListDiv.appendChild(snippetDiv);
                        });
                        if (window.hljs) {
                            hljs.highlightAll();
                        }
                    }
                }

                addSnippetBtn.addEventListener("click", function() {
                    var title = snippetTitleInput.value.trim();
                    var code = snippetCodeInput.value.trim();
                    if (title === "" || code === "") {
                        alert("Please provide both a title and code for the snippet.");
                        return;
                    }
                    var snippets = JSON.parse(localStorage.getItem("sqlSnippets") || "[]");
                    snippets.push({ title: title, code: code });
                    localStorage.setItem("sqlSnippets", JSON.stringify(snippets));
                    snippetTitleInput.value = "";
                    snippetCodeInput.value = "";
                    renderSnippets();
                });

                renderSnippets();
            }
            initSnippetsTab();

            // Event listener for Clear Search button
            var clearSearchBtn = contentContainer.querySelector("#clear-search");
            var searchInput = contentContainer.querySelector("#syntax-search");
            if (clearSearchBtn && searchInput) {
                clearSearchBtn.addEventListener("click", function() {
                    searchInput.value = "";
                    var event = new Event("input");
                    searchInput.dispatchEvent(event);
                });
            }

            // Filtering functionality for search input
            if (searchInput) {
                searchInput.addEventListener("input", function() {
                    var filter = searchInput.value.toLowerCase();
                    var activeTab = contentContainer.querySelector(".tab-content.active");
                    if (activeTab) {
                        var entries = activeTab.getElementsByTagName("div");
                        Array.from(entries).forEach(function(entry) {
                            if (entry.textContent.toLowerCase().indexOf(filter) > -1) {
                                entry.style.display = "";
                            } else {
                                entry.style.display = "none";
                            }
                        });
                    }
                });
            }
        }).catch(function(err) {
            console.error("Error loading tab contents:", err);
        });

        overlay.appendChild(contentContainer);

        // Clicking outside the container closes the overlay
        overlay.addEventListener("click", function(e) {
            if (e.target === overlay) {
                toggleOverlay();
            }
        });

        document.body.appendChild(overlay);

        if (window.hljs) {
            hljs.highlightAll();
        }
    }

    function toggleOverlay() {
        if (!overlay) {
            createOverlay();
        }
        overlay.style.display = (overlay.style.display === "none" || overlay.style.display === "") ? "block" : "none";
        if (overlay.style.display === "block") {
            var input = overlay.querySelector("#syntax-search");
            if (input) {
                input.focus();
            }
            if (window.hljs) {
                hljs.highlightAll();
            }
        }
    }

    window.toggleOverlay = toggleOverlay;
})();
