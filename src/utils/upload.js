import storage from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const handleUpload = (file) => {
  let gambar = null;

  if (!file) {
    alert("pilih dong");
  }
  const storageRef = ref(storage, `/files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      // update progress
      // setPercent(percent);
    },
    (err) => console.log(err),
    () => {
      // download url
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        gambar = url;
      });
    }
  );

  return gambar;
};

export default handleUpload;
