import * as React from "react";
import { useContext } from "react";
import { Link } from "gatsby";
import { GlobalContext } from "../context/GlobalContext";

export default function Home() {
  const { catalog } = useContext(GlobalContext);
  return (
    <div>
      <div>Hello world!</div>
      <Link to="/about">ab</Link>

      <Sub />
    </div>
  );
}

function Sub() {
  console.log("sub comp");
  return <div>asdf</div>;
}
