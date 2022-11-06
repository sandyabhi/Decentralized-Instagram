import { useState, useRef } from "react";
import { BiCloud, BiMusic, BiPlus } from "react-icons/bi";

function Upload() {
  // Creating state for the input field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");

  //  Creating a ref for thumbnail and video
  const thumbnailRef = useRef();
  const videoRef = useRef();
  return (
    <div className="w-full h-screen bg-[#1a1c1f] flex flex-row">
      <div className="flex-1 flex flex-col items-center gap-5">
        <div>
          <label className="text-[#9CA3AF] mt-10">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write Something..."
            className="w-[100%] text-white h-32 placeholder:text-gray-600  rounded-md mt-2 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
          />
        </div>
        <div>
          <label className="text-[#9CA3AF]  mt-10">Image</label>

          <div
            onClick={() => {
              thumbnailRef.current.click();
            }}
            className="border-2 w-64 border-gray-600  border-dashed rounded-md mt-2 p-2  h-36 items-center justify-center flex"
          >
            {thumbnail ? (
              <img
                onClick={() => {
                  thumbnailRef.current.click();
                }}
                src={URL.createObjectURL(thumbnail)}
                alt="thumbnail"
                className="h-full rounded-md"
              />
            ) : (
              <BiPlus size={40} color="gray" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
