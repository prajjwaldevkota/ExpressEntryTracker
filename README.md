# Express Entry Tracker

Express Entry Tracker is a modern, responsive web application that displays historical data for Canada’s Express Entry draws. This frontend project uses an external API maintained by [sagunji](https://github.com/sagunji) to provide the latest Express Entry draw information, a complete draw history with filtering and sorting options, and trend visualizations.

## Features

- **Latest Express Entry Draw:**  
  View details such as draw number, date, minimum CRS, invitations issued, category, and year.

- **Draw History:**  
  Filter draws by year or category. Sort draw records by date (using an icon toggle for ascending/descending order) with a polished glassmorphic design.

- **Trends Visualization:**  
  Compare trends, such as the total number of invitations issued over time, with interactive charts and advanced filtering by category.

- **Modern & Responsive Design:**  
  A dark, glassy interface built with Tailwind CSS and enhanced with smooth animations via Framer Motion.

- **Client-side Routing:**  
  Navigate seamlessly between Home, History, and Trends pages using React Router.

- **Development Proxy:**  
  During development, Vite’s proxy configuration forwards API requests to avoid CORS issues without the need to maintain your own backend.

## API Source

This project consumes the Express Entry Draws API developed by [sagunji](https://github.com/sagunji). The API provides endpoints to retrieve:
- All Express Entry draws
- Draw categories
- The latest Express Entry draw

For details on how the API works and for further documentation, visit [sagunji's GitHub repository](https://github.com/sagunji).

## Tech Stack

- **React:** User interface development.
- **Vite:** Fast bundler and development server.
- **Tailwind CSS:** Styling and layout with a modern, glassy aesthetic.
- **React Router Dom:** Client-side routing.
- **Axios:** HTTP client for API requests.
- **Framer Motion:** Animations and transitions.
- **React Icons:** Icon library for modern UI elements.

