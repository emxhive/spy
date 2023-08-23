import React from 'react'
import {  spyStore } from './db'
import { doc, getDoc } from 'firebase/firestore'

const fetchspyStore = async ({ spyCollection }) => {
    const dataSnap = await getDoc(doc(spyStore, spyCollection, 'mx-spy'));
    if (dataSnap.exists()) { 
        return dataSnap.data();
    } else { return false }

}

export default fetchspyStore
