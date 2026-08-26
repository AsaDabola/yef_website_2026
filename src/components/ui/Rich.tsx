import { Fragment } from "react";

/**
 * Renders a translated string that carries emphasis, written as **bold**.
 *
 * Splitting a sentence across <strong> tags would put each fragment in the
 * catalog on its own, and a fragment like ". By definition an evangelical is"
 * cannot be translated into a language that orders its clauses differently.
 * Keeping the sentence whole lets the translator move the emphasis with it.
 */
export default function Rich({
  text,
  emphasis = "font-bold",
}: {
  text: string;
  /** Classes for the **emphasised** run; bold by default. */
  emphasis?: string;
}) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className={emphasis}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
