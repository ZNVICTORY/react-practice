import React, { Fragment } from 'react' 
import { Route } from 'react-router-dom'
import Login from '../container/login/login'
import Register from '../container/register/register'
import AuthRoute from '../component/authroute/authroute'

// test
function Boss(){
    return <h1>这是boss页面</h1>
}
class Routes extends React.Component {
    render() {
        return (
            <Fragment>
                {/* <Route path="/" component={}  exact  /> */}
                <AuthRoute></AuthRoute>
                <Route path="/boss" component={Boss} />
                <Route path="/login"  component={Login} />
                <Route path="/register" component={Register} /> 
            </Fragment>
        )
    }
}

export default Routes