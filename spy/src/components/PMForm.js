import React, { useEffect, useRef, useState } from "react";

import upload from "../img/upload.png";
import "../css/pmform.css";
import useStorage from "../mx-hooks/useStorage";
import updatespyStore from "../utils/updatespyStore";

export default function PMForm({ pmState, setpmIcons, pmIcons, setpmState }) {
  const errorIcon = <span>⚠️</span>;
  let imageFile = upload;

  const [iconUrl, seticonUrl] = useState(upload);
  const [isFile, setisFile] = useState(false);
  const [newIcon, setnewIcon] = useState({ id: "undefined", icon: upload });
  const [notFirst, setNotFirst] = useState(false);
  const [isStoreUpdateActive, setStoreUpdateStatus] = useState(false);
  const fileRef = useRef(null);

  //Firestore begins

  useStorage({
    file: newIcon,
    url: iconUrl,
    setUrl: seticonUrl,
    notFirst: notFirst,
    setNotFirst: setNotFirst,
  });


  //updates the firestore whenever pmstate changes and at the same time
  useEffect(() => {
    if (isStoreUpdateActive) {
      updatespyStore({
        dataUpdate: pmState,
        spyCollection: "pmstate",
        setStoreUpdateStatus: setStoreUpdateStatus,
      });
    }
  }, [pmState]);
  //firestore ends here
  return (
    <div className="mx-pmform">
      <div className="mx-pmform-header">New Payment Method</div>
      <div className="mx-pmform-body">
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();

            const formArr = Array.from(new FormData(e.target).entries());
            const iconF = formArr[0];
            const nameF = formArr[1];
            const symbolF = formArr[2];
            const balanceF = formArr[3];
            const rateF = formArr[4];
            const feeF = formArr[5];

            //!Object.keys(pmIcons).includes(nameF[1]) && 

            if (isFile) {
              setisFile(false);
              setnewIcon({ id: nameF[1], icon: iconF[1] });
              setpmIcons({
                ...pmIcons,
                [nameF[1]]: iconUrl,
              });

              const copypm = {};

              //copy all properties to save time
              switch (symbolF[1]) {
                case "$":
                  Object.assign(copypm, pmState.airtm);
                  break;
                default:
                  Object.assign(copypm, pmState.opay);
              }

              setStoreUpdateStatus(true);
              const newpm = {
                ...copypm,
                balance: Number(balanceF[1]),
                frozen: 0,
                percentFee: Number(feeF[1]),
                rateDiff: Number(rateF[1]),
              };
              setpmState({ ...pmState, [nameF[1]]: newpm });
            }
            URL.revokeObjectURL(imageFile);
          }}
        >
          <div>
            <div
              onClick={() => fileRef.current.click()}
              className="icon-select"
            >
              <img src={iconUrl} alt="icon" className="image-preview" />
              <input
                style={{ display: "none" }}
                type="file"
                ref={fileRef}
                accept="image/*"
                name="icon"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setisFile(true);
                    imageFile = e.target.files[0];
                    seticonUrl(URL.createObjectURL(imageFile));
                  }
                }}
              />
            </div>
            <div>
              <input type="text" name="id" placeholder="...payment method" />
            </div>

            <div>
              <select name="symbol">
                <option value="$">...USD</option>
                <option value="₦">...NGN</option>
              </select>
            </div>

            <div>
              <input type="number" name="balance" placeholder="...balance" />
            </div>

            <div>
              <input type="number" name="rate" placeholder="...rate diff." />
            </div>

            
            <div>
              <input type="number" name="fee" placeholder="...percent fee" />
            </div>


            <div className="fill"></div>
            <div>
              <button type="submit">Submit</button>{" "}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
