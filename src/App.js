import React, { Component } from 'react'
import { AppProvider, actions } from 'morex'
import { Header } from 'src/containers'
import MainStackRouter from 'src/router'
import morewallet from 'morewallet.js'
import 'src/models'

class App extends Component {

  componentDidMount() {
    const dappName = "morewalletdapp"
    const client = morewallet.getClient(dappName)
    actions.app.setClient(client)
    window.client = client
  }

  render() {
    return (
      <AppProvider>
        <Header />
        <MainStackRouter />
      </AppProvider>
    )
  }
}

export default App;
