import React from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { MoreVert, SearchOutlined } from '@material-ui/icons';
import { Mood, AttachFile } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';

function Chat() {
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
                <p className="chat__message">
                    <span className="chat__name">Gbenga</span>
                    This is a message
                    <span className="chat__timestamp">
                        {new Date().toLocaleTimeString('en-US').substring(1,5) + " " +
                        new Date().toLocaleTimeString('en-US').substring(9)}
                    </span>
                </p>

                <p className="chat__message chat__reciever">
                    <span className="chat__name">George</span>
                    This is a message
                    <span className="chat__timestamp">
                        {new Date().toLocaleTimeString('en-US').substring(1,5) + " " +
                        new Date().toLocaleTimeString('en-US').substring(9)}
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