import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { routes } from 'src/config'

const MainStackRouter = () => (
  <Router>
    <Switch>
      {routes.map(({ path, component }, index) => {
        return (
          <Route exact key={index} path={path} component={component} />
        )
      })}
    </Switch>
  </Router>
)

export default MainStackRouter