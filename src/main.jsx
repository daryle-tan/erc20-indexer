import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"

if (!window.ethereum) {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      Web3 wallet NOT detected! Consider installing a browser wallet like
      MetaMask. If you're on incognito, open this app in a normal tab and retry.
    </React.StrictMode>,
  )
} else {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ColorModeScript initialColorMode="light" />
      <App />
    </React.StrictMode>,
  )
}
