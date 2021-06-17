import React from 'react'
import { Image } from 'semantic-ui-react'
import moment from 'moment'
import './Message.scss'
import { Avatar } from '@material-ui/core'
import ReactLinkify from 'react-linkify'

const isOwnUser = (message, user) =>
  message.user.id === user.uid ? 'message__self' : ''

const timeFromNow = (timestamp) => moment(timestamp).fromNow()

export default function Message({ message, user }) {
  function checkURL(url) {
    return(url?.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
  
  const isImage = (message) =>
    message.hasOwnProperty('image') && !message.hasOwnProperty('content')

  const contentRendered = isImage(message) ? (
    <Image src={message.image} style={{ padding: ' 0.7em 0' }} />
  ) : checkURL(message.content) ? (
    <img src={message.content} alt={message.content} />
  ) : (
    <p className="content">{message.content}</p>
  )

  return (
    <div className="message">
      <ReactLinkify>
        <Avatar src={message.user.avatar} />
        <div className={isOwnUser(message, user)}>
          <div className="message__info">
            <h4>
              {message.user.name}
              <span className="message__timestamp">
                {timeFromNow(message.timestamp)}
              </span>
            </h4>

            {contentRendered}
          </div>
        </div>
      </ReactLinkify>
    </div>
  )
}
