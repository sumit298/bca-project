import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import SidePanel from './SidePanel'
import Messages from './Messages'
import MetaPanel from './MetaPanel'
import useDarkMode from 'use-dark-mode'
import './App.scss'
import { darkTheme, GlobalStyles, lightTheme } from '../Themes/GlobalStyles'
import { ThemeProvider } from 'styled-components'

export default function App() {
  const darkMode = useDarkMode(true)
  const [isMounted, setIsMounted] = React.useState(false)
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
          <Grid.Column style={{ marginLeft: 268 }}>
            {currentUser && currentChannel && (
              <Messages
                key={currentChannel && currentChannel.id}
                currentChannel={currentChannel}
                currentUser={currentUser}
              />
            )}
          </Grid.Column>
          {!isPrivateChannel && (
            <Grid.Column width={2}>
              <MetaPanel
                isPrivateChannel={isPrivateChannel}
                currentChannel={currentChannel}
                userPosts={userPosts}
              />
            </Grid.Column>
          )}
        </Grid>
      )}
    </ThemeProvider>
  )
}
