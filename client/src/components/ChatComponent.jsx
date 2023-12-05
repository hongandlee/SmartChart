import React, { useState, useEffect, useRef } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import styled from "styled-components";
import { palette } from "../styles/GlobalStyles";
import { Container, Header, Wrapper } from "../styles/CommonStyle";

var stompClient = null;

const ChatApp = () => {
  const [username, setUsername] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const messagesContainerRef = useRef(null);

  var colors = [
    // 색상 배열
    "#2196F3",
    "#32c787",
    "#00BCD4",
    "#ff5652",
    "#ffc107",
    "#ff85af",
    "#FF9800",
    "#39bbb0",
    "#b232b2",
    "#8B4F1D",
    "#EA813D",
    "#FF5050",
    "#FF895A",
    "#FFA500",
    "#FFE146",
    "#FF28A7",
    "#FFAAAF",
    "#147814",
    "#64D2D2",
    "#2828CD",
    "#1E82FF",
    "#14D3FF",
  ];

  function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
  }

  const connect = () => {
    setIsConnecting(true);
    let socket = new SockJS("/ws/chat");
    stompClient = over(socket);
    stompClient.connect({}, (frame) => {
      setConnected(true);
      setIsConnecting(false);
      stompClient.subscribe("/topic/public", (sdkEvent) => {
        onMessageReceived(sdkEvent);
      });
      stompClient.send(
        "/app/chat.addUser",
        {},
        JSON.stringify({ sender: username, type: "JOIN" })
      );
    });
  };

  const sendMessage = () => {
    if (stompClient) {
      stompClient.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify({
          sender: username,
          type: "CHAT",
          content: currentMessage,
        })
      );
      setCurrentMessage("");
    }
  };

  const onMessageReceived = (payload) => {
    let message = JSON.parse(payload.body);
    setMessages((messages) => [...messages, message]);
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);
  useEffect(() => {
    // 스크롤을 맨 아래로 이동하는 코드
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container>
      <Wrapper>
        {!connected && !isConnecting && (
          <ConnectionForm>
            <UsernameInput
              type="text"
              placeholder="닉네임을 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <SubmitButton onClick={connect} disabled={!username}>
              채팅 참여
            </SubmitButton>
          </ConnectionForm>
        )}
        {isConnecting && <div>연결 중...</div>}
        {connected && (
          <ChatContainer>
            <ChatContent>
              <MessagesContainer ref={messagesContainerRef}>
                {messages.map((msg, index) => (
                  <MessageRow
                    key={index}
                    isOwnMessage={msg.sender === username}
                  >
                    <Avatar color={getAvatarColor(msg.sender)}>
                      {msg.sender.charAt(0).toUpperCase()}
                    </Avatar>
                    <MessageContent isOwnMessage={msg.sender === username}>
                      {msg.type === "JOIN" && (
                        <div>{msg.sender}님이 입장하셨습니다.</div>
                      )}
                      {msg.type === "LEAVE" && (
                        <div>{msg.sender}님이 떠나셨습니다.</div>
                      )}
                      {msg.type === "CHAT" && (
                        <ChatText>{msg.content}</ChatText>
                      )}
                    </MessageContent>
                  </MessageRow>
                ))}
              </MessagesContainer>
              <InputContainer>
                <MessageInput
                  type="text"
                  placeholder="메시지를 입력하세요"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <SendButton onClick={sendMessage}>전송</SendButton>
              </InputContainer>
            </ChatContent>
          </ChatContainer>
        )}
      </Wrapper>
    </Container>
  );
};

export default ChatApp;

const Avatar = styled.div`
  height: 35px;
  width: 35px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  color: white;
  font-weight: bold;
`;
const MessagesContainer = styled.div`
  padding: 10px;
  height: 100%;
  overflow-y: auto;
`;
const MessageRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.isOwnMessage ? "flex-end" : "flex-start"};
  margin-bottom: 10px;
`;

const MessageContent = styled.div`
  max-width: 60%;
  background: ${(props) =>
    props.isOwnMessage ? `${palette.primary.blue}` : "#f0f0f0"};
  color: ${(props) =>
    props.isOwnMessage ? "#ffff" : `${palette.primary.black}`};

  padding: 8px 12px;
  border-radius: 12px;
  margin-left: ${(props) => (props.isOwnMessage ? "10px" : "0")};
  margin-right: ${(props) => (props.isOwnMessage ? "0" : "10px")};
`;

const ChatText = styled.div`
  word-break: break-word;
`;

const ConnectionForm = styled.div`
  min-width: 1000px;
  min-height: 800px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const UsernameInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  width: 80%;
`;
const SubmitButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  padding: 15px;
  background-color: ${palette.primary.blue};
  color: white;
  cursor: pointer;
  width: 25%;
  align-self: center;
  align-items: center;
  justify-content: center;
  border: none;
  margin-top: 20px;
  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;
const ChatContainer = styled.div`
  width: 1000px;
  height: 800px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ChatContent = styled.div`
  width: 100%;
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  background-color: antiquewhite;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 16px;
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 12px;
  font-size: 16px;
  background-color: ${palette.primary.blue};
  color: white;
  cursor: pointer;
  border: none;
`;
