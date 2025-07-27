## Job Funnel App

This is a responsive, filterable job listing panel built with React and Next.js. It was developed as part of a personal project inspired by a task from my mentor, Amal, at Instapro.


![Responsive Preview](/public/assets/amIResponsive.PNG)

Live Site deployed on vercel can be found [here](https://job-funnel-ksgv.vercel.app/).  
GitHub Repo can be found [here](https://github.com/aimansae/jobFunnel) 

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [What I Learned](#what-i-learned)
- [Challenges](#challenges)
- [Search & Filtering Logic](#search--filtering-logic)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Credits](#credits)

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

## Challenges

This challenge was harder than I thought and that’s what made it great for growth.

- The **UI took time**, especially the grid layout that shows filters **always visible on desktop**, but toggled on mobile with state control.
- I had a hard time handling **controlled input with checkboxes** and managing the checked/unchecked logic dynamically.
- The **hardest part** was understanding **search params and filters** in the App Router. I struggled to:
  - Understand how `useSearchParams` works  
  - Filter the content based on URL query  
  - Persist the selected filters  
  - Reflect the applied filters visually on the UI  
- It took several iterations to correctly display the selected filters and reset them appropriately when toggled off.

Once I figured it out, I gained a much deeper understanding of:
- State-sync between URL and UI
- Reusable filtering logic across components
- Next.js App Router patterns (server + client combined)
- Js [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method

Overall, this project truly helped me level up my skills in:
- **Next.js (App Router)**
- **Server + Client component integration**
- **Complex filter logic and state management**
- **Accessibility and responsive UI best practices**



## Technologies Used

- [**React**](https://react.dev/) – JavaScript library for building user interfaces
- [**Next.js**](https://nextjs.org/) – React framework with built-in routing and server-side rendering
- [**TypeScript**](https://www.typescriptlang.org/) – Typed superset of JavaScript for scalable development
- [**Tailwind CSS**](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [**React Icons**](https://react-icons.github.io/react-icons/) – Popular icon packs as React components
- [**Jest**](https://jestjs.io/) + [**React Testing Library**](https://testing-library.com/) – For unit testing and accessible test practices

## Getting Started

1. Clone the repository
``` bash

git clone https://github.com/yourusername/job-funnel-app
cd job-funnel-app

2. Install dependencies

npm install

3. Run the development server

npm run dev
```
Visit http://localhost:3000 in your browser to explore the app.

## Testing
This project includes unit tests written with Jest and React Testing Library.

**Run Tests**

- To run tests: npm run test

- Tested Components:
Accordion, Checkbox, CountryFlag, Filter, Header, Label, Search and SubHeader

## Deployment

Deploy this project with [Vercel](https://vercel.com/):

- Connect your GitHub repository to Vercel
- Set the build command: npm run build
- Push the changes to github and deploy the app

## Future Enhancements
 
- Pagination for large job datasets
- Persist filter state in localStorage
- Add user authentication
- Improve accessibility and mobile UX further

## Credits

Huge thanks to Amal, my mentor at Instapro, for challenging me with this task and helping me push beyond my limits.

