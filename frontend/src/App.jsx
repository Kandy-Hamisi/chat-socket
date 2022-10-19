import React, { useState } from 'react'
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io("http://localhost:5000");

const App = () => {

  const [ username, setUsername ] = useState("");
  const [ showChats, setShowChats ] = useState(false);


  const handleJoinRoom = (e) => {
    if (username !== "") {
      // emit the event for joining the room
      socket.emit("join_room", { username });
      setShowChats(true);
    }
    e.preventDefault();
  }

  return (
    <div>
      <h1>The Kandy Signal App</h1>
      {!showChats ? (<div className='form-wrapper'>
        <form onSubmit={handleJoinRoom}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              id="username"
              placeholder='Your Username...'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type='submit'>Join Room</button>
          </div>
        </form>
      </div>) :
      <Chat username={username} socket={socket }/>}
    </div>
  )
}

export default App