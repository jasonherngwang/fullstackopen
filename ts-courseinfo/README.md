# Full Stack Open - Course Info App with TypeScript

Learning how to implement TypeScript on a React frontend.

## Setup
- In `tsconfig`, disallowing mixed JS and TS files by setting `allowJs` to `false
- In `eslint`
  - If using `airbnb`, may need additional config with `eslint-config-airbnb-typescript`
  - Optional: Allowing JSX to be writting in various file extensions, using `react/jsx-filename-extension`

## Creating Types
- Create a "base" interface with fundamental properties.
- `extend` the base interface to more specific interfaces with specialized properties.
- Create and export a **union type** that includes all the specific interfaces.

## Using Types in Components
- Using inline interfaces to specify the type of each property of `props`
- Using a `switch` statement to check a prop's `type` to determine what to do next
- Creating an `assertNever()` function to handle cases that should never occur, e.g. if passed a value that isn't a member of the union type we expect