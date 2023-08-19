
import { useState, useEffect } from 'react'
import { collection, query, onSnapshot, where, getDoc,getDocs,  doc, get } from "firebase/firestore"
import { auth, db } from '../config/firebase'


const UserSettings = () => {
    const [userData, setUserData] = useState({})

    const getUserData = async (uid) => {
        // try {
        //     const usersRef = collection(db, 'users');
        //     const snapshot = await usersRef.where('uid', '==', uid).get()

        //     if (snapshot.empty) {
        //         console.log('No matching documents.');
        //         return;
        //       }  




        //       snapshot.forEach((doc) => {
        //       setUserData( ...doc.data());
        //     });

        //     // Now userData contains the data for the specific user, ordered by 'created' field
        //     console.log(userData);
        //   } catch (error) {
        //     console.error('Error fetching user data:', error);
        //   }

        // const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data());
        // } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");
        // }

        const q = query(
            collection(db, "users"),
            where("uid", "==", uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setUserData(doc.data())
        });
    }


    useEffect(() => {
        const userId = auth.currentUser.uid;
        console.log(auth.currentUser)
        getUserData(userId)
    }, [])

    return (<>
    <p>my age: {userData.age}</p>
    </>)
}

export default UserSettings