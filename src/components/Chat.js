import React, { useState } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import './css/Chat.css'

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
  }

  return (<>
<div className="chatbox">
    <form onSubmit={sendMessage}>

      <textarea type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
<div className="submitbtn">
      <button className="submitbtntext" type="submit" disabled={!formValue}>Send Message</button>
 </div>
    </form>
    </div>
  </>)
}