# Typesafe Server Generator

## Project Overview
This project is designed to create and manage API routes using `tsoa` and to automate the schema uploading process to Google Drive. This repository supports multiple developers working on different branches and ensures efficient schema handling by attaching branch names and hashes to schema files.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Schema Upload Process](#schema-upload-process)
4. [Branch-specific Schema Handling](#branch-specific-schema-handling)
5. [Schema Hashing](#schema-hashing)
6. [Middleware](#middleware)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/AliSaif541/example-server-tsoa.git
    cd example-server-tsoa
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Usage
1. Create controller functions using `tsoa` decorators.
2. Generate routes and schema files:
    ```bash
    npm run generate-swagger
    ```
3. Upload to Google Drive:
    ```bash
    npm run upload-swagger
    ```
4. Start the server:
    ```bash
    npm run dev
    ```
5. Build the code:
    ```bash
    npm run build
    ```

## Schema Upload Process
After generating the schema throigh `tsoa`, `storingSchema.ts` script uploads the generated `schema.json` to Google Drive. This script is executed before every commit or build using `husky`.

### Step-by-Step Process
1. **Generate Schema**: First, generate the schema.json file using tsoa. This file contains all the API routes and definitions for our server.
2. **Husky Hook**: Husky is configured to run a script before every commit or build. This script automates the process of uploading the schema.json to Google Drive.
3. **Upload Script**: storingSchema.ts uses the Google Drive API to upload the schema.json file to a specific folder in Google Drive. This ensures that the latest schema is always available for the frontend to fetch.

## Branch-specific Schema Handling
The schema file name includes the branch name to differentiate schemas from different branches. The `storingSchema.ts` script fetches the current branch and appends it to the schema file name before uploading.

### Step-by-Step Process
1. **Fetch Current Branch**: The `storingSchema.ts` script fetches the current Git branch.
2. **Append Branch Name**: The branch name is appended to the schema.json file name (e.g., schema-main.json for the main branch).
3. **Upload with Branch Name**: The schema file with the appended branch name is then uploaded to Google Drive. This allows multiple schemas from different branches to coexist in the same folder without overwriting each other.

## Schema Hashing
To minimize unnecessary uploads and fetches, the schema file name also includes a hash. The MD5 checksum of the schema file is calculated and compared to avoid uploading identical files.

### Step-by-Step Process
1. **Calculate MD5 Checksum**: Before uploading, the `storingSchema.ts` script calculates the MD5 checksum of the local schema.json file.
2. **Compare with Remote**: The script retrieves the checksum of the existing schema file on Google Drive. If the checksums match, the files are identical.
3. **Conditional Upload**: If the checksums are different, the script appends the new hash to the file name and uploads the updated schema. If they match, the upload is skipped to avoid redundant uploads.

## Middleware
A custom middleware checks for a specific token in the headers.

### Step-by-Step Process
1. **Create Middleware**: Define a middleware function using tsoa. This function checks for a specific token in the request headers.
2. **Apply Middleware**: Apply the middleware to the routes using tsoa decorators. This ensures that every request to the protected routes must include the required token.
3. **Token Verification**: The middleware function verifies the token. If the token is valid, the request proceeds; otherwise, an unauthorized error is returned.
