import React from 'react'
import moment from 'moment'
import './Message.scss'
import { Avatar } from '@material-ui/core'
import ReactLinkify from 'react-linkify'
import ReactPlayer from 'react-player'

const isOwnUser = (message, user) =>
  message.user.id === user.uid ? 'message__self' : ''

const timeFromNow = (timestamp) => moment(timestamp).calendar()

export default function Message({ message, user }) {
  // const [playing, setPlaying] = React.useState(true);
  // const videoRef = React.useRef(null);
  // const handlePlayPause = ()=>{
  //   setPlaying(!playing)
  // }
  // const handlePlay = ()=>{
  //   console.log('onPlay');
  //   setPlaying(true)
  // }
  // const handlePause = ()=>{
  //   console.log('onPause');
  //   setPlaying(false)
  // }
  // React.useEffect(()=>{
  //   window.addEventListener('scroll', (handlePlayPause))
  //   return()=>{
  //     window.removeEventListener('scroll', handlePlayPause);
  //   }
  // },[])
  // const startVideo = ()=>{
  //   videoRef.current.pause();
  //   setPlaying(false);
  // }
  // const pauseVideo = ()=>{
  //   videoRef.current.play();
  //   setPlaying(true);
  // }
  // const handleScroll = ()=>{
  //   if(playing){
  //     pauseVideo();
  //   }
  // }
  // const handleVideoPress = ()=>{
  //   if(playing){
  //     startVideo()
  //   }
  //   else{
  //     pauseVideo();
  //   }
  // }
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

  const ReactPlayerYoutube = () => {
    return (
      <ReactPlayer
        url={`//www.youtube.com/embed/${videoId}`}
        config={{
          youtube: {
            playerVars: { showinfo: 1 },
          },
        }}
        playing={true}
        light={`https://img.youtube.com/vi/${videoId}/0.jpg`}
       
        playsinline={true}
        // onPause={}
        // ref={videoRef}
        
      />
    )
  }
  const contentRendered = isImage(message) ? (
    <img
      src={message.image}
      className="content__image"
      style={{ padding: ' 0.5em 0' }}
      alt={message.content}
    />
  ) : checkURL(message.content) ? (
    <img
      className={'content__image'}
      src={message.content}
      alt={message.content}
    />
  ) : videoId ? (
    <ReactPlayerYoutube />
  ) : (
    // <iframe
    //   width="700"
    //   height="400"
    //   frameBorder="0"
    //   allowFullScreen={true}
    //   src={`//www.youtube.com/embed/${videoId}`}
    //   title="youtube video"
    // ></iframe>
    <p className="content">{message.content}</p>
  )

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
