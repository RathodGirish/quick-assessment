import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import User from "../../pages/user/User"
import Questions from "../../pages/question/Questions";
import Skill from "../../pages/skill/Skill";
import Examdetails from "../../pages/examdetails/Examdetails";
import ExamResult from "../../pages/examresult/ExamResult";
import Feedback from "../../pages/feedback/Feedback";

import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

import Profile from "../../components/profile/profile"


// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/user" component={User} />
              <Route path="/app/questions" component={Questions} />
              <Route path="/app/skills" component={Skill} />
              <Route path="/app/examdetails" component={Examdetails} />
              <Route path="/app/feedback" component={Feedback} />
              <Route path="/app/profile" component={Profile} />
              {/* <Route path="/app/notifications" component={Notifications} /> */}
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              {/* <Route path="/app/ui/maps" component={Maps} /> */}
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
