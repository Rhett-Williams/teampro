import React from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './css/users.css'


const auth = firebase.auth();

export default function ChatBox() {

  
  const firestore = firebase.firestore();
  const usersRef = firestore.collection('users');
  const query = usersRef.orderBy('createdAt').limit(25);

  const [users] = useCollectionData(query, {idField: 'id'});


  return (
    <div>
    <div>
      {users && users.map(msg => <ChatMessage key={msg.id} user={msg} />)}
    </div>
    </div>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.user;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
  <p>{text}</p>
  </div>
  )
}