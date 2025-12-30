import React from "react"
import { normalizeExerciseId } from "../../util/strings"

const H1 = ({ children, className, id: providedId, ...props }) => {
  let id = providedId
  if (!id) {
    let text = "unknown heading"
    try {
      text = children.find((o) => typeof o === "string") || "unknown heading"
    } catch (e) {}
    id = normalizeExerciseId(text)
  }
  return (
    <h1
      className={["material-header", className].filter(Boolean).join(" ")}
      id={id}
      {...props}
    >
      {children}
    </h1>
  )
}

export default H1
