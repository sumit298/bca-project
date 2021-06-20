import React, { useEffect, useState } from 'react'
import { Icon } from 'semantic-ui-react'
import { useDispatch
  //  useSelector 
  } from 'react-redux'
import { useIsMount } from '../../hooks/isMount'
import './sidePanel.scss';

import {
  setChannel as setChannelAction,
  setPrivateChannel,
} from '../../store/channels/actions'
import firebase from '../../firebase'

export default function Starred({ currentUser }) {
  const [starredChannels, setStarredChannels] = useState([])
  const [userRef] = useState(firebase.database().ref('users'))
  const dispatch = useDispatch()
  const isMount = useIsMount()

  useEffect(() => {
    const addStartoChannel = async ()=>{
    isMount && await userRef
      .child(currentUser.uid)
      .child('starred')
      .on('child_added', snap => {
        const starredChannel = { id: snap.key, ...snap.val() }
        setStarredChannels(starredChannels => [
          ...starredChannels,
          starredChannel,
        ])
      })
    }
    addStartoChannel();
    return () => {
      userRef.child(`${currentUser.uid}/starred`).off()
    }
    
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [starredChannels, userRef])

  useEffect(() => {
    userRef
      .child(currentUser.uid)
      .child('starred')
      .on('child_removed', snap => {
        const unStarredChannel = { id: snap.key, ...snap.val() }
        const filteredChannels = starredChannels.filter(
          sc => sc.id !== unStarredChannel.id
        )
        setStarredChannels(filteredChannels)
      })
    return () => {
      userRef.child(`${currentUser.uid}/starred`).off()
    }
    /* eslint-disable react-hooks/exhaustive-deps */

  }, [starredChannels])

  const renderStarredChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <p
        className="menu-item-label"
        key={channel.id}
        onClick={() => channelClickHandler(channel)}
        name={channel.name}
        // style={{ opacity: 0.7 }}
      >
        <Icon name="hashtag"/> {channel.name}
      </p>
    ))

  const channelClickHandler = channel => {
    // setActiveChannel(channel.id)
    // setCurrentChannel(channel)
    dispatch(setPrivateChannel(false))
    dispatch(setChannelAction(channel))
  }
  return (
    <div style={{ paddingBottom: '2rem' }}>
      <p className="menu-label">
        <span>
          <Icon name="star" /> Channels
        </span>{' '}
        ({starredChannels.length})
      </p>
      {renderStarredChannels(starredChannels)}
    </div>
  )
}
