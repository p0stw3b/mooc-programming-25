import React from "react"
import styled from "styled-components"
import LoginControls from "./LoginControls"
import withSimpleErrorBoundary from "../util/withSimpleErrorBoundary"
import LoginStateContext, {
  withLoginStateContext,
} from "../contexes/LoginStateContext"
import Button from "./Button"
import LanguageToggle from "./LanguageToggle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartLine as pointsIcon } from "@fortawesome/free-solid-svg-icons"
import CourseSettings from "../../course-settings"
import { withTranslation } from "react-i18next"

const TopBarContainer = styled.div`
  height: 4rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  @media only screen and (max-width: 1200px) {
    justify-content: center;
  }
`

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`

class TopBar extends React.Component {
  static contextType = LoginStateContext

  render() {
    return (
      <TopBarContainer>
        <LanguageToggle />
        {CourseSettings.useNewPointsVisualization && this.context.loggedIn && (
          <Button to="/progress">
            <StyledIcon icon={pointsIcon} />
            {this.props.t("points")}
          </Button>
        )}
        <LoginControls />
      </TopBarContainer>
    )
  }
}

export default withTranslation("common")(
  withSimpleErrorBoundary(withLoginStateContext(TopBar)),
)
