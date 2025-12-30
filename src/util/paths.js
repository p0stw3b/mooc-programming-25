export const RUSSIAN_PREFIX = "/ru"

export function stripGatsbyPathPrefix(pathname) {
  if (typeof pathname !== "string") {
    return pathname
  }

  // When the site is built/served with Gatsby `pathPrefix`, `location.pathname`
  // includes that prefix (e.g. "/programming-25/ru/part-1"). All internal page
  // paths and markdown frontmatter paths do not include it, so strip it out for
  // language and section detection.
  const pathPrefix =
    typeof __PATH_PREFIX__ === "string" ? __PATH_PREFIX__ : undefined

  if (!pathPrefix || pathPrefix === "/") {
    return pathname
  }

  if (pathname === pathPrefix) {
    return "/"
  }

  const prefixWithSlash = `${pathPrefix}/`
  if (pathname.startsWith(prefixWithSlash)) {
    const stripped = pathname.slice(pathPrefix.length)
    return stripped.length > 0 ? stripped : "/"
  }

  return pathname
}

export function hasRussianPrefix(pathname) {
  pathname = stripGatsbyPathPrefix(pathname)
  if (typeof pathname !== "string") {
    return false
  }
  return (
    pathname === RUSSIAN_PREFIX || pathname.startsWith(`${RUSSIAN_PREFIX}/`)
  )
}

export function stripRussianPrefix(pathname) {
  pathname = stripGatsbyPathPrefix(pathname)
  if (typeof pathname !== "string") {
    return pathname
  }
  if (pathname === RUSSIAN_PREFIX) {
    return "/"
  }
  if (pathname.startsWith(`${RUSSIAN_PREFIX}/`)) {
    const stripped = pathname.slice(RUSSIAN_PREFIX.length)
    return stripped.length > 0 ? stripped : "/"
  }
  return pathname
}

export function addRussianPrefix(pathname) {
  pathname = stripGatsbyPathPrefix(pathname)
  if (typeof pathname !== "string") {
    return pathname
  }
  if (hasRussianPrefix(pathname)) {
    return pathname
  }
  if (pathname === "/") {
    return RUSSIAN_PREFIX
  }
  if (!pathname.startsWith("/")) {
    return `${RUSSIAN_PREFIX}/${pathname}`
  }
  return `${RUSSIAN_PREFIX}${pathname}`
}

export function getSectionPath(pathname) {
  const isRu = hasRussianPrefix(pathname)
  const basePath = stripRussianPrefix(pathname) || "/"
  const segments = basePath.split("/").filter(Boolean)

  if (segments.length === 0) {
    return isRu ? RUSSIAN_PREFIX : "/"
  }

  const sectionBase = `/${segments[0]}`
  return isRu ? addRussianPrefix(sectionBase) : sectionBase
}

export function filterPagesByLanguage(pages, currentPathname) {
  const isRu = hasRussianPrefix(currentPathname)
  return (pages || []).filter((page) => {
    if (!page?.path) {
      return false
    }
    return isRu ? hasRussianPrefix(page.path) : !hasRussianPrefix(page.path)
  })
}
