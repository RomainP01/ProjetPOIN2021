import React, { useState, useEffect } from 'react'

import { db, firebaseRef } from '../config'

import { firebase } from 'firebase'

import { useCollectionData } from 'react-firebase-hooks/firestore'

import TinderCard from 'react-tinder-card'

import Heart from '../img/heart.png'
import Cross from '../img/cross.png'

const Room = ({ currentRoom, setMatchTitle, setMatchPicture }) => {
  const restoRef = db.collection('restos')
  const [restos] = useCollectionData(restoRef)

  const likedRef = db.collection('liked')

  const [lastDirection, setLastDirection] = useState()

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const swiped = (direction, nameToDelete, picture) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    if (direction === 'right') {
      db.collection('liked')
        .where('titre', '==', nameToDelete)
        .where('room', '==', currentRoom)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.forEach((doc) => {
              if (doc.exists) {
                setMatchTitle(doc.data().titre)
                setMatchPicture(doc.data().picture)
              }
            })
          } else {
            console.log('ajouté')
            addLiked(nameToDelete, picture)
          }
        })
    }
  }

  const addLiked = (titre, picture) => {
    likedRef.add({
      titre: titre,
      picture: picture,
      room: currentRoom,
    })
  }

  return (
    <>
      <div className="cardContainer">
        {restos &&
          restos.map((resto) => (
            <TinderCard
              className="swipe"
              key={resto.titre}
              onSwipe={(dir) => swiped(dir, resto.titre, resto.picture)}
              onCardLeftScreen={() => outOfFrame(resto.titre)}
            >
              <div
                style={{ backgroundImage: 'url(' + resto.picture + ')' }}
                className="card"
              >
                <h3 className="titreresto">{resto.titre}</h3>
              </div>
            </TinderCard>
          ))}
      </div>

      <h3>Room Code : {currentRoom}</h3>
      <div className="container">
        <div className="left">
          <button class="buttonLike">
            <img src={Cross} className="logoCross" />
          </button>
        </div>
        <div className="right">
          <button class="buttonLike">
            <img src={Heart} className="logoLike" />
          </button>
        </div>
      </div>
    </>
  )
}

export default Room
