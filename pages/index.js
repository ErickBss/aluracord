import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import React from "react";
import { useRouter } from "next/router";
import { IoPeopleSharp } from "react-icons/io5";
import { GoRepo } from "react-icons/go";

import appConfig from "../config.json";
import { FaBold } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

function Title(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>
        {`
          ${Tag} {
            /* $ it does a style be dynamic, in other words, a style recieve a param */
            font-size: 30px;
            font-weight: 600;
            color: ${appConfig.theme.colors.neutrals["000"]};
          }
        `}
      </style>
    </>
  );
}

function Informations() {
  return (
    <style jsx>
      {`
        div {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      `}
    </style>
  );
}

export default function PaginaInicial() {
  const router = useRouter();
  const [username, setUsername] = React.useState("ErickBss");
  const [userfollowers, setFollowers] = React.useState("");
  const [userep, setRep] = React.useState("");
  const [userbio, setBio] = React.useState("");

  const traficdata = fetch(`https://api.github.com/users/${username}`)
    .then(function (response) {
      return response.json(); //convert the http format for json
    })
    .then(function (jsonResponse) {
      console.log(jsonResponse);
      let followers = jsonResponse.followers;
      let reps = jsonResponse.public_repos;
      let bio = jsonResponse.bio;
      setFollowers(followers);
      setRep(reps);
      setBio(bio);
      return jsonResponse;
    });

  function IconFollowers() {
    return (
      <IconContext.Provider
        value={{ style: { fontSize: "1rem", color: appConfig.theme.colors.neutrals[200] } }}
      >
        <IoPeopleSharp />
      </IconContext.Provider>
    );
  }

  function IconRepos() {
    return (
      <IconContext.Provider
        value={{ style: { fontSize: "1rem", color: appConfig.theme.colors.neutrals[200] } }}
      >
        <GoRepo />
      </IconContext.Provider>
    );
  }
  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: "10%",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1524532787116-e70228437bbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              // render a new page
              router.push("/chat");
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name + " (" + username + ")"}
            </Text>

            <TextField
              onChange={(e) => {
                let minCharacters = e.target.value;
                if (minCharacters.length > 2) {
                  const newUser = e.target.value;
                  setUsername(newUser);
                }
                console.log("not reached");
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
              styleSheet={{
                fontWeight: "Bold",
              }}
            />

            <Button
              type="submit"
              label="Entrar"
              fullWidth
              styleSheet={{
                color: appConfig.theme.colors.neutrals["700"],
                fontWeight: "700",
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              maxWidth: "300px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              maxHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                maxWidth: "150px",
                borderRadius: "50%",
                boxShadow:
                  " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              }}
              src={`https://github.com/${username}.png`}
            />
            <Box
              styleSheet={{
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Text
                variant="body4"
                styleSheet={{
                  textAlign: "center",
                  cursor: "default",
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                  color: appConfig.theme.colors.neutrals[200],
                  padding: "6px 10px",
                  borderRadius: "5px",
                }}
              >
                <h2>{username}</h2>
              </Text>

              <Text
                variant="body4"
                styleSheet={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  cursor: "default",
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                  borderLeft: "8px solid #eee96e",
                  padding: "3px 3px",
                  borderRadius: "5px",
                  marginLeft: "10%",
                  fontWeight: "Bold",
                  fontSize: "0.8rem",
                }}
              >
                <IconFollowers />
                <p>|</p>
                {userfollowers}
              </Text>
              <Text
                variant="body4"
                styleSheet={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  cursor: "default",
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                  borderLeft: "8px solid #eee96e",
                  padding: "3px 3px",
                  borderRadius: "5px",
                  marginLeft: "10%",
                  fontWeight: "Bold",
                  fontSize: "0.8rem",
                }}
              >
                <IconRepos />
                <p>|</p>
                {userep}
              </Text>
              <Text
                variant="body4"
                styleSheet={{
                  display: "flex",
                  justifyContent: "space-around",
                  textAlign: "center",
                  cursor: "default",
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                  border: "2px solid #eee96e",
                  padding: "5px",
                  borderRadius: "5px",
                  marginLeft: "10%",
                  fontWeight: "Bold",
                  fontSize: "0.8rem",
                }}
              >
                {userbio}
              </Text>
            </Box>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
