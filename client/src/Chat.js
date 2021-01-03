import React from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { MoreVert, SearchOutlined } from '@material-ui/icons';
import { Mood, AttachFile } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';

function Chat({ messages }) {
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${!message.received && "chat__reciever"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">{message.timestamp}</span>
                </p>
                ))}
                

                <p className="chat__message chat__reciever">
                    <span className="chat__name">George</span>
                    This is a message
                    <span className="chat__timestamp">
                        {new Date().toLocaleTimeString('en-US').substring(0,4) + " " +
                        new Date().toLocaleTimeString('en-US').substring(8)}
                    </span>
                </p>
            </div>
            
            <div className="chat__footer">
                <Mood />
                <AttachFile />
                <form>
                    <input placeholder="Type a message"
                    type="text"/>
                    <button type="submit">Send</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
