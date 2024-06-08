# Trips Restoration Case Study

## Problem Description
One travel agency faced a problem with a corrupted database, containing customer's trips. The IT department was able to recover tickets linked to specific users.
Unfortunately, tickets contain only source and destination cities without any other information. Help travel agencies to restore original trip for specific users.

## Solution
The solution involves reconstructing the trip from the given tickets using a directed graph. The key steps are:
1. Building the graph from the tickets.
2. Identifying the starting point of the trip.
3. Reconstructing the trip and ensuring it covers all provided tickets.

### Edge Cases Handled
- No tickets provided
- Invalid ticket format
- Conflicting tickets with the same source
- Circular routes
- Disjoint trips

## Prerequisites
- Node.js
- npm

## Steps to Test the Solution

### 1. Clone the Project from GitHub
First, clone the project repository from GitHub to your local machine and open the project folder.

### 2. Install Dependencies
Install the required npm packages:
```sh
npm install
```

### 3. Run the Tests
Run the Jest tests to ensure the solution handles all cases:
```sh
npm test
```