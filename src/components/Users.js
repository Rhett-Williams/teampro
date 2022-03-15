import React from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Text, Flex, Spacer, Checkbox } from '@chakra-ui/react'


const auth = firebase.auth();

export default function ChatBox() {

  
  const firestore = firebase.firestore();
  const usersRef = firestore.collection('users');
  const query = usersRef.orderBy('createdAt').limit(25);

  const [users] = useCollectionData(query, {idField: 'id'});


  return (
    <div>
    <div>
      {users && users.map(msg => <DisplayUsers key={msg.id} user={msg} />)}
    </div>
    </div>
  )
}

function DisplayUsers(props) {
  const { text, uid } = props.user;
  if (uid !== auth.currentUser.uid) {
    return (
      <Flex w="90%" h="60px" p="10px" style={{position: "relative", left: "17px", width: "90%"}}>
      <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-user-interface-kiranshastry-lineal-kiranshastry.png" style={{ height: "50px"}} alt="userIcon"/>
      <Text style={{ position: "absolute", top: "50%", left: "20%", transform: "translate(0%, -50%)" }}>{text}</Text>
      <Spacer/>
      <Checkbox size='lg' style={{ color: "#002E27"}} value={uid}></Checkbox>
      </Flex>
      )
  } else {
    return(null)
  }
}