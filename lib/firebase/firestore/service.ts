import { collection, getDocs, getFirestore, setDoc, doc, deleteDoc, query, orderBy, limit, startAfter } from "firebase/firestore";
import app from "../init";

const firestore = getFirestore(app);

export async function retriveData(collectionName: string,) {
    const first = query(collection(firestore, collectionName), orderBy("nomor_aju"), limit(25));

    // const snapshot = await getDocs(collection(firestore, collectionName));
    const documentSnapshots = await getDocs(first);

    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    console.log("last", lastVisible);

    const next= query(collection(firestore, collectionName),    
    orderBy("nomor_aju"),
    startAfter(lastVisible),
    limit(25));
    
    const snapshot = await getDocs(next);
    const data = snapshot.docs.map((doc:any) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data;
}

export async function addData() {
    const data = {
        user: "data baru ni booss",
        user_name: "CA",
        is_admin: "USA",
        filed_baru: "coba"
    }
    const newUser = doc(collection(firestore, "user"));
    // Add a new document in collection "cities"
    await setDoc(newUser, data)
}

export async function Del() {
    await deleteDoc(doc(firestore, "user", "eLo28n2rSBhzdvAzkGmq"));
}

