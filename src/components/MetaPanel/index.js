import React from 'react'
import {
  Segment,
  Accordion,
  Header,
  Icon,
  Image,
  List,
  ListItem,
  Sidebar,
} from 'semantic-ui-react'
import './metaPanel.scss'

export default function MetaPanel({
  isPrivateChannel,
  currentChannel,
  userPosts,
}) {
  const [activeIndex, setActiveIndex] = React.useState(0)

  const handleAccordionChange = (event, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  const renderUserPosts = () => {
    return Object.entries(userPosts)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value], i) => {
        return (
          <ListItem className="metalist" key={key}>
            <Image
              style={{ height: '2.5rem', width: '2.5rem' }}
              avatar
              src={value.avatar}
            />
            <List.Content className="metalist__content">
              <List.Header as="a" style={{ fontSize: '1.2rem' }}>
                {key}
              </List.Header>
              <List.Description
                style={{ fontSize: '1rem', color: '#fff' }}
                as="p"
              >
                {getPostText(value.count)}
              </List.Description>
            </List.Content>
          </ListItem>
        )
      })
  }

  const getPostText = (count) =>
    count > 1 || count === 0 ? `${count} posts` : `${count} post`

  if (isPrivateChannel) {
    return null
  }

  return (
    <div className="metapanel" loading={!currentChannel}>
      <h3>About # {currentChannel && currentChannel.name}</h3>

      <div>
        <p>{currentChannel && currentChannel.description}</p>
        <h4>
          <Icon name="user circle" />
          Top posters
        </h4>
        <p>
          <List>{userPosts && renderUserPosts(userPosts)}</List>
        </p>
        <div className="meta__createdBy">
          <h4>
            <Icon name="pencil alternate" />
            Created By
          </h4>
          <p>
            <img src={currentChannel && currentChannel.createdBy.avatar} />
            <h3>{currentChannel && currentChannel.createdBy.name}</h3>
          </p>
        </div>
      </div>
    </div>
  )
}
