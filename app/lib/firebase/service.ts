import { collection, getDocs, getFirestore, setDoc, doc, deleteDoc} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export async function retriveData(collectionName: string,) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
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

