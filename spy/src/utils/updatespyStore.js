import { doc, setDoc, updateDoc } from "firebase/firestore";

import { spyStore } from "./db";
const updatespyStore = async ({
  dataUpdate,
  setStoreUpdateStatus,
  spyCollection,
}) => {
  const document = doc(spyStore, spyCollection, "mx-spy");

  await setDoc(document, dataUpdate, { merge: true });
  setStoreUpdateStatus?.(false);
};

const pmUpdatespyStore = async ({ dataUpdate, spyCollection }) => {
  const document = doc(spyStore, spyCollection, "mx-spy");
  await updateDoc(document, dataUpdate);
};

export { pmUpdatespyStore };
export default updatespyStore;
