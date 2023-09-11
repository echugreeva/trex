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
    if(messages){
      setMessages([...messages, {
        message: input,
        "time": new Date(),
        "userId": "",
        "userName": "MyTestUser",
  
      }]);
    }else {
      setMessages([{
        message: input,
        "time": new Date(),
        "userId": "",
        "userName": "MyTestUser",
      }])
    }

    
    setInput("");
  };
  if (messages) {
    return (
      <Container sx={{height:'100%'}}>
        <Typography p={2}>
          YOU JOINED {selectedTrip.trip_title} ON 08/21/2020
        </Typography>
        <Container disableGutters sx={{height:'75%', overflowY:'auto'}}>
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
                // minHeight: '60%',
                overflowY: 'auto',
                
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
                    alt={message.userName}
                    src={url}
                  />
                  <Typography sx={{ margin: '1em' }}>{message.userName}</Typography>
                </Box>

                <Typography >{message.message}</Typography>

              </Paper>

            </Box>
            
          ) : (
            
            <Box>
              <Typography>{message.userName}</Typography>
              <Typography >{message.message}</Typography>
            </Box>
            
          )
        }

        )}
        </Container>

        <Box
          sx={{
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
      <Container sx={{display: 'flex', flexDirection: 'column', alignContent: 'space-between', height:'100%'}} >
        <Typography p={2}>
          YOU JOINED {selectedTrip.trip_title} ON 08/21/2020
        </Typography>
        <Container disableGutters sx={{height:'75%', overflowY:'auto'}}></Container>
        <Box sx={{
          backgroundColor: "background.default",

          display: 'flex', flexDirection: 'row',
          position: 'sticky',
          // top:'90%'
          bottom: 0
          // alignSelf: 'flex-end',
          
      
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
  }


};

export default SingleChat;
