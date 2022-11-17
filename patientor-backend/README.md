# Full Stack Open - Patientor Backend with TypeScript

Learning to add features to an Express TypeScript application.

## Types
- Instead of hard-coding types (e.g. `string`, `number`) inside interface definitions, we can reference specific fields of other types, e.g. `diagnosisCodes?: Array<Diagnosis["code"]>` so that it always stays in sync if `Diagnosis` ever changes.
- Creating enums to allow limited-choice selection
- Using utility types such as `Omit` and `Pick` to modify existing types and interfaces
- Extending interfaces to more specific versions
- Writing validation checks in `utils`
  - Explicity setting parameter type to `unknown`, validating it, and return a value of the desired type
  - Using `Object.values` to access the options for enums