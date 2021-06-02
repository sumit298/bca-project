import React from 'react'
import { Comment, Image } from 'semantic-ui-react'
import moment from 'moment'
import './Message.css'
import { Avatar } from '@material-ui/core'

const isOwnUser = (message, user) =>
  message.user.id === user.uid ? 'message__self' : ''

const timeFromNow = (timestamp) => moment(timestamp).fromNow()

export default function Message({ message, user }) {
  const isImage = (message) =>
    message.hasOwnProperty('image') && !message.hasOwnProperty('content')

  return (
    <div className="message">
      {/* <Comment style={{color: "red !important"}}> */}
      <Avatar src={message.user.avatar} />
      <div className={isOwnUser(message, user)}>
        <div className="message__info">
          <h4>{message.user.name}</h4>
          <span>{timeFromNow(message.timestamp)}</span>

          {isImage(message) ? (
            <Image src={message.image} style={{ padding: '1em' }} />
          ) : (
            <Comment.Text>{message.content}</Comment.Text>
          )}
          {/* {message ? <p>{message}</p> : <img src={gifUrl} alt="gif" />} */}
        </div>
      </div>
    </div>
  )
}
