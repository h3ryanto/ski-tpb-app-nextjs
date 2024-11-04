/* eslint-disable @typescript-eslint/no-unused-vars */
import { collection, getDocs, getFirestore, setDoc, doc, deleteDoc, query, orderBy, limit, startAfter, endBefore } from "firebase/firestore";
import app from "../init";

const firestore = getFirestore(app);

export async function retriveData(collectionName: string,) {
    const first = query(collection(firestore, collectionName), orderBy("nomor_aju"), limit(10));

    const snapshot = await getDocs(first);
    const newLastVisible = snapshot.docs[snapshot.docs.length-1];
    const data = snapshot.docs.map((doc:any) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return {data,newLastVisible};
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getNextsPaginatedData(lastVisible:any) {

      const query1:any = query(collection(firestore, 'header'), orderBy("created_at", "desc"), startAfter(lastVisible), limit(10));
      const snapshot = await getDocs(query1);
      const newLastVisible = snapshot.docs[snapshot.docs.length-1];
      const newFirstVisible = snapshot.docs[snapshot.docs.length-10];
    const data = snapshot.docs.map((doc:any) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return { data, newLastVisible,newFirstVisible };
    
  };


  export async function getFirstsPaginatedData(firstVisible:any) {

    const query1:any = query(collection(firestore, 'header'), orderBy("created_at", "desc"), endBefore(firstVisible), limit(10));
    const snapshot = await getDocs(query1);
    const newLastVisible = snapshot.docs[snapshot.docs.length-1];
    const newFirstVisible = snapshot.docs[snapshot.docs.length-10];
  const data = snapshot.docs.map((doc:any) => ({
      id: doc.id,
      ...doc.data(),
  }));
  return { data, newLastVisible,newFirstVisible };
  
};

// export async function addData() {
//     const data = {
//         user: "data baru ni booss",
//         user_name: "CA",
//         is_admin: "USA",
//         filed_baru: "coba"
//     }
//     const newUser = doc(collection(firestore, "user"));
//     // Add a new document in collection "cities"
//     await setDoc(newUser, data)
// }

// export async function Del() {
//     await deleteDoc(doc(firestore, "user", "eLo28n2rSBhzdvAzkGmq"));
// }

