var overlay;

function createOverlay() {
    overlay = document.createElement('div');
    overlay.id = 'sql-syntax-overlay';
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
    
    // Create container for Snowflake SQL syntax explorer content
    var contentContainer = document.createElement('div');
    contentContainer.style.maxWidth = '800px';
    contentContainer.style.margin = '50px auto';
    contentContainer.style.backgroundColor = '#222';
    contentContainer.style.padding = '20px';
    contentContainer.style.borderRadius = '8px';
    
    // Header with search field for better organization and filtering
    var headerHTML = "<h1>Snowflake SQL Syntax Explorer</h1>" +
                     "<p>Select a syntax element below to view details and examples for Snowflake SQL.</p>" +
                     "<input type='text' id='syntax-search' placeholder='Search syntax...' style='width:100%; padding:10px; margin-bottom:20px; border-radius:4px; border:1px solid #555;'>";
                       
    var syntaxEntries = "";
    
    // SELECT Statement Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>SELECT Statement</h2>" +
                     "<p>Retrieves data from one or more tables.</p>" +
                     "<pre>SELECT column1, column2 FROM my_table WHERE condition;</pre>" +
                     "</div>";

    // CREATE TABLE Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>CREATE TABLE</h2>" +
                     "<p>Creates a new table in the database.</p>" +
                     "<pre>CREATE TABLE my_table (" +
                     "\n    id INT AUTOINCREMENT," +
                     "\n    name STRING," +
                     "\n    created_at TIMESTAMP_LTZ DEFAULT CURRENT_TIMESTAMP" +
                     "\n);</pre>" +
                     "</div>";

    // CREATE OR REPLACE TABLE Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>CREATE OR REPLACE TABLE</h2>" +
                     "<p>Creates a new table or replaces an existing one.</p>" +
                     "<pre>CREATE OR REPLACE TABLE my_table (" +
                     "\n    id INT," +
                     "\n    name STRING" +
                     "\n);</pre>" +
                     "</div>";

    // ALTER TABLE Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>ALTER TABLE</h2>" +
                     "<p>Modifies an existing table structure.</p>" +
                     "<pre>ALTER TABLE my_table ADD COLUMN email STRING;</pre>" +
                     "</div>";

    // DROP TABLE Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>DROP TABLE</h2>" +
                     "<p>Drops an existing table if it exists.</p>" +
                     "<pre>DROP TABLE IF EXISTS my_table;</pre>" +
                     "</div>";

    // UPDATE Statement Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>UPDATE Statement</h2>" +
                     "<p>Updates rows in a table.</p>" +
                     "<pre>UPDATE my_table SET column = new_value WHERE condition;</pre>" +
                     "</div>";

    // DELETE Statement Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>DELETE Statement</h2>" +
                     "<p>Deletes rows from a table based on a condition.</p>" +
                     "<pre>DELETE FROM my_table WHERE condition;</pre>" +
                     "</div>";

    // MERGE Statement Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>MERGE Statement</h2>" +
                     "<p>Merges data from a source table into a target table.</p>" +
                     "<pre>MERGE INTO target_table USING source_table " +
                     "\nON target_table.id = source_table.id " +
                     "\nWHEN MATCHED THEN UPDATE SET target_table.value = source_table.value " +
                     "\nWHEN NOT MATCHED THEN INSERT (id, value) VALUES (source_table.id, source_table.value);</pre>" +
                     "</div>";

    // COPY INTO Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>COPY INTO Command</h2>" +
                     "<p>Loads data into a table from an external source.</p>" +
                     "<pre>COPY INTO my_table " +
                     "\nFROM @my_stage/file.csv " +
                     "\nFILE_FORMAT = (TYPE = 'CSV', FIELD_OPTIONALLY_ENCLOSED_BY='\"');</pre>" +
                     "</div>";

    // INSERT Statement Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>INSERT Statement</h2>" +
                     "<p>Adds new rows into a table.</p>" +
                     "<pre>INSERT INTO my_table (id, name) VALUES (1, 'John Doe');</pre>" +
                     "</div>";

    // USE WAREHOUSE Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>USE WAREHOUSE</h2>" +
                     "<p>Sets the virtual warehouse for executing queries.</p>" +
                     "<pre>USE WAREHOUSE my_warehouse;</pre>" +
                     "</div>";
                     
    // ALTER WAREHOUSE Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>ALTER WAREHOUSE</h2>" +
                     "<p>Adjusts warehouse properties.</p>" +
                     "<pre>ALTER WAREHOUSE my_warehouse SET WAREHOUSE_SIZE = 'LARGE';</pre>" +
                     "</div>";

    // USE DATABASE Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>USE DATABASE</h2>" +
                     "<p>Selects the database for the session.</p>" +
                     "<pre>USE DATABASE my_database;</pre>" +
                     "</div>";

    // SHOW TABLES Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>SHOW TABLES</h2>" +
                     "<p>Displays all tables in the current database.</p>" +
                     "<pre>SHOW TABLES;</pre>" +
                     "</div>";

    // DESC TABLE Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>DESC TABLE</h2>" +
                     "<p>Describes the structure of a table.</p>" +
                     "<pre>DESC TABLE my_table;</pre>" +
                     "</div>";

    // BETWEEN Expression Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>BETWEEN Expression</h2>" +
                     "<p>Evaluates whether a value is within a range.</p>" +
                     "<pre>SELECT * FROM my_table\nWHERE column BETWEEN value1 AND value2;</pre>" +
                     "</div>";

    // RANK Function Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>RANK Function</h2>" +
                     "<p>Assigns a rank to each row based on the order of a specified column. Rows with identical values receive the same rank, and gaps appear in the ranking sequence. To rank within groups, use PARTITION BY.</p>" +
                     "<pre>-- Basic ranking example:\n" +
                     "SELECT column, \n" +
                     "       RANK() OVER (ORDER BY column DESC) AS rank\n" +
                     "FROM my_table;\n\n" +
                     "-- Ranking within partitions:\n" +
                     "SELECT category, column, \n" +
                     "       RANK() OVER (PARTITION BY category ORDER BY column DESC) AS category_rank\n" +
                     "FROM my_table;</pre>" +
                     "</div>";

    // Date Manipulation Functions Example
    syntaxEntries += "<div class='syntax-entry' style='margin-top:20px;'>" +
                     "<h2>Date Manipulation Functions</h2>" +
                     "<p>Common date manipulation functions in Snowflake.</p>" +
                     "<pre>" +
                     "SELECT DATEADD(day, 7, CURRENT_DATE()) AS next_week, \n" +
                     "       DATEDIFF(day, '2025-01-01', CURRENT_DATE()) AS days_since_start, \n" +
                     "       DATE_TRUNC('month', CURRENT_DATE()) AS first_day_of_month, \n" +
                     "       DATE_PART('day', CURRENT_DATE()) AS current_day, \n" +
                     "       LAST_DAY(CURRENT_DATE()) AS last_day_of_month \n" +
                     "FROM my_table;" +
                     "</pre>" +
                     "</div>";
    
    contentContainer.innerHTML = headerHTML + syntaxEntries;
    
    // Add search functionality to filter syntax entries
    var searchInput = document.getElementById('syntax-search');
    if(searchInput) {
        searchInput.addEventListener('input', function() {
            var filter = searchInput.value.toLowerCase();
            var entries = document.getElementsByClassName('syntax-entry');
            Array.from(entries).forEach(function(entry) {
                if (entry.textContent.toLowerCase().indexOf(filter) > -1) {
                    entry.style.display = "";
                } else {
                    entry.style.display = "none";
                }
            });
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
}

function toggleOverlay() {
    if (!overlay) {
        createOverlay();
    }
    overlay.style.display = (overlay.style.display === 'none' || overlay.style.display === '') ? 'block' : 'none';
}
