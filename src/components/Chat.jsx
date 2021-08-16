import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoProfile from "../assets/images/no-profile.png"
import Babbino from "../assets/images/babbino.png"

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     maxWidth: '36ch',
//     backgroundColor: theme.palette.background.paper,
//   },
//   inline: {
//     display: 'inline',
//   },
// }));

const Chat = (props) => {
  const isQuestion = props.type === 'question' 
  const classes = isQuestion ? 'p-chat__row' : "p-chat__reverse";

  return (
    <ListItem className={ classes }>
        <ListItemAvatar>
        {isQuestion ? (
          <Avatar alt="icon" src={ Babbino } />
          ) : (
          <Avatar alt="icon" src={ NoProfile } />
        )}
        </ListItemAvatar>
      <div className="p-chat__bubble">
        { props.text }
      </div>
      </ListItem>
  )
}

export default Chat