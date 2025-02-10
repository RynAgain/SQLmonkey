# SQLmonkey - Snowflake SQL Explorer

SQLmonkey is a lightweight tool designed to help developers explore and understand Snowflake SQL syntax through an interactive overlay. This tool offers an intuitive reference for common SQL operations, vocabulary, code snippets, and various customizable settings—all in one place.

## Overview

The Snowflake SQL Explorer overlay is built as a single-page UI that appears on demand. It provides multiple tabs for:
- **Syntax**: Detailed examples of SQL commands, including CASE WHEN statements.
- **Vocabulary**: Definitions of common SQL terms.
- **Snippets**: A simple system for storing and managing your own code snippets.
- **Settings**: Options for customizing the overlay appearance (e.g., theme toggling). _(This tab always appears last.)_

**Note:** For improved maintainability, the content for each tab is stored in separate HTML files (found in the `tabs` folder) and dynamically loaded at runtime.

## Features

- **Interactive Overlay**: Toggle the overlay using a draggable toolbar button that stays where you position it (its location is saved in local storage).
- **Clearable Search Functionality**: Quickly filter content within any tab with a search box equipped with a “Clear” button to reset the filter.
- **Syntax Highlighting**: SQL examples are automatically highlighted using Highlight.js for improved code readability.
- **CASE WHEN Support**: Examples now include CASE WHEN statements to help illustrate conditional logic in SQL.
- **Tab Organization**: Intuitive tab navigation with separate tabs for Syntax, Vocabulary, Snippets, and Settings.
- **Snippets Management**: Save custom code snippets into local storage and easily retrieve them later.
- **Customizable Settings**: Toggle between Dark and Light themes to suit your environment.
- **Modular Design**: The overlay splits each tab’s content into separate files for better maintainability.

## Installation

1. Clone or download the project repository.
2. Open the project in your favorite code editor.
3. Ensure you are in the `c:/Source/SQLmonkey` directory.
4. Integrate the overlay by including the provided userscripts:
   - **MainScriptSQLSyn.js**
   - **toolbarButton.js**
   - **overlay.js**
5. The tab contents are stored in the `tabs` folder as separate HTML files:
   - `tabs/syntaxTab.html`
   - `tabs/vocabTab.html`
   - `tabs/snippetsTab.html`
   - `tabs/settingsTab.html`

## Usage

- **Toggle the Overlay**: Click the draggable toolbar button labeled "SQL Syntax" to open or close the overlay.
- **Drag the Toolbar Button**: Click and drag the button by its hamburger icon (the drag handle) to reposition it. Its position saves automatically.
- **Search & Clear Search**: Use the search input at the top of the overlay to filter content. Click the “Clear” button to immediately reset the search.
- **Switch Tabs**: Use the tab navigation to switch between SQL syntax examples (including a new CASE WHEN example), vocabulary definitions, code snippets, and settings.
- **Add Snippets**: In the Snippets tab, enter a snippet title and code, then click "Add Snippet" to save your snippet in local storage.
- **Customize Appearance**: In the Settings tab, select a theme (Dark or Light) and click "Apply Theme" to update the overlay's appearance.

## Future Enhancements

Future updates may include:
- Improved accessibility with enhanced keyboard navigation.
- Additional customization options such as font size adjustments and extra themes.
- Options to export or print SQL examples or snippets.
- Integration with more advanced snippet management libraries.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests for additional features, bug fixes, or improvements.

## License

This project is licensed under the MIT License.

---

Enjoy using SQLmonkey! For any questions or suggestions, please contribute or open an issue.
