/* eslint-disable @typescript-eslint/no-unused-vars */
import { collection, getDocs, getFirestore, setDoc, doc, deleteDoc, query, orderBy, limit, startAfter, endBefore, endAt } from "firebase/firestore";
import app from "../init";

const firestore = getFirestore(app);

export async function retriveData(collectionName: string,) {
    const first = query(collection(firestore, collectionName), orderBy("created_at", "desc"), limit(10));

    const snapshot = await getDocs(first);
    const newLastVisible = snapshot.docs[snapshot.docs.length-1];
    const data = snapshot.docs.map((doc:any) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return {data,newLastVisible};
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getNextsPaginatedData(lastVisible:any,page:number) {

      const query1:any = query(collection(firestore, 'header'), orderBy("created_at", "desc"), startAfter(lastVisible), limit(10));
      const snapshot = await getDocs(query1);
      
    const data = snapshot.docs.map((doc:any) => ({
        id: doc.id,
        ...doc.data(),
    }));

    const newLastVisible = snapshot.docs[snapshot.docs.length-1];
    const newFirstVisible = snapshot.docs[snapshot.docs.length-10];
    const pageNow=page+1;
    return { data, newLastVisible,newFirstVisible,pageNow };
    
  };


export async function getFirstsPaginatedData(firstVisible:any,page:number) {

    const retrevePrev:any = query(collection(firestore, 'header'), orderBy("created_at", "desc"), endBefore(firstVisible), limit(10));
    const snapshotPrev = await getDocs(retrevePrev);    
    const data = snapshotPrev.docs.map((doc:any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const newLastVisible = snapshotPrev.docs[snapshotPrev.docs.length-1];
    const newFirstVisible = snapshotPrev.docs[snapshotPrev.docs.length-10];
    const pageNow=page-1;
  
    return { data, newLastVisible,newFirstVisible,pageNow };
  
  };


