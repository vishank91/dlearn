import { NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-redux"
import AuthenticationNavigation from "./application/navigation/AuthenticationNavigation"

import Store from "./application/redux/Store"
export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <AuthenticationNavigation />
      </NavigationContainer>
    </Provider>
  )
}
