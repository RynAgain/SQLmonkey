(function() {
    var overlay;

    // Function to load external script if not already loaded
    function loadScript(url, callback) {
        var script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }

    // Function to load external CSS
    function loadCSS(url) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }

    // Check and load Highlight.js if not present
    if (!window.hljs) {
        loadCSS("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/dark.min.css");
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js", function() {
            if(overlay && overlay.style.display === 'block'){
                hljs.highlightAll();
            }
        });
    }

    function createOverlay() {
        overlay = document.createElement('div');
        overlay.id = 'sql-syntax-overlay';
        // Accessibility: set role and aria attributes for dialog
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-label", "SQL Syntax Explorer");
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.color = '#fff';
        overlay.style.zIndex = '999';
        overlay.style.display = 'none';
        overlay.style.overflowY = 'auto';
        overlay.style.padding = '20px';
        
        // Create container for SQL explorer content
        var contentContainer = document.createElement('div');
        contentContainer.id = "sql-explorer-container";
        // Accessibility: role "document"
        contentContainer.setAttribute("role", "document");
        contentContainer.style.maxWidth = '800px';
        contentContainer.style.margin = '50px auto';
        contentContainer.style.backgroundColor = '#222';
        contentContainer.style.padding = '20px';
        contentContainer.style.borderRadius = '8px';
        
        // Header with search field and tab navigation (Syntax, Vocabulary, Snippets, Settings)
        // Added a "Clear" button next to the search input and forced text color in the input.
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
        
        // Syntax Tab content (SQL syntax examples)
        var syntaxEntries = "";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>SELECT Statement</h2>" +
                         "<p>Retrieves data from one or more tables.</p>" +
                         "<pre><code class='sql'>SELECT column1, column2 FROM my_table WHERE condition;</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>CREATE TABLE</h2>" +
                         "<p>Creates a new table in the database.</p>" +
                         "<pre><code class='sql'>CREATE TABLE my_table (" +
                         "\n    id INT AUTOINCREMENT," +
                         "\n    name STRING," +
                         "\n    created_at TIMESTAMP_LTZ DEFAULT CURRENT_TIMESTAMP" +
                         "\n);</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>CREATE OR REPLACE TABLE</h2>" +
                         "<p>Creates a new table or replaces an existing one.</p>" +
                         "<pre><code class='sql'>CREATE OR REPLACE TABLE my_table (" +
                         "\n    id INT," +
                         "\n    name STRING" +
                         "\n);</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>ALTER TABLE</h2>" +
                         "<p>Modifies an existing table structure.</p>" +
                         "<pre><code class='sql'>ALTER TABLE my_table ADD COLUMN email STRING;</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>DROP TABLE</h2>" +
                         "<p>Drops an existing table if it exists.</p>" +
                         "<pre><code class='sql'>DROP TABLE IF EXISTS my_table;</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>UPDATE Statement</h2>" +
                         "<p>Updates rows in a table.</p>" +
                         "<pre><code class='sql'>UPDATE my_table SET column = new_value WHERE condition;</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>DELETE Statement</h2>" +
                         "<p>Deletes rows from a table based on a condition.</p>" +
                         "<pre><code class='sql'>DELETE FROM my_table WHERE condition;</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>MERGE Statement</h2>" +
                         "<p>Merges data from a source table into a target table.</p>" +
                         "<pre><code class='sql'>MERGE INTO target_table USING source_table " +
                         "\nON target_table.id = source_table.id " +
                         "\nWHEN MATCHED THEN UPDATE SET target_table.value = source_table.value " +
                         "\nWHEN NOT MATCHED THEN INSERT (id, value) VALUES (source_table.id, source_table.value);</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>COPY INTO Command</h2>" +
                         "<p>Loads data into a table from an external source.</p>" +
                         "<pre><code class='sql'>COPY INTO my_table " +
                         "\nFROM @my_stage/file.csv " +
                         "\nFILE_FORMAT = (TYPE = 'CSV', FIELD_OPTIONALLY_ENCLOSED_BY='\"');</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>INSERT Statement</h2>" +
                         "<p>Adds new rows into a table.</p>" +
                         "<pre><code class='sql'>INSERT INTO my_table (id, name) VALUES (1, 'John Doe');</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>USE WAREHOUSE</h2>" +
                         "<p>Sets the virtual warehouse for executing queries.</p>" +
                         "<pre><code class='sql'>USE WAREHOUSE my_warehouse;</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>ALTER WAREHOUSE</h2>" +
                         "<p>Adjusts warehouse properties.</p>" +
                         "<pre><code class='sql'>ALTER WAREHOUSE my_warehouse SET WAREHOUSE_SIZE = 'LARGE';</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>USE DATABASE</h2>" +
                         "<p>Selects the database for the session.</p>" +
                         "<pre><code class='sql'>USE DATABASE my_database;</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>SHOW TABLES</h2>" +
                         "<p>Displays all tables in the current database.</p>" +
                         "<pre><code class='sql'>SHOW TABLES;</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>DESC TABLE</h2>" +
                         "<p>Describes the structure of a table.</p>" +
                         "<pre><code class='sql'>DESC TABLE my_table;</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>BETWEEN Expression</h2>" +
                         "<p>Evaluates whether a value is within a range.</p>" +
                         "<pre><code class='sql'>SELECT * FROM my_table\nWHERE column BETWEEN value1 AND value2;</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>RANK Function</h2>" +
                         "<p>Assigns a rank to each row based on the order of a specified column. To rank within groups, use PARTITION BY.</p>" +
                         "<pre><code class='sql'>-- Basic ranking example:\n" +
                         "SELECT column, \n" +
                         "       RANK() OVER (ORDER BY column DESC) AS rank\n" +
                         "FROM my_table;\n\n" +
                         "-- Ranking within partitions:\n" +
                         "SELECT category, column, \n" +
                         "       RANK() OVER (PARTITION BY category ORDER BY column DESC) AS category_rank\n" +
                         "FROM my_table;</code></pre>" +
                         "</div>";
        syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
                         "<h2>Date Manipulation Functions</h2>" +
                         "<p>Common date manipulation functions in Snowflake.</p>" +
"<pre><code class='sql'>SELECT DATEADD(day, 7, CURRENT_DATE()) AS next_week, \n" +
"       DATEDIFF(day, '2025-01-01', CURRENT_DATE()) AS days_since_start, \n" +
"       DATE_TRUNC('month', CURRENT_DATE()) AS first_day_of_month, \n" +
"       DATE_PART('day', CURRENT_DATE()) AS current_day, \n" +
"       LAST_DAY(CURRENT_DATE()) AS last_day_of_month \n" +
"FROM my_table;</code></pre>" +
"</div>" +
"<div class='syntax-entry' style='margin-top:20px;' role='tabpanel'>" +
"  <h2>CASE WHEN Statement</h2>" +
"  <p>Evaluates conditions and returns values based on the outcome.</p>" +
"  <pre><code class='sql'>SELECT column, \n" +
"       CASE \n" +
"           WHEN condition1 THEN 'Result1'\n" +
"           WHEN condition2 THEN 'Result2'\n" +
"           ELSE 'Default'\n" +
"       END AS output\n" +
"FROM my_table;</code></pre>" +
"</div>";
    
        // Vocabulary Tab content: common SQL vocabulary definitions
        var vocabEntries = "";
        vocabEntries += "<div class='vocab-entry' style='margin-top:20px;' role='tabpanel'>" +
                        "<h2>SELECT</h2>" +
                        "<p>Retrieves records from one or more tables.</p>" +
                        "</div>";
        vocabEntries += "<div class='vocab-entry' style='margin-top:20px;' role='tabpanel'>" +
                        "<h2>FROM</h2>" +
                        "<p>Indicates the table from which records are retrieved.</p>" +
                        "</div>";
        vocabEntries += "<div class='vocab-entry' style='margin-top:20px;' role='tabpanel'>" +
                        "<h2>WHERE</h2>" +
                        "<p>Filters records based on a specified condition.</p>" +
                        "</div>";
        vocabEntries += "<div class='vocab-entry' style='margin-top:20px;' role='tabpanel'>" +
                        "<h2>JOIN</h2>" +
                        "<p>Combines rows from two or more tables based on a common column.</p>" +
                        "</div>";
        vocabEntries += "<div class='vocab-entry' style='margin-top:20px;' role='tabpanel'>" +
                        "<h2>GROUP BY</h2>" +
                        "<p>Groups rows that share the same values in specified columns.</p>" +
                        "</div>";
        vocabEntries += "<div class='vocab-entry' style='margin-top:20px;' role='tabpanel'>" +
                        "<h2>ORDER BY</h2>" +
                        "<p>Sorts the result set in ascending or descending order.</p>" +
                        "</div>";
        vocabEntries += "<div class='vocab-entry' style='margin-top:20px;' role='tabpanel'>" +
                        "<h2>HAVING</h2>" +
                        "<p>Filters groups created by GROUP BY, typically based on aggregate functions.</p>" +
                        "</div>";
    
        // Snippets Tab content: a simple system for storing code snippets
        var snippetsEntries = "";
        snippetsEntries += "<div class='snippets-entry' style='margin-top:20px;' role='tabpanel'>" +
                           "<h2>Code Snippets</h2>" +
                           "<p>Add a snippet to your collection:</p>" +
                           "<input type='text' id='snippet-title' placeholder='Snippet Title' style='width:100%; padding:8px; margin-bottom:5px; color: #000;'>" +
                           "<textarea id='snippet-code' placeholder='Snippet Code' style='width:100%; padding:8px; margin-bottom:5px; color: #000;' rows='4'></textarea>" +
                           "<button id='add-snippet' style='padding:8px 12px; border:none; border-radius:4px; background-color:#007BFF; color:#fff; cursor:pointer;'>Add Snippet</button>" +
                           "<hr>" +
                           "<div id='snippets-list'><p>No snippets stored yet.</p></div>" +
                           "</div>";
    
        // Settings Tab content: allow toggling overlay theme
        var settingsEntries = "";
        settingsEntries += "<div class='settings-entry' style='margin-top:20px;' role='tabpanel'>" +
                           "<h2>Theme</h2>" +
                           "<p>Toggle between Dark and Light mode for the overlay.</p>" +
                           "<label><input type='radio' name='theme' value='dark' checked> Dark</label> " +
                           "<label style='margin-left:10px;'><input type='radio' name='theme' value='light'> Light</label>" +
                           "</div>";
        settingsEntries += "<div class='settings-entry' style='margin-top:20px;' role='tabpanel'>" +
                           "<button id='apply-theme' style='padding:8px 12px; border:none; border-radius:4px; background-color:#007BFF; color:#fff; cursor:pointer;'>Apply Theme</button>" +
                           "</div>";
    
        // Tabs container: order is now Syntax, Vocabulary, Snippets, Settings (Settings always last)
        var tabsContainer = "<div id='tabs-container'>" +
                            "  <div id='syntax-tab' class='tab-content active' role='tabpanel'>" + syntaxEntries + "</div>" +
                            "  <div id='vocab-tab' class='tab-content' style='display:none;' role='tabpanel'>" + vocabEntries + "</div>" +
                            "  <div id='snippets-tab' class='tab-content' style='display:none;' role='tabpanel'>" + snippetsEntries + "</div>" +
                            "  <div id='settings-tab' class='tab-content' style='display:none;' role='tabpanel'>" + settingsEntries + "</div>" +
                            "</div>";
    
        var fullHTML = headerHTML + tabsContainer;
        contentContainer.innerHTML = fullHTML;
        
        // Tab switching functionality
        var navButtons = contentContainer.querySelectorAll('#tab-nav button');
        navButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                navButtons.forEach(function(b) {
                    b.classList.remove('active');
                    b.style.backgroundColor = "#555";
                    b.setAttribute("aria-selected", "false");
                });
                contentContainer.querySelectorAll('.tab-content').forEach(function(tc) {
                    tc.style.display = 'none';
                    tc.classList.remove('active');
                });
                btn.classList.add('active');
                btn.style.backgroundColor = "#007BFF";
                btn.setAttribute("aria-selected", "true");
                var tabName = btn.getAttribute('data-tab');
                var tabContent = contentContainer.querySelector('#' + tabName + "-tab");
                if (tabContent) {
                    tabContent.style.display = 'block';
                    tabContent.classList.add('active');
                }
            });
        });
        
        // Apply theme settings in Settings tab
        var applyThemeBtn = contentContainer.querySelector('#apply-theme');
        if (applyThemeBtn) {
            applyThemeBtn.addEventListener('click', function() {
                var theme = contentContainer.querySelector('input[name="theme"]:checked').value;
                if (theme === 'light') {
                    contentContainer.style.backgroundColor = '#f5f5f5';
                    contentContainer.style.color = '#000';
                } else {
                    contentContainer.style.backgroundColor = '#222';
                    contentContainer.style.color = '#fff';
                }
            });
        }
        
        // Initialize Snippets Tab: event listener for adding and rendering snippets
        function initSnippetsTab() {
            var addSnippetBtn = contentContainer.querySelector('#add-snippet');
            var snippetTitleInput = contentContainer.querySelector('#snippet-title');
            var snippetCodeInput = contentContainer.querySelector('#snippet-code');
            var snippetsListDiv = contentContainer.querySelector('#snippets-list');
            
            function renderSnippets() {
                var snippets = JSON.parse(localStorage.getItem('sqlSnippets') || "[]");
                if (snippets.length === 0) {
                    snippetsListDiv.innerHTML = "<p>No snippets stored yet.</p>";
                } else {
                    snippetsListDiv.innerHTML = "";
                    snippets.forEach(function(snippet, index) {
                        var snippetDiv = document.createElement('div');
                        snippetDiv.style.marginBottom = "15px";
                        snippetDiv.innerHTML = "<strong>" + snippet.title + "</strong><pre><code class='sql'>" + snippet.code + "</code></pre>";
                        snippetsListDiv.appendChild(snippetDiv);
                    });
                    if(window.hljs) {
                        hljs.highlightAll();
                    }
                }
            }
            
            addSnippetBtn.addEventListener('click', function() {
                var title = snippetTitleInput.value.trim();
                var code = snippetCodeInput.value.trim();
                if(title === "" || code === "") {
                    alert("Please provide both a title and code for the snippet.");
                    return;
                }
                var snippets = JSON.parse(localStorage.getItem('sqlSnippets') || "[]");
                snippets.push({ title: title, code: code });
                localStorage.setItem('sqlSnippets', JSON.stringify(snippets));
                snippetTitleInput.value = "";
                snippetCodeInput.value = "";
                renderSnippets();
            });
            
            renderSnippets();
        }
        initSnippetsTab();
        
        // Event listener for Clear Search button
        var clearSearchBtn = contentContainer.querySelector('#clear-search');
        var searchInput = contentContainer.querySelector('#syntax-search');
        if (clearSearchBtn && searchInput) {
            clearSearchBtn.addEventListener('click', function() {
                searchInput.value = "";
                // Trigger input event to clear any filtering
                var event = new Event('input');
                searchInput.dispatchEvent(event);
            });
        }
        
        // Use querySelector on contentContainer to reliably handle search input filtering
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                var filter = searchInput.value.toLowerCase();
                var activeTab = contentContainer.querySelector('.tab-content.active');
                if (activeTab) {
                    var entries = activeTab.getElementsByTagName('div');
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
        
        overlay.appendChild(contentContainer);
        
        // Clicking outside the container closes the overlay
        overlay.addEventListener('click', function(e) {
            if(e.target === overlay) {
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
        overlay.style.display = (overlay.style.display === 'none' || overlay.style.display === '') ? 'block' : 'none';
        if (overlay.style.display === 'block') {
            var input = overlay.querySelector('#syntax-search');
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
