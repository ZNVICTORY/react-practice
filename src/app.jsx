import React, { Component, Fragment } from 'react'
import './config'
import AuthRoute from './component/authroute/authroute'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Routes from './router'
import store from './store'                     
class App extends Component {
    render() {
        return (
            <Fragment>
                <Provider store={store}>
                    <BrowserRouter>
                        <AuthRoute />
                        <Routes />  
                    </BrowserRouter>
                </Provider>
            </Fragment>

        )
    }

}

export default App