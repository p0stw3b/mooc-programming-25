const HEADING_ID_RE = /\s*\{#([A-Za-z0-9_-]+)\}\s*$/

function walk(node, visitor) {
  visitor(node)
  if (!node || !node.children || !Array.isArray(node.children)) return
  for (const child of node.children) {
    walk(child, visitor)
  }
}

module.exports = ({ markdownAST }) => {
  walk(markdownAST, (node) => {
    if (!node || node.type !== "heading") return

    const children = Array.isArray(node.children) ? node.children : []
    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i]
      if (!child || child.type !== "text" || typeof child.value !== "string") {
        continue
      }

      const match = child.value.match(HEADING_ID_RE)
      if (!match) continue

      const id = match[1]
      child.value = child.value.replace(HEADING_ID_RE, "").trimEnd()
      if (child.value.length === 0) {
        children.splice(i, 1)
      }

      node.data = node.data || {}
      node.data.hProperties = node.data.hProperties || {}
      node.data.hProperties.id = id
      break
    }
  })

  return markdownAST
}

