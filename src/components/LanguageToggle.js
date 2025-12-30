import React, { useContext } from "react"
import PagesContext from "../contexes/PagesContext"
import { Link } from "gatsby"
import { Button, ButtonGroup } from "@material-ui/core"
import {
  addRussianPrefix,
  hasRussianPrefix,
  stripRussianPrefix,
} from "../util/paths"

const LanguageToggle = () => {
  const pagesContext = useContext(PagesContext)
  const currentPath = pagesContext?.current?.frontmatter?.path

  if (!currentPath) {
    return null
  }

  const isRu = hasRussianPrefix(currentPath)
  const enPath = stripRussianPrefix(currentPath)
  const ruPath = addRussianPrefix(currentPath)

  const knownPaths = new Set((pagesContext.all || []).map((p) => p?.path))
  const enExists = knownPaths.size === 0 || knownPaths.has(enPath)
  const ruExists = knownPaths.size === 0 || knownPaths.has(ruPath)

  return (
    <ButtonGroup size="small" variant="outlined" aria-label="Language selector">
      {isRu ? (
        enExists ? (
          <Button component={Link} to={enPath}>
            EN
          </Button>
        ) : (
          <Button disabled>EN</Button>
        )
      ) : (
        <Button disabled variant="contained">
          EN
        </Button>
      )}

      {isRu ? (
        <Button disabled variant="contained">
          RU
        </Button>
      ) : ruExists ? (
        <Button component={Link} to={ruPath}>
          RU
        </Button>
      ) : (
        <Button disabled>RU</Button>
      )}
    </ButtonGroup>
  )
}

export default LanguageToggle
