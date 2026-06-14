import 'react-native-gesture-handler'
import { Provider } from "react-redux"
import Store from "./application/redux/Store"

import Authentication from "./application/Authentication"
export default function App() {
  return (
    <Provider store={Store}>
      <Authentication />
    </Provider>
  )
}
