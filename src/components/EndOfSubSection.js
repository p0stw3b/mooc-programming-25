import React, { Fragment } from "react"
import styled from "styled-components"
import PagesContext from "../contexes/PagesContext"
import { filterPagesByLanguage, getSectionPath } from "../util/paths"
import { Link } from "gatsby"
import { withTranslation } from "react-i18next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight as icon } from "@fortawesome/free-solid-svg-icons"
import withSimpleErrorBoundary from "../util/withSimpleErrorBoundary"

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  padding: 1rem;
  border-radius: 0.25rem;
  margin: 1rem 0;
  display: inline-block;
  width: 100%;
  border-radius: 10px;
  transition: background-color 0.2s;

  &:hover {
    text-decoration: none;
    color: black;
    background-color: #eeeeee;
  }
`

const StyledIcon = styled(FontAwesomeIcon)`
  vertical-align: middle;
  margin-right: 1rem;
  margin-left: 0.5rem;
  color: var(--color);
  font-size: 1.5em;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`

class EndOfSubSection extends React.Component {
  render() {
    return (
      <PagesContext.Consumer>
        {(value) => {
          const currentPath = value.current.frontmatter.path
          const sectionPath = getSectionPath(currentPath)
          const sectionPages = filterPagesByLanguage(value.all, currentPath)
            .filter((o) => o.path.startsWith(`${sectionPath}/`))
            .sort((a, b) => {
              a = a.path.toLowerCase()
              b = b.path.toLowerCase()

              return a > b ? 1 : b > a ? -1 : 0
            })

          let currentPageIndex = null

          sectionPages.forEach((page, i) => {
            if (page.path !== currentPath) {
              return
            }
            currentPageIndex = i
          })

          let nextPart = null

          if (
            currentPageIndex !== null &&
            currentPageIndex !== sectionPages.length - 1
          ) {
            nextPart = sectionPages[currentPageIndex + 1]
          }
          return (
            <div>
              {this.props.t("endReached")}{" "}
              {nextPart && (
                <Fragment>
                  {this.props.t("continueToNext")}{" "}
                  <ButtonWrapper>
                    <StyledLink to={nextPart.path}>
                      <StyledIcon icon={icon} />
                      {currentPageIndex + 2}. {nextPart.title}
                    </StyledLink>
                  </ButtonWrapper>
                </Fragment>
              )}
              <p>{this.props.t("rememberToCheckPoints")}</p>
            </div>
          )
        }}
      </PagesContext.Consumer>
    )
  }
}

export default withTranslation("common")(
  withSimpleErrorBoundary(EndOfSubSection),
)
