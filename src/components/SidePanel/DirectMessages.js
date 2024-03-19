import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  //  Menu,
   Icon } from 'semantic-ui-react'

import { setChannel, setPrivateChannel } from '../../store/channels/actions'
import firebase from '../../firebase'
// import VideoChat from '../../components/VideoChat'
// import { Link } from 'react-router-dom'

function DirectMessages({ currentUser }) {
  const [users, setUsers] = useState([])
  const [userRef] = useState(firebase.database().ref('users'))
  const [connectedRef] = useState(firebase.database().ref('.info/connected'))
  const [presenceRef] = useState(firebase.database().ref('presence'))
  const [activeChannel, setActiveChannel] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const addListeners = (currentUserId) => {
      userRef.on('child_added', (snap) => {
        if (currentUser.uid !== snap.key) {
          let user = snap.val()
          user['uid'] = snap.key
          user['status'] = 'offline'
          setUsers((users) => [...users, user])
        }
      })

      connectedRef.on('value', (snap) => {
        if (snap.val() === true) {
          const ref = presenceRef.child(currentUserId)
          ref.set(true)
          ref.onDisconnect().remove((err) => {
            if (err !== null) {
              console.log(err)
            }
          })
        }
      })
    }

    if (currentUser) {
      addListeners(currentUser.uid)
    }
    return () => {
      userRef.off()
      connectedRef.off()
    }

  }, [userRef, connectedRef])

  useEffect(() => {
    const setUserStatues = (userId, connected = true) => {
      setUsers((prevUsers) => {
        return prevUsers.map((user) => {
          if (user.uid === userId) {
            user['status'] = `${connected ? 'online' : 'offline'}`
          }
          return user
        })
      })
    }
    presenceRef.on('child_added', (snap) => {
      if (currentUser.uid !== snap.key) {
        setUserStatues(snap.key)
      }
    })

    presenceRef.on('child_removed', (snap) => {
      if (currentUser.uid !== snap.key) {
        setUserStatues(snap.key, false)
      }
    })
    return () => {
      presenceRef.off()
    }

  }, [])

  const isUserOnline = (user) => user.status === 'online'

  const changeChannel = (user) => {
    const channelId = getChannelId(user.uid)
    const channelData = {
      id: channelId,
      name: user.name,
    }
    dispatch(setChannel(channelData))
    dispatch(setPrivateChannel(true))
    setActiveChannel(user.uid)
  }

  const getChannelId = (userId) => {
    const currentUserId = currentUser.uid
    // Check for creating a unique path...
    return userId < currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`
  }

  return (
    <div>
      
      <p className="menu-label">
        <span>
          <Icon name="mail" /> Direct Messages
        </span>{' '}
        ({users.length})
      </p>
      {users.map((user, index) => {
        return (
          <div
            key={user.uid}
            active={activeChannel === user.uid}
            onClick={() => changeChannel(user)}
            className="menu-item-label"
            // style={{ color: "blue",opacity: 0.8, fontStyle: 'italic' }}
          >
            <Icon name="at"/> {user.name}
            <Icon className="active__icon" name="circle" color={isUserOnline(user) ? 'green' : 'red'} />
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(DirectMessages)
