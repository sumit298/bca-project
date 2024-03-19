import React, { useState, useEffect, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { Picker, emojiIndex } from 'emoji-mart'
import ReactGiphySearch from 'react-giphy-searchbox'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import GifIcon from '@material-ui/icons/Gif'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import firebase from '../../firebase'
import UploadFileModal from './UploadFileModal'
import ProgressBar from './ProgressBar'
import './MessageForm.scss'
import 'emoji-mart/css/emoji-mart.css'
import { IconButton } from '@material-ui/core'
import notificationSound from '../Assets/sounds/micSound.mp3'

export default function MessagesForm({
  currentChannel,
  currentUser,
  messagesRef,
  isChannelPrivate,
}) {
  const [message, setMessage] = useState('')
  const [
    ,
    // status
    setStatus,
  ] = useState('IDLE')
  const [
    ,
    // errors
    setErrors,
  ] = useState([])
  const [modal, setModal] = useState(false)
  const [storageRef] = useState(firebase.storage().ref())
  const [typingRef] = useState(firebase.database().ref('typing'))
  const [uploadTask, setUploadTask] = useState(null)
  const [percentUpload, setPercentUpload] = useState(0)
  const [uploadState, setUploadState] = useState('')
  const [pathToUpload, setPathToUpload] = useState('')
  const [emojiPicker, setEmojiPicker] = useState(false)
  const [showGifs, setShowGifs] = useState(false)

  const messageInputRef = useRef(null)

  const notificationAudio = new Audio(notificationSound)

  useEffect(() => {
    // listener for upload task, when it's done; this will be called.
    if (uploadTask !== null) {
      uploadTask.on(
        'state_changed',
        (snap) => {
          const percentage = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          )
          setPercentUpload(percentage)
        },
        (err) => {
          setUploadState('ERROR')
          setErrors((errors) => [...errors, err.message])
        },
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadedUrl) => {
              sendFileMessage(downloadedUrl, pathToUpload)
            })
            .catch((err) => {
              setUploadState('ERROR')
              setErrors((errors) => [...errors, err.message])
            })
        }
      )
    }

    return () => {
      if (uploadTask !== null) {
        uploadTask.cancel()
        setUploadTask(null)
      }
    }
  }, [uploadTask])

  // Gif handler
  const sendFileMessage = (downloadedFileUrl, filePath) => {
    messagesRef()
      .child(filePath)
      .push()
      .set(createMessage(downloadedFileUrl))
      .then(() => {
        setUploadState('DONE')
      })
      .catch((err) => {
        setErrors((errors) => [...errors, err])
      })
  }

  const createMessage = (file = null) => {
    const messageBody = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
    }
    if (file !== null) {
      messageBody['image'] = file
    } else {
      messageBody['content'] = message
    }
    return messageBody
  }

  const resetState = () => {
    setMessage('')
    setErrors((errors) => [])
  }

  const sendMessage = async () => {
    if (message) {
      setStatus('PENDING')
      try {
        notificationAudio.play()
        await messagesRef().child(currentChannel.id).push().set(createMessage())
        await typingRef.child(currentChannel.id).child(currentUser.uid).remove()
        resetState()
        setStatus('RESOLVED')
      } catch (err) {
        console.log('Error while sending message: ', err)
        setStatus('REJECTED')
        setErrors((errors) => [...errors, { message: err.message }])
      }
    } else {
      setErrors((errors) => [...errors, { message: 'Add a message..' }])
    }
  }

  const getFilePath = (channelId) => {
    return isChannelPrivate ? `chat/private/${channelId}` : `chat/public`
  }

  const uploadFile = (file, metaData) => {
    // console.log(file)
    setPathToUpload(currentChannel.id)
    const filePath = `${getFilePath(currentChannel.id)}/${uuid()}.jpg`
    setUploadState('UPLOADING')
    const fileReference = storageRef.child(filePath).put(file, metaData)
    setUploadTask(fileReference)
    // console.log(fileReference)
  }

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      sendMessage()
    }
    if (message) {
      typingRef
        .child(currentChannel.id)
        .child(currentUser.uid)
        .set(currentUser.displayName)
    } else {
      typingRef.child(currentChannel.id).child(currentUser.uid).remove()
    }
  }

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      sendMessage()
    }
    if (message) {
      typingRef
        .child(currentChannel.id)
        .child(currentUser.uid)
        .set(currentUser.displayName)
    } else {
      typingRef.child(currentChannel.id).child(currentUser.uid).remove()
    }
  }

  const handleEmojiPicker = () => {
    setEmojiPicker(!emojiPicker)
  }

  const handleAddEmoji = (emoji) => {
    console.log(emoji)
    const oldMessage = message
    const newMessage = colonToUnicode(` ${oldMessage} ${emoji.colons} `)
    // newMessage
    setMessage(newMessage)
    setShowGifs(false)
    setEmojiPicker(false)

    setTimeout(() => {
      messageInputRef.current.focus()
    }, 0)
  }

  const colonToUnicode = (message) => {
    return message.replace(/:[A-Za-z0-9_+-]+:/g, (x) => {
      x = x.replace(/:/g, '')
      let emoji = emojiIndex.emojis[x]
      if (typeof emoji !== 'undefined') {
        let unicode = emoji.native
        if (typeof unicode !== 'undefined') {
          return unicode
        }
      }
      x = ':' + x + ':'
      return x
    })
  }

  const gifSelectHandler = (gif) => {
    // console.log(gif);
    const newMessage = gif.images.downsized.url
    const filePath = `${newMessage}.jpg`
    createMessage(filePath)

    setMessage(filePath)
    setShowGifs(false)

    setTimeout(() => {
      messageInputRef.current.focus()
    }, 0)
  }

  const openModal = () => setModal(true)

  const closeModal = () => setModal(false)
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  // }
  const channelName = currentChannel.name.toLowerCase()
  return (
    <div className="message__form">
      {showGifs && (
        <ReactGiphySearch
          apiKey={process.env.REACT_APP_GIF_KEY}
          onSelect={gifSelectHandler}
          masonryConfig={[
            { columns: 2, imageWidth: 110, gutter: 5 },
            { mq: '700px', columns: 3, imageWidth: 110, gutter: 5 },
          ]}
        />
      )}
      {/* <img src={gifSrc} alt="newgif" /> */}
      {emojiPicker && (
        <Picker
          set="apple"
          className="emojiPicker"
          title="Pick an emoji"
          emoji="point_up"
          onSelect={handleAddEmoji}
        />
      )}
      <div className="chatsearchbar">
        <div className="chatsearchbar__addicon">
          <IconButton
            onClick={openModal}
            className="icon__button"
            aria-label="settings"
          >
            <AddCircleIcon className="icon__button" style={{ fontSize: 25 }} />
          </IconButton>
        </div>
        <div className="chatsearchbar__input">
          <input
            autoFocus
            placeholder={`Message #${channelName}`}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            ref={messageInputRef}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="chatsearchbar__gifcon">
          <IconButton
            onClick={() => {
              // setEmojiPicker(false)
              setShowGifs(!showGifs)
            }}
            className="icon__button"
            aria-label="settings"
          >
            <GifIcon className="icon__button" style={{ fontSize: 30 }} />
          </IconButton>
        </div>
        <div className="chatsearchbar__emojiicon">
          <IconButton
            // className="icon__button"
            icon={emojiPicker ? 'close' : 'smile outline'}
            content={emojiPicker ? 'close' : null}
            onClick={handleEmojiPicker}
          >
            <InsertEmoticonIcon
              className="icon__button"
              style={{ fontSize: 30 }}
            />
          </IconButton>
        </div>
      </div>

      <UploadFileModal
        open={modal}
        closeModal={closeModal}
        uploadFile={uploadFile}
      />
      <ProgressBar uploadPercent={percentUpload} uploadState={uploadState} />
    </div>
  )
}
