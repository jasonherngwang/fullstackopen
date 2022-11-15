import CoursePart from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

function Part({ part }: { part: CoursePart }) {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p>{part.exerciseSubmissionLink}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <ul>
            {part.requirements.map((r) => (
              <li>{r}</li>
            ))}
          </ul>
        </div>
      );
    default:
      return assertNever(part);
  }
}

function Content({ courseParts }: { courseParts: CoursePart[] }) {
  return (
    <div>
      {courseParts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
}

export default Content;
