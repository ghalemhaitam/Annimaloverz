import React, { Component } from "react"
import Navigation from "./src/Navigation/Navigation"

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMuddleware from 'redux-thunk'
import reducers from './src/reducers'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#ffff',
        accent: '#FFE52A'
    },
    fonts: {
        regular: 'Roboto',
        medium: 'Roboto',
        light: 'Roboto Light',
        thin: 'Roboto Thin'
    }
}

const store = createStore(reducers, {}, applyMiddleware(thunkMuddleware))

class App extends Component {

    state = { selectedTab: 'home' }

    render() {
        return (
            <PaperProvider theme={theme}>
                {
                    <Provider store={store}>
                        <Navigation />
                    </Provider>
                }
            </PaperProvider>
        )
    }
}

export default App
