import React from 'react'
import { Menu } from 'semantic-ui-react'

import UserPanel from './UserPanel'
import Starred from './Starred'
import Channels from './Channels'
import DirectMessages from './DirectMessages'
import VideoChat from '../VideoChat';
import '../App.scss';
import VideoChannel from './VideoChannel'
import { lightTheme, darkTheme } from '../Themes/theme'


export default function SidePanel({ currentUser }) {
  return (
    <Menu
      inverted
      size="large"
      fixed="left"
      vertical
      className="sidebar__Sidepanel"
      // style={{width: '19vw', backgroundColor: "#35383d"}}
    >
      <UserPanel currentUser={currentUser} />
      <Starred currentUser={currentUser} />
      <Channels currentUser={currentUser} />
      <DirectMessages currentUser={currentUser} />
      <VideoChannel currentUser={currentUser} />
    </Menu>
  )
}
