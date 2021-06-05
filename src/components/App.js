import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
// Theme import
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './Themes/GlobalStyles'
import { lightTheme, darkTheme } from './Themes/theme'

import SidePanel from './SidePanel'
import Messages from './Messages'
import MetaPanel from './MetaPanel'

// import '../App.scss'
import useDarkMode from 'use-dark-mode'

export default function App() {
  const [isMounted, setIsMounted] = React.useState(false)
  const darkMode = useDarkMode(true)
  const theme = darkMode.value ? darkTheme : lightTheme
  
  const { currentUser, currentChannel, isPrivateChannel, userPosts } =
    useSelector(({ user, channel }) => ({
      currentUser: user.currentUser,
      currentChannel: channel.currentChannel,
      isPrivateChannel: channel.private,
      userPosts: channel.userPosts,
    }))

  React.useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {isMounted && (
        <Grid columns="equal" className="app">
          <SidePanel
            key={currentUser && currentUser.id}
            currentUser={currentUser}
          />
          <Grid.Column style={{ marginLeft: 260 }}>
            {currentUser && currentChannel && (
              <Messages
                key={currentChannel && currentChannel.id}
                currentChannel={currentChannel}
                currentUser={currentUser}
              />
            )}
          </Grid.Column>
          {!isPrivateChannel ? (
            <Grid.Column width={2}>
              <MetaPanel
                isPrivateChannel={isPrivateChannel}
                currentChannel={currentChannel}
                userPosts={userPosts}
              />
            </Grid.Column>
          ) : null}
        </Grid>
      )}
    </ThemeProvider>
  )
}
