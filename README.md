# Pokemon-ui-explorer
This is a [Next.js](https://nextjs.org) project , bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app), that shows a list of Pokémon in a table with pagination and sorting. You can search by name and click on any Pokémon to see more details in a modal. It also has a separate table for evolution triggers.

Built with TypeScript, Tailwind CSS, and React Table.

### How to run
1. Run commands: 
    ```
    npm install
    npm run dev
    ```
2. Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.


### What’s inside
- Server-side data fetching with Next.js
- Table with pagination and sorting
- Search Pokémon by name
- Modal to show Pokémon details
- Separate evolution triggers table
- Reusable table component using React Table

### Notes
- Data comes from the free PokéAPI
- Pagination and filtering happen on the server (SSR) using Next.js getServerSideProps
- Table and pagination controls use server-side rendering for SEO and faster first load
- Clicking a row fetches Pokémon details on the client (CSR) and opens a modal without a page reload
- The Evolution Trigger table always stays visible and fetches its own data separately, also supporting pagination

## Future Plan

### Code & Architecture

* Tried to modularize the project by splitting parts like Pokémon table, modal, and search bar into separate components.
* With more time, I would have:

  * Combined the table and footer into a reusable `DataTable` component.
  * Moved all fetch logic into a centralized API utility file.
  * Created custom hooks like `usePokemonData`, `useEvolutionTriggers` to separate logic from UI.
  * Added consistent error and loading state handling across components.
  + Replace `any` type with proper type definitions for better TypeScript safety (e.g., SelectedPokemon type).

### UX/UI Improvements

* Would have added loading spinners during data fetch for better feedback.
* Shown a “No results found” message in better way with a reset button when search returns nothing.
* Preserved scroll position on page change (e.g., using `scrollIntoView` or shallow routing) for smoother experience.

### Extra Features

* Highlight the active table row when modal opens.
* Add animations to the modal for a smoother and polished feel.
