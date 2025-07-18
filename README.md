## Job Funnel App

This is a responsive, filterable job listing panel built with React and Next.js. It was developed as part of a personal project inspired by a task from my mentor, Amal, at Instapro.


![Responsive Preview](/public/assets/amIResponsive.PNG)

Live Site deployed on vercel can be found [here](https://job-funnel-ksgv.vercel.app/)  
GitHub Repo can be found [here](https://github.com/aimansae/jobFunnel) 

## Overview

The app allows users to filter job funnels dynamically based on various attributes like category, status, and country. It features:

- Checkbox-based filtering
- Collapsible (accordion-style) filter sections
- URL parameter synchronization
- Mobile-first responsive design
- Unit testing with Jest & React Testing Library

This project helped me explore better UX for filters, state synchronization, and writing testable components in React.

## Features

- Category, Status, and Country filters (with optional flag icons)
- Expandable accordion sections for better filter organization
- Dynamic filter badge count to highlight active filters
- Mobile-friendly design with an expandable filter panel
- Custom useSearchAndFilterParams hook to sync filter state with URL
- Accessibility-friendly components
- Unit tests for critical components

## What I Learned

- Building filter UIs using controlled components and custom hooks
- Managing URL query parameters and keeping UI state in sync
- Creating mobile-first, accessible, and collapsible interfaces
- Writing modular, reusable, and testable components
- Simulating user behavior and props in unit tests using Jest

## Getting Started

1. Clone the repository

git clone https://github.com/yourusername/job-funnel-app
cd job-funnel-app

2. Install dependencies

npm install

3. Run the development server

npm run dev
Visit http://localhost:3000 in your browser to explore the app.

## Search & Filtering Logic

The application processes query parameters from the URL using searchParams. Filtering is applied as follows:

- search: Filters jobs by name (case-insensitive)
- category: Matches the job type
- status: Matches against questionTree.status
- country: Maps selected countries via siteIds and site.country

## Technologies Used

- [**React**](https://react.dev/) – JavaScript library for building user interfaces
- [**Next.js**](https://nextjs.org/) – React framework with built-in routing and server-side rendering
- [**TypeScript**](https://www.typescriptlang.org/) – Typed superset of JavaScript for scalable development
- [**Tailwind CSS**](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [**React Icons**](https://react-icons.github.io/react-icons/) – Popular icon packs as React components
- [**Jest**](https://jestjs.io/) + [**React Testing Library**](https://testing-library.com/) – For unit testing and accessible test practices

## Testing
This project includes unit tests written with Jest and React Testing Library.

**Run Tests**

npm run test

Tested Components:
Accordion, Checkbox, CountryFlag, Filter, Header, Label, Search and SubHeader

## Deployment

Deploy this project with Vercel:

- Connect your GitHub repository to Vercel
- Set the build command: npm run build
- Set the output directory: .next

## Future Enhancements
 
- Pagination for large job datasets
- Persist filter state in localStorage
- Add user authentication
- Improve accessibility and mobile UX further

