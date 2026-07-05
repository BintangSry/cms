# CLAUDE.md

# AI Development Instructions

Version: 1.0

---

# Project Overview

This project is a lightweight Landing Page CMS.

The project is intentionally designed to be simple, fast, maintainable, and easy for non-technical clients.

This is NOT a website builder.

This is NOT WordPress.

This is NOT a Headless CMS.

This project manages content for a single landing page.

---

# Primary Goals

Always prioritize:

* Simplicity
* Readability
* Maintainability
* Performance
* Modularity
* Reusability

Every implementation should favor long-term maintainability over clever solutions.

---

# General Rules

Always write code that is:

* Clean
* Easy to understand
* Modular
* Consistent
* Predictable

Never overengineer.

Never introduce unnecessary abstractions.

Never introduce unnecessary dependencies.

If a solution can be implemented in a simpler way without sacrificing quality, choose the simpler solution.

---

# Tech Stack

Frontend

* HTML
* Tailwind CSS
* Vanilla JavaScript

Backend

* Node.js
* Express.js

Storage

* JSON Files
* Local File System

Authentication

* Express Session
* bcrypt

---

# Forbidden Technologies

Never introduce:

* MySQL
* PostgreSQL
* MongoDB
* Firebase
* Supabase
* Prisma
* ORM
* GraphQL
* REST API for internal communication
* React
* Vue
* Angular
* jQuery

The frontend and backend exist in the same project.

---

# Folder Structure

Never change the project structure unless explicitly requested.

Expected structure:

project/

public/

admin/

data/

uploads/

server/

docs/

Every new file must belong to the correct folder.

Avoid placing unrelated files in the project root.

---

# Coding Style

Always prefer:

Small functions

Single Responsibility Principle

Readable variable names

Meaningful comments only when necessary

Avoid:

Large files

Large functions

Deep nesting

Duplicate logic

Magic values

---

# Naming Convention

Variables

camelCase

Functions

camelCase

Constants

UPPER_SNAKE_CASE

Classes

PascalCase

Folders

kebab-case

Files

kebab-case

JSON Keys

camelCase

---

# HTML Rules

Use semantic HTML whenever possible.

Prefer:

header

main

section

article

footer

nav

button

form

Avoid unnecessary div nesting.

Accessibility is mandatory.

---

# CSS Rules

Only use Tailwind CSS.

Do not write custom CSS unless absolutely necessary.

Do not use inline styles.

Keep styling consistent with DESIGN.md.

---

# JavaScript Rules

Use modern JavaScript.

Prefer:

const

let

Arrow Functions

Async/Await

Avoid:

var

Callback Hell

Global Variables

Duplicate code

---

# Backend Rules

Keep routes organized.

Separate:

Routes

Controllers

Services

Utilities

Middleware

Never place all logic inside server.js.

server.js should remain minimal.

---

# JSON Rules

JSON is the project's database.

Treat every JSON file carefully.

Never overwrite unrelated properties.

Always preserve formatting.

Always validate data before saving.

Always create safe write operations.

If writing fails:

Do not corrupt the existing JSON.

---

# JSON Editing Rules

When updating data:

Read

↓

Validate

↓

Modify

↓

Write

Never recreate the entire file unless necessary.

Never remove unknown fields.

Never reorder properties unnecessarily.

---

# Image Upload Rules

Images are stored inside:

public/assets

Never generate random filenames.

Always replace existing assets.

Example:

hero.png

↓

new upload

↓

rename

↓

hero.png

↓

replace existing file

Do not create duplicate files.

---

# Upload Validation

Accept only:

PNG

JPG

JPEG

WEBP

Reject:

Executable files

SVG (unless explicitly allowed)

Unknown MIME types

Validate:

File type

File size

Destination

---

# Authentication Rules

Passwords must never be stored as plain text.

Always use bcrypt.

Protect every admin route.

Unauthenticated users must never access the CMS.

---

# Error Handling

Every operation must handle failure.

Especially:

JSON write

JSON read

Image upload

Rename

Delete

Session

Always return meaningful error messages.

Never expose stack traces to users.

---

# Component Rules

Build reusable UI components.

Avoid duplicated HTML.

If multiple pages share the same structure, extract reusable partials or templates.

---

# Performance Rules

Always optimize for speed.

Prefer:

Minimal JavaScript

Minimal DOM updates

Lazy Loading Images

Optimized Assets

No unnecessary libraries

---

# Accessibility Rules

Every image must have alt text.

Every button must have descriptive text.

Forms must have labels.

Keyboard navigation should work correctly.

---

# Responsive Rules

Mobile First.

Support:

Mobile

Tablet

Desktop

Large Desktop

Never break layouts on small screens.

---

# CMS Rules

The CMS must remain simple.

Do not introduce unnecessary complexity.

Editors should focus only on content management.

Avoid adding advanced features unless requested.

---

# User Experience

The CMS should be understandable within minutes.

Assume the user has little or no technical knowledge.

Every action should feel predictable.

---

# Code Reuse

Before creating new code:

Check if a reusable function already exists.

Avoid duplication.

Reuse utilities whenever possible.

---

# Dependencies

Before adding a package:

Ask:

Can this be implemented without another dependency?

Prefer native Node.js APIs whenever practical.

Keep package count as low as possible.

---

# Documentation

Whenever adding:

New feature

New JSON structure

New folder

New utility

Update the relevant documentation inside the docs folder.

Documentation is part of the project.

---

# Git Guidelines

Write meaningful commits.

Examples:

feat: add gallery editor

fix: validate image upload

refactor: simplify json service

Avoid vague commit messages.

---

# Security

Always validate user input.

Never trust uploaded files.

Never trust JSON content.

Never expose internal paths.

Escape output whenever necessary.

---

# Future Scalability

When implementing a feature:

Think about future expansion.

Avoid writing code that only works for one specific page if a reusable solution is reasonable.

However, never overengineer.

---

# Development Workflow

When implementing a new feature:

1. Understand the requirement.

2. Check existing architecture.

3. Reuse existing utilities.

4. Keep the implementation modular.

5. Validate inputs.

6. Handle errors.

7. Test manually.

8. Keep the UI consistent with DESIGN.md.

9. Keep the behavior consistent with PRD.md.

10. Update documentation if needed.

---

# AI Behavior Rules

Before writing code:

Read PRD.md

Read DESIGN.md

Read ARCHITECTURE.md

Read JSON_SCHEMA.md

Understand the existing codebase.

Never assume.

Never invent missing structures.

If something is unclear, infer the simplest solution that remains consistent with the project architecture.

Always preserve existing functionality unless explicitly instructed otherwise.

---

# Definition of Done

A task is considered complete only if:

* The feature works correctly.
* Existing functionality is not broken.
* The code follows this document.
* The implementation follows PRD.md.
* The UI follows DESIGN.md.
* The project remains modular.
* No unnecessary dependency was added.
* The implementation is responsive.
* Error handling is present.
* Documentation is updated when necessary.

Quality is always more important than speed.
