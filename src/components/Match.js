import { useState, useMemo } from 'react'

import { db, firebaseRef } from '../config'

import { firebase } from 'firebase'

import { useCollectionData } from 'react-firebase-hooks/firestore'

import TinderCard from 'react-tinder-card'

const Match = ({ matchTitle, matchPicture, currentRoom, setCurrentRoom }) => {
  const handleLeave = () => {
    const query = db.collection('liked').where('room', '==', currentRoom)
    query.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete()
      })
    })
    const query2 = db.collection('room').where('room', '==', currentRoom)
    query2.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete()
      })
    })
    setCurrentRoom(null)
  }
  return (
    <>
      <h1>Miam :</h1>
      <div
        className="cardMatch"
        style={{ backgroundImage: 'url(' + matchPicture + ')' }}
      >
        <h3>{matchTitle}</h3>
      </div>
      <div className="buttons">
        <button className="button" onClick={() => handleLeave()}>
          Leave
        </button>
      </div>
    </>
  )
}

export default Match
