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
  console.log(typeof message.content)
  function validURL(str) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // fragment locator
    return !!pattern.test(str)
  }
  const isImage = (message) =>
    message.hasOwnProperty('image') && !message.hasOwnProperty('content')

  const contentRendered = isImage(message) ? (
    <Image src={message.image} style={{ padding: ' 0.7em 0' }} />
  ) : validURL(message.content) ? (
    <img src={message.content} alt="content" />
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
