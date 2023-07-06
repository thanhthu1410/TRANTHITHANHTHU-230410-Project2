import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_STORAGE_API_KEY,
  authDomain: process.env.REACT_APP_FIRE_STORAGE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIRE_STORAGE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRE_STORAGE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRE_STORAGE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIRE_STORAGE_APP_ID,
  measurementId: process.env.REACT_APP_FIRE_STORAGE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// tạo ra storage
export const storage = getStorage(app);


/* 
  1st params: your file, 2nd params: folder you need 
  return 
    if failed => false
    if success => url file
*/
export async function uploadFileToStorage(fileUploads, folderName) { 

  // nếu file là null thì không làm gì hết
  if (!fileUploads) { 
    return false
  }

  // chuyển file thành dạng có thể up lên firebase
  const fileRef = ref(storage, `${folderName}/` + fileUploads.name);

  // upload file lên fire storage
  let url = await uploadBytes(fileRef, fileUploads).then( async res => {
    // khi up thành công thì tìm URL
    return await getDownloadURL(res.ref)
    .then(url => url)
    .catch(er => false)
  })

  return url
}

/* 
  only params: folder name
  return 
    if failed => false
    if success => array url link
*/
export async function getFileInFolder(folderName) {
  const listRef = ref(storage, folderName);

  return await listAll(listRef).then( async (res) => {
    let result = []; // tạo array trống

    for (let i in res.items) { 
      let url = await getDownloadURL(res.items[i])
      .then(url => url)
      .catch(er => false)
      if (!url) {
        return false
      }
      result.push(url)
    }

    return result
  })
} 