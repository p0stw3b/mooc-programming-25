import { useEffect } from "react"
import { useLocation } from "@reach/router"
import i18n from "../i18n"
import { hasRussianPrefix } from "../util/paths"

const LanguageSync = () => {
  const location = useLocation()

  useEffect(() => {
    const desiredLanguage = hasRussianPrefix(location?.pathname) ? "ru" : "en"
    if (i18n.language !== desiredLanguage) {
      i18n.changeLanguage(desiredLanguage)
    }
  }, [location?.pathname])

  return null
}

export default LanguageSync
