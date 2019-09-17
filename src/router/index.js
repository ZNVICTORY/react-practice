import React, { Fragment } from 'react' 
import { Route, Switch } from 'react-router-dom'
import Login from '../container/login/login'
import Register from '../container/register/register'
import AuthRoute from '../component/authroute/authroute'
import BossInfo from '../container/bossinfo/bossinfo'
import StaffInfo from '../container/staffinfo/staffinfo'
import Dashboard from '../container/dashboard/dashboard'
import Chat from '../component/chat/chat'

// 四个页面 boss staff msg me
class Routes extends React.Component {
    render() {
        return (
            <Fragment>
                {/* <Route path="/" component={}  exact  /> */}
                <AuthRoute />
                <Switch>
                    <Route path="/staffinfo" component={StaffInfo} />
                    <Route path="/bossinfo" component={BossInfo} />
                    <Route path="/login"  component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/chat/:userid" component={Chat} />
                    <Route component={ Dashboard } />
                </Switch>
            </Fragment>
        )
    }
}

export default Routes