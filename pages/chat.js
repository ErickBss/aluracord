// Sua lógica vai aqui
/*  
      -User text in the field
      -Click on Enter to send
      -the message has to be received for the other person

      //Dev
      [] OnChange and useState for the send
      [] Messaages List
  */
// ./Sua lógica vai aqui

import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import { GrClose } from "react-icons/gr";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";

import appConfig from "../config.json";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwMjkwOSwiZXhwIjoxOTU4ODc4OTA5fQ.kk5rMFsZWOwNaH4E2sOfRYa1qZBFnNjS2sc8nsUkCTs";
const SUPABASE_URL = "https://clesufzjbejwnylajnyj.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  const [message, setMessage] = React.useState("");
  const [messagesList, setMessagesList] = React.useState([]);
  // above is the state for check the render of API
  const [render, setRenderStatus] = React.useState(undefined);
  const router = useRouter();
  const username = router.query.username;

  React.useEffect(() => {
    supabaseClient
      .from("messages")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        console.log(data);
        setMessagesList(data);
        setRenderStatus(true);
      });
  }, []);

  function handleNewMessage(newMessage) {
   let id = messagesList[0].id + 1;
   console.log('Id:',id);
    const message = {
      id: id ,
      de: username,
      texto: newMessage,
    };

    console.log("Message Id:", message);
    setMessage("");

    supabaseClient
      .from("messages")
      .insert([message])
      .then(({ data }) => {
        setMessagesList([data[0], ...messagesList]);
      });
  }

  const  handleTaskRemove=  async (messageId) => {
    console.log(messageId);
    try{
      await supabaseClient.from("messages").delete().match({ id: messageId });
      const newMessagesList = messagesList.filter(
        (message) => message.id !== messageId
      );
      setMessagesList(newMessagesList);

    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      {!render ? (
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(https://images.unsplash.com/photo-1533681018184-68bd1d883b97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundBlendMode: "multiply",
            color: appConfig.theme.colors.neutrals["000"],
            filter: "blur(5px)",
            webkitFilter: "blur(5px)",
          }}
        ></Box>
      ) : (
        <Box
          styleSheet={{
            transition: "1s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(https://images.unsplash.com/photo-1533681018184-68bd1d883b97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundBlendMode: "multiply",
            color: appConfig.theme.colors.neutrals["000"],
          }}
        >
          <Box
            styleSheet={{
              transition: "1s",
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              flex: 1,
              boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
              border: "3px solid #df1938 ",
              borderRadius: "10px",
              backgroundColor: "rgba(17, 26, 23,0.7)",
              height: "100%",
              maxWidth: "70%",
              maxHeight: "80vh",
              padding: "32px",
            }}
          >
            <Header />
            <Box
              styleSheet={{
                position: "relative",
                display: "flex",
                flex: 1,
                height: "80%",
                backgroundColor: "rgb(177, 179, 174)",
                flexDirection: "column",
                borderRadius: "5px",
                padding: "16px",
              }}
            >
              <MessageList
                messages={messagesList}
                handleTaskRemove={handleTaskRemove}
              />
              {/*   {messagesList.map((actualMessage) => {
            return (
              <li key={actualMessage.id}>
                {actualMessage.from} : {actualMessage.text}
              </li>
            );
          })} */}
              <Box
                as="form"
                styleSheet={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  value={message}
                  onChange={(e) => {
                    let newMessage = e.target.value;
                    setMessage(newMessage);
                  }}
                  /* find which key the user clicked */
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleNewMessage(message);
                    }
                  }}
                  placeholder="Insira sua mensagem aqui..."
                  type="textarea"
                  styleSheet={{
                    width: "100%",
                    border: "0",
                    resize: "none",
                    borderRadius: "5px",
                    padding: "6px 8px",
                    backgroundColor: "rgb(17, 26, 23)",
                    marginRight: "12px",
                    color: appConfig.theme.colors.neutrals[200],
                  }}
                />
                <Button
                  onClick={() => {
                    if (message.length > 0) {
                      handleNewMessage(message);
                    }
                  }}
                  label="Enviar"
                  styleSheet={{
                    cursor: "pointer",
                    padding: "15px 30px",
                    marginBottom: "8px",
                    borderRadius: "7px",
                    backgroundColor: "rgb(209, 17, 48)",
                    color: appConfig.theme.colors.neutrals["200"],
                    fontWeight: "bold",
                    transition: "0.5s",
                    hover: {
                      backgroundColor: "rgb(209, 17, 48)",
                      border: "none",
                      padding: "15px 35px",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["700"],
        fontWeight: "bold",
        marginBottom: "16px",
      }}
    >
      {props.messages.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              maxWidth: "100%",
              transition: "0.3s",
              fontWeight: "500",
              hover: {
                fontWeight: "bold",
                backgroundColor: appConfig.theme.colors.neutrals[700],
                color: appConfig.theme.colors.neutrals["000"],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  transform: "translateY(6px)",
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  display: "inline-block",
                  margin: "0 5px",
                }}
                src={`https://github.com/${message.de}.png`}
              />
              <Text
                tag="strong"
                styleSheet={{
                  fontWeight: "600",
                }}
              >
                {message.de}
              </Text>

              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: "rgb(130, 142, 94)",
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
                <GrClose
                  style={{
                    type: "button",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    float: "right",
                    margin: "10px 10px 0 0",
                  }}
                  onClick={() => {
                    props.handleTaskRemove(message.id);
                  }}
                />
              </Text>
            </Box>
            {message.texto}
          </Text>
        );
      })}
    </Box>
  );
}
