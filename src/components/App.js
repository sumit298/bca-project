import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useSelector } from 'react-redux'
import SidePanel from './SidePanel'
import Messages from './Messages'
import MetaPanel from './MetaPanel'
import useDarkMode from 'use-dark-mode'
import { makeStyles } from '@material-ui/core/styles'
import './App.scss'
import CssBaseline from '@material-ui/core/CssBaseline'
import { darkTheme, GlobalStyles, lightTheme } from '../Themes/GlobalStyles'
import { ThemeProvider } from 'styled-components'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  
}))

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

  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CssBaseline />
      {isMounted && (
          <Grid
            container
            direction="row"
            // justify="space-around"
            // alignItems="baseline"
            spacing={3}
            className={classes.root}
          >
            <Grid item xs>
              <SidePanel
                key={currentUser && currentUser.id}
                currentUser={currentUser}
              />
            </Grid>
            <Grid item xl>
              {currentUser && currentChannel && (
                <Messages
                  key={currentChannel && currentChannel.id}
                  currentChannel={currentChannel}
                  currentUser={currentUser}
                />
              )}
            </Grid>
            {!isPrivateChannel && (
              <Grid item xs={2}>
                <MetaPanel
                  isPrivateChannel={isPrivateChannel}
                  currentChannel={currentChannel}
                  userPosts={userPosts}
                />
              </Grid>
            )}
          </Grid>
      )}
    </ThemeProvider>
  )
}
