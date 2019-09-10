import React, { Component, Fragment } from 'react'
import 'antd-mobile/dist/antd-mobile.css'
import './config'
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
												{/* <Link to="/">首页</Link> */}
												{/* <Link to="/login" >登录</Link>
												<Link to="/register">注册</Link> */}
												<Routes />
										</BrowserRouter>
                </Provider>
            </Fragment>

        )
    }

}

export default App