import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import { getFromLocalStorage, addToLocalStorage } from "../../helpers/localStorage";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const SingleChat = () => {
  const [selectedTrip, setSelect] = useState(getFromLocalStorage('selectedTrip'))
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(selectedTrip.messages);
  const [currentUser, setCurrentUser] = useState({
    userId: '1',
    userName: 'MyTestUser'

  })


  // useEffect(()=>{
  //   setSelect(getFromLocalStorage('selectedTrip'));
  //   setMessages(selectedTrip.messages)
  // },[])

  const handleSend = (e) => {
    e.preventDefault();
    setMessages([...messages, {
      message: input,
      "time": new Date(),
      "userId": "",
      "userName": "MyTestUser",

    }]);
    setInput("");
  };
  if (messages) {
    return (
      <Container>
        <Typography p={2}>
          YOU JOINED {selectedTrip.trip_title} ON 08/21/2020
        </Typography>
        {messages.map((message) => {
          let url
          let isUser = true
          if (message.userName === 'admin') {
            url = selectedTrip.image[0]
            isUser = false

          } else {
            url = "https://images.pexels.com/photos/7533347/pexels-photo-7533347.jpeg?auto=compress&cs=tinysrgb&w=800"
          }
          return message.userName ? (
            <Box
              sx={{
                display: "flex",
                
                justifyContent: isUser ? "flex-end" : "flex-start",
                flexGrow: 1,
                mb: 2,
                maxHeight: '60%',
                overflowY: 'auto'
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  backgroundColor: isUser ? "primary.light" : "secondary.light",
                  borderRadius: isUser ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start"
                  }}
                >
                  <Avatar
                    className="chatScreen__image"
                    alt={message.userName}
                    src={url}
                  />
                  <Typography sx={{ margin: '1em' }}>{message.userName}</Typography>
                </Box>

                <Typography className="chatScreen__text">{message.message}</Typography>

              </Paper>

            </Box>
          ) : (
            <div className="chatScreen__message">
              <p>{message.userName}</p>
              <p className="chatScreen__owntext">{message.message}</p>
            </div>
          )
        }

        )}
        <Box sx={{
          backgroundColor: "background.default",

          display: 'flex', flexDirection: 'row',
          position: 'sticky',
          bottom: 0,
        }}>


          <TextField
            fullWidth
            size="small"
            placeholder="Type a message"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />


          <Button

            size="large"
            color="success"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSend}
            sx={{ marginLeft: '1em' }}
          >

          </Button>


        </Box>

      </Container>
    )
  } else {
    return (
      <>no messages</>
    )
  }


};

export default SingleChat;

// [
//   {
//     name: "Jason",
//     image:
//       "https://images.pexels.com/photos/7533347/pexels-photo-7533347.jpeg?auto=compress&cs=tinysrgb&w=800",
//     message: "Hey",
//   },
//   {
//     name: "Jason",
//     image:
//       "https://images.pexels.com/photos/7533347/pexels-photo-7533347.jpeg?auto=compress&cs=tinysrgb&w=800",
//     message: "Time for vacay",
//   },
//   {
//     message: "yo",
//   },
// ]