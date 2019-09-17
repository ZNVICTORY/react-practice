import React ,{ Component, Fragment } from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component {

  static propTypes = {
    selectAvatar: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const avatarList = 'boy,bull,chick,crab,girl,hedgehog,koala,lemur,man,pig,tiger,whale,woman,zebra,hippopotamus'
                       .split(',')
                       .map((v) =>({
                         icon: require(`../img/${v}.png`),
                         text: v
                       }))
    const GridAvatar = this.state.icon ? 
                       (<div>
                          <span>已选择头像</span>
                          <img style={{width: 20}} src={this.state.icon}  alt="" />
                        </div>
                        ): (<div>请选择头像</div>)

    return (
      <Fragment>
        <List renderHeader= {() => GridAvatar}>
          <Grid 
            data={avatarList} 
            columnNum={5}
            onClick={(elm) =>{
              this.setState(elm)
              this.props.selectAvatar(elm.text)
            }}></Grid>
        </List> 
      </Fragment>
    )
  }
}

export default AvatarSelector