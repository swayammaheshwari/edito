import { EditoEditor } from "edito-sdk";
import type { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <>
      <h1>Edito</h1>
      <EditoEditor />
    </>
  );
}
