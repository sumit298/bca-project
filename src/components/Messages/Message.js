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
    <a href={href} rel="noopener noreferrer" key={key} target="_blank">
      {text}
    </a>
  );
  function checkURL(url) {
    return url?.match(/\.(jpeg|jpg|gif|png)$/) != null
  }
  // function matchYoutubeUrl(url) {
  //   var p =
  //     /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
  //   if (url.match(p)) {
  //     return url.match(p)[1]
  //   }
  //   return false
  // }

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
      <ReactLinkify
        componentDecorator={componentDecorator}
      >
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
