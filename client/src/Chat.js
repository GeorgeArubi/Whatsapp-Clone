import React, { useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { MoreVert, SearchOutlined } from '@material-ui/icons';
import { Mood, AttachFile } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios'

function Chat({ messages }) {
    const [input, setInput] = useState('')

    const currentTime = new Date().toLocaleTimeString('en-US').substring(0,5) + " " + new Date().toLocaleTimeString('en-US').substring(8)

    const sendMessage = async (e) => {
        e.preventDefault()

        await axios.post('/messages/new', {
            message: input,
            name: 'Placeholder Name',
            timestamp: currentTime, // Rewrite function for timestamp
            received: false, // Receive message based on the user sending it
        })

        setInput('')
    }

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
            </div>
            
            <div className="chat__footer">
                <Mood />
                <AttachFile />
                <form>
                    <input value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                    type="text"/>
                    <button onClick={sendMessage} type="submit">Send</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
