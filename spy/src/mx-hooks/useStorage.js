import { useEffect, useState } from "react";
import { spyStorage } from "../utils/db";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import updatespyStore from "../utils/updatespyStore";

const useStorage = ({ file, notFirst, setNotFirst, url, setUrl }) => {
  useEffect(() => {
    if (notFirst) {
  
      const storeRef = ref(spyStorage, `/pmicons/${file.icon.name}`);
      uploadBytes(storeRef, file.icon).then(
        async (snapshot) => {
          const storeurl = await getDownloadURL(storeRef);
      
          updatespyStore({ dataUpdate: { [file.id]: storeurl }, spyCollection: 'pmicons' })
          setUrl(storeurl);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      setNotFirst(true);
    }
  }, [file]);
};

export default useStorage;
