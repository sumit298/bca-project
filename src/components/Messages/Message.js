import React from 'react'
import { Image } from 'semantic-ui-react'
import moment from 'moment'
import './Message.scss'
import { Avatar } from '@material-ui/core'
import ReactLinkify from 'react-linkify'

const isOwnUser = (message, user) =>
  message.user.id === user.uid ? 'message__self' : ''

const timeFromNow = (timestamp) => moment(timestamp).calendar()

export default function Message({ message, user }) {
  const componentDecorator = (href, text, key) => (
    <a
      style={{ fontWeight: 'bold' }}
      href={href}
      rel="noopener noreferrer"
      key={key}
      target="_blank"
    >
      {text}
    </a>
  )
  function checkURL(url) {
    return url?.match(/\.(jpeg|jpg|gif|png)$/) != null
  }

  function getId(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url?.match(regExp)

    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = getId(message.content)

  const isImage = (message) =>
    message.hasOwnProperty('image') && !message.hasOwnProperty('content')

  const contentRendered = isImage(message) ? (
    <Image src={message.image} style={{ padding: ' 0.7em 0' }} />
  ) : checkURL(message.content) ? (
    <img src={message.content} alt={message.content} />
  ) : videoId ? (
    <iframe
      width="700"
      height="400"
      frameBorder="0"
      allowFullScreen={true}
      src={`//www.youtube.com/embed/${videoId}`}
      title="youtube video"
    ></iframe>
  ) : (
    <p className="content">{message.content}</p>
  )

  // const contentFunc = () => {}

  return (
    <div className="message">
      <ReactLinkify componentDecorator={componentDecorator}>
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
