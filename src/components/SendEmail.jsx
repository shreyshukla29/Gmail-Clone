import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/appSlice";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const SendEmail = () => {
  const [formData, setFormData] = useState({
    recipients: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState(false);
  const { open } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("formdata",formData)

    if (formData.recipients === "") {
      setError(true);
      return;
    }

    try {
      const addMail = await addDoc(collection(db, "emails"), {
        to: formData.recipients,
        subject: formData.subject,
        message: formData.message,
        createdAt: serverTimestamp(),
      });

      console.log("Email added:", addMail);
      dispatch(setOpen(false));
      setFormData({
        recipients: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle the error appropriately here
    }
  };

  return (
    <>
      <div
        className={`${open ? "block" : "hidden"} bg-white 
        w-[70%]
       sm:w-[60%] md:w-[500px] shadow-xl shadow-slate-600 rounded-t-md`}
      >
        <div className="flex px-3 py-2 bg-[#F2F6FC] items-center justify-between rounded-t-md">
          <h1>New Message</h1>
          <div
            onClick={() => dispatch(setOpen(false))}
            className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
          >
            <RxCross2 />
          </div>
        </div>
        <form onSubmit={submitHandler} className="flex flex-col p-3 gap-2">
          <input
            onChange={changeEventHandler}
            name="recipients"
            value={formData.recipients}
            type="text"
            placeholder="Recipients"
            className="outline-none py-1"
          />
          <input
            onChange={changeEventHandler}
            name="subject"
            value={formData.subject}
            type="text"
            placeholder="Subject"
            className="outline-none py-1"
          />
          <textarea
            onChange={changeEventHandler}
            name="message"
            value={formData.message}
            id=""
            cols="30"
            rows="10"
            className="outline-none py-1"
          ></textarea>
          <button
            type="submit"
            className="bg-[#0B57D0] rounded-full w-fit px-4 py-1 text-white font-medium"
          >
            Send
          </button>
        </form>
      </div>

      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full">
          <div className="bg-white p-5 rounded shadow-lg w-[300px]">
            <h2 className="text-[25px] font-semibold ">Error</h2>
            <p className="mt-2 text-sm">Please specify at least one recipient.</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded ml-52"
              onClick={() => setError(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SendEmail;
