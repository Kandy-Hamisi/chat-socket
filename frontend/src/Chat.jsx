import React, { useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import { addMessage } from '../features/Messages/messageSlice';
import { useDispatch, useSelector } from 'react-redux';

const Chat = ({ username, socket }) => {
    const [ message, setMessage ] = useState("");
    // const [ messageList,  setMessageList ] = useState([]);
    const [ room, setRoom ] = useState("");

    const messageList = useSelector((state) => state.messages.messageList);
    console.log(messageList);
    const dispatch = useDispatch();

    const sendMessage = async (e) => {
        if(message !== "") {
            const messageData = {
                author: username,
                message: message,
                time: new Date(Date.now()).getHours()
                + ":" +
                new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
            dispatch(addMessage(messageData));
            // setMessageList(list => [...list, messageData]);
        }
        setMessage("");

        e.preventDefault();
    }

    useEffect(() => {
        socket.on("receive_message", data => {
            // setMessageList(list => [...list, data]);
            dispatch(addMessage(data));
        });

        // receive the room
        socket.on("receive_room", data => {
            setRoom(data)
        })
    }, [socket]);

  return (
    <div className='chat-wrapper'>
        <div className="chat-header">
            <p>{room}</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className='message-container'>
                {
                    messageList.map((messageContent, index) => {
                        return (
                            <div
                                className='message'
                                key={index}
                                id = {username === messageContent.author ? "you" : "other"}
                            >
                                <div>
                                    <div
                                        className='message-content'
                                    >
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author === username ? "you" : messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </ScrollToBottom>
        </div>
        <form onSubmit={sendMessage} className="chat-footer">
            <input
                type="text"
                name="message"
                id="message"
                placeholder='Start typing...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type='submit'>Send</button>
        </form>
    </div>
  )
}

export default Chat