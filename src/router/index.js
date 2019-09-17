import React, { Fragment } from 'react' 
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from '../container/login/login'
import Register from '../container/register/register'
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
                
                <Switch>
                    <Route path="/login"  component={Login} />
                    <Route path="/staffinfo" component={StaffInfo} />
                    <Route path="/bossinfo" component={BossInfo} />
                    <Route path="/register" component={Register} />
                    <Route path="/chat/:userid" component={Chat} />
                    <Route component={ Dashboard } />
                </Switch>
            </Fragment>
        )
    }
}

export default Routes