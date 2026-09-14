# Expense Tracker

A full-stack expense management application that allows users to record, manage, filter, and analyze their expenses through a modern web interface.

## Overview

Expense Tracker is a full-stack web application built with a React + TypeScript frontend and a Spring Boot REST API connected to MySQL.

The application provides a dashboard for viewing expense statistics, managing expenses, filtering by category, and visualizing spending patterns.

## Features

### Dashboard
- View total expenses
- View highest expense
- View expense statistics
- View category-wise spending
- Visualize expenses using charts

### Expense Management
- Add new expenses
- View all expenses
- Edit existing expenses
- Delete expenses
- Filter expenses by category
- View expense details including amount, category, description, and date

### Backend
- RESTful API built with Spring Boot
- CRUD operations for expenses
- MySQL database integration
- Spring Data JPA / Hibernate
- Category-based expense filtering
- Expense summary and analytics endpoints

### Frontend
- React + TypeScript
- Responsive web interface
- React Router for navigation
- React Query for API data management
- Axios for HTTP requests
- Recharts for data visualization
- Tailwind CSS for styling
- Toast notifications and delete confirmation dialogs

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Query
- Axios
- Recharts

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven

### Database
- MySQL

### Tools
- VS Code
- Git
- GitHub
- Postman

## Project Structure

```text
ExpenseTracker/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
├── .gitattributes
└── README.md