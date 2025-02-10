# SQLmonkey - Snowflake SQL Syntax Explorer

SQLmonkey is a lightweight tool designed to help developers explore and understand Snowflake SQL syntax through a user-friendly overlay. This project provides a quick reference for common SQL operations with detailed examples and interactive search functionality.

## Overview

The Snowflake SQL Syntax Explorer overlay presents a range of SQL commands and functions, including:
- **Data Querying**: SELECT, INSERT, UPDATE, DELETE.
- **Data Definition**: CREATE TABLE, ALTER TABLE, DROP TABLE.
- **Advanced Operations**: MERGE, COPY INTO.
- **Analytical Functions**: RANK, and date manipulation functions.

The overlay can be toggled on demand, allowing you to reference syntax examples as you work on your queries.

## Features

- **Interactive Overlay**: Display syntax examples in a full-screen overlay.
- **Search Functionality**: Filter syntax entries in real-time to quickly locate the example you need.
- **Organized Layout**: Each SQL command is structured into dedicated sections for clarity.
- **Customizable**: Easily extend or modify the syntax examples and styles to suit your needs.
- **Future Enhancements**: Plans to include syntax highlighting, theme customization, and persistent preferences.

## Installation

1. Clone or download the project repository.
2. Open the project in your favorite code editor.
3. Make sure you are in the directory `c:/Source/SQLmonkey`.
4. Use the provided HTML/JavaScript integration to include the overlay in your working environment.

## Usage

- **Toggle the Overlay**: Call the `toggleOverlay()` function to open or close the syntax explorer.
- **Search Syntax**: Use the search input at the top of the overlay to filter syntax examples by keyword.
- **Extend Examples**: Modify the `overlay.js` file to add new SQL syntax examples or update existing ones.

## Customization

- **Adding New Syntax**: Edit `overlay.js` to include additional SQL commands or adjust existing examples.
- **Styling**: The overlay's design is defined with inline CSS in the JavaScript. Adjust color schemes, fonts, and spacing as needed.
- **Integration**: Easily integrate this tool into your development environment to quick-reference SQL syntax while coding.

## Future Enhancements

- **Syntax Highlighting**: Integrate libraries like Highlight.js for improved code readability.
- **Theme Support**: Add support for different visual themes and user customization.
- **Local Storage**: Implement features to remember user preferences, such as the last used search filter.
- **Extended Documentation**: More comprehensive guides and examples to further assist with Snowflake SQL usage.

## License

MIT License

---

Enjoy using SQLmonkey, and feel free to contribute improvements or new syntax examples!
