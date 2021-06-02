import React from 'react'
import { Header, Segment, Input, Icon } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './MessageHeader.css';

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
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
      <h3
       style={{ marginBottom: 0 }}>
        <span>
          {channelName}
          {!isChannelPrivate && (
            <Icon
              onClick={handleStarChannel}
              name={isStarred ? 'star' : 'star outline'}
              color={isStarred ? 'yellow' : 'black'}
            />
          )}

        </span>
        <span>{users}</span>
      </h3>
      </div>
      <div className="chatHeader__right">
      <Header floated="right">
        <input
          size="mini"
          icon="search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchMessages}
          loading={searching}
          className="chatHeader__search"
        />
      </Header>
      </div>
    </div>
  )
}
