/* eslint-disable @typescript-eslint/no-unused-vars */
import { collection, getDocs, getFirestore, query, orderBy, limit, startAfter, endBefore, limitToLast, getCountFromServer, setDoc,doc} from "firebase/firestore";
import app from "../init";
import json from '../../../public/header.json'

const firestore = getFirestore(app);

export async function retriveDokumen() {

}
export async function retriveData(collectionName: string,) {
    const first = query(collection(firestore, collectionName), orderBy("created_at", "desc"), limit(10));
    const allData = collection(firestore, collectionName);
    const snapshot = await getDocs(first);
    const snapshotAll= await getCountFromServer(allData);
    const totalPage = snapshotAll.data().count;
    const newLastVisible = snapshot.docs[snapshot.docs.length-1];
    const data = snapshot.docs.map((doc:any) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return {data,newLastVisible, totalPage};
}


export async function getNextsPaginatedData(lastVisible:any) {

      const query1:any = query(collection(firestore, 'header'), orderBy("created_at", "desc"), startAfter(lastVisible), limit(10));
      const snapshot = await getDocs(query1);
     
    const data = snapshot.docs.map((doc:any) => ({
        id: doc.id,
        ...doc.data(),
    }));

    const newLastVisible = snapshot.docs[snapshot.docs.length-1];
    const newFirstVisible = snapshot.docs[snapshot.docs.length-10];
    return { data, newLastVisible,newFirstVisible};
    
  };


export async function getFirstsPaginatedData(firstVisible:any) {

    const retrevePrev:any = query(collection(firestore, 'header'), orderBy("created_at", "desc"), endBefore(firstVisible), limitToLast(10));
    const snapshotPrev = await getDocs(retrevePrev);    
    const data = snapshotPrev.docs.map((doc:any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const newLastVisible = snapshotPrev.docs[snapshotPrev.docs.length-1];
    const newFirstVisible = snapshotPrev.docs[snapshotPrev.docs.length-10];
  
    return { data, newLastVisible, newFirstVisible };
  
  };


  export async function tambahData() {
    // const data: any = json;
    // const posts = data.data

  //   posts.map((post: any) => (
      
  // ));
// const posts = {
//   food: "Pizza",
//   color: "Blue",
//   subject: "Recess"
// }

      // posts.forEach((post:any) => {

      //   const frankDocRef = doc(collection(firestore, "header"));
      //   setDoc(frankDocRef,post)
      // });
      

   
  
  };


