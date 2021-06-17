import React from 'react'
import { Menu } from 'semantic-ui-react'
import './sidePanel.scss'
import UserPanel from './UserPanel'
import Starred from './Starred'
import Channels from './Channels'
import DirectMessages from './DirectMessages'
// import VideoChat from '../VideoChat'
// import VideoChannel from './VideoChannel'

export default function SidePanel({ currentUser }) {
  return (
    <Menu
      inverted
      size="large"
      fixed="left"
      vertical
      id="menu"
    >
      <UserPanel currentUser={currentUser} />
      <Starred currentUser={currentUser} />
      <Channels currentUser={currentUser} />
      {/* <VideoChat/> */}
      <DirectMessages currentUser={currentUser} />
      {/* <VideoChannel currentUser={currentUser} /> */}
    </Menu>
  )
}
