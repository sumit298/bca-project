import React from 'react'
import { Menu } from 'semantic-ui-react'
import './sidePanel.scss'
import UserPanel from './UserPanel'
import Starred from './Starred'
import Channels from './Channels'
import DirectMessages from './DirectMessages'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
// import VideoChat from '../VideoChat'
// import VideoChannel from './VideoChannel'
const useStyles = makeStyles({
  list: {
    width: 200,
  },
  fullList: {
    width: 'auto',
  },
})

export default function SidePanel({ currentUser }) {
  const classes = useStyles()
  const [state, setState] = React.useState({
    left: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Menu
        inverted
        size="large"
        fixed="left"
        vertical
        id="menu"
        className="drawer-menu"
      >
        <UserPanel currentUser={currentUser} />
        <Starred currentUser={currentUser} />
        <Channels currentUser={currentUser} />
        <DirectMessages currentUser={currentUser} />
      </Menu>
    </div>
  )

  return (
    <div>
      {['='].map((anchor, index) => (
        <div className="side-toggle" key={index}>
          <Button onClick={toggleDrawer(anchor, true)} className="side-toggle">
            {anchor}
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </div>
      ))}

      <Menu
        inverted
        size="large"
        fixed="left"
        vertical
        id="menu"
        className="main-sidepanel"
      >
        <UserPanel currentUser={currentUser} />
        <Starred currentUser={currentUser} />
        <Channels currentUser={currentUser} />
        <DirectMessages currentUser={currentUser} />
        {/* <VideoChat/> */}
        {/* <VideoChannel currentUser={currentUser} /> */}
      </Menu>
    </div>
  )
}
