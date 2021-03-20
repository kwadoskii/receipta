import React from "react";

export default function Error({ error, visible }) {
  if (!error || !visible) return null;

  return <p className="error">{error}</p>;
}
