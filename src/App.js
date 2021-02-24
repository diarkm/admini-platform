import React from "react"
import Router from "./Router"
import "./components/@vuexy/rippleButton/RippleButton"

import "react-perfect-scrollbar/dist/css/styles.css"
import "prismjs/themes/prism-tomorrow.css"
import ApiModule from "./api/ApiModule"

const App = props => {
  new ApiModule().getUserData()

  return <Router />
}

export default App
