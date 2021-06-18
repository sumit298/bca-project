import React from 'react'
import {
  //  Header, Segment, Input,
  Icon,
} from 'semantic-ui-react'
import Tooltip from '@material-ui/core/Tooltip'
// import { fade, makeStyles } from '@material-ui/core'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
import './MessageHeader.scss'
import useDarkMode from 'use-dark-mode'
import { Link } from 'react-router-dom'

import VideocamIcon from '@material-ui/icons/Videocam'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import GitHubIcon from '@material-ui/icons/GitHub'
// import MicIcon from '@material-ui/icons/Mic'
// import MetaPanel from '../MetaPanel/index'

export default function MessagesHeader({
  channelName,
  users,
  searchTerm,
  handleSearchMessages,
  searching,
  isChannelPrivate,
  handleStarChannel,
  isStarred,
}) {
  const darkMode = useDarkMode(true)
  // const [showMeta, setShowMeta] = React.useState(false)
  return (
    <div className="chat__main">
      <div className="chatheader">
        <div className="chatheader__topic">
          <h3>
            <span>
              {channelName}
              {!isChannelPrivate && (
                <Icon
                  style={{ marginLeft: '5px' }}
                  onClick={handleStarChannel}
                  name={isStarred ? 'star' : 'star outline'}
                  color={isStarred ? 'yellow' : 'black'}
                />
              )}
            </span>
            <span style={{ marginLeft: '10px' }}>{users}</span>
          </h3>
        </div>
        <div className="chatheader__items">
          <div className="chatheader__items-left"></div>
          <div className="chatheader__searchbar">
            <input
              icon="search"
              placeholder="Search for Messages"
              value={searchTerm}
              onChange={handleSearchMessages}
              loading={searching}
              className="chatheader__searchbar-input"
            />
            <div className="chatheader__searchbar-searchicon">
              <svg
                aria-hidden="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="chatheader__items-right">
            <Tooltip title="Videocall" arrow>
              <Link to="/video" target="_blank" className="link__icon">
                <VideocamIcon style={{ fontSize: 26 }} />
              </Link>
            </Tooltip>
            {darkMode.value === true ? (
              <Tooltip title="Light Mode" arrow>
                <Brightness7Icon
                  style={{ fontSize: 24 }}
                  onClick={darkMode.disable}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Dark Mode" arrow>
                <Brightness4Icon
                  style={{ fontSize: 24 }}
                  onClick={darkMode.enable}
                />
              </Tooltip>
            )}
            <Tooltip title="Toggle MetaPanel">
              <svg
                x="0"
                y="0"
                aria-hidden="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15Z"
                  fill="currentColor"
                ></path>
              </svg>
            </Tooltip>
            <Tooltip title="Github Repo" arrow>
              <a
                href="https://github.com/sumit298/bca-project"
                target="_blank"
                className="link__icon"
                rel="noopener noreferrer"
              >
                <GitHubIcon style={{ fontSize: 26 }} />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}
