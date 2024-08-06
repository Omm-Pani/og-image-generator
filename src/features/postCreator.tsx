import React, { useRef, useState } from "react";

import InputBox from "../ui/inputBox";
import axios from "axios";
import PostPreview from "./postPreview";
import ErrorText from "../ui/errorText";
export default function PostCreator() {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const INITIAL_POST_OBJ = {
    title: "",
    content: "",
  };

  const [postObj, setPostObj] = useState(INITIAL_POST_OBJ);
  const [image, setImage] = useState<File>();
  const [ogImageUrl, setOgImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const updateFormValue = (updateType: string, value: string) => {
    setPostObj({ ...postObj, [updateType]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const generateOgImage = async () => {
    if (postObj.title.trim() === "") {
      setError("Title is required!");
      return;
    }
    const formData = new FormData();
    formData.append("title", postObj.title);
    formData.append("content", postObj.content);
    if (image) {
      formData.append("image", image);
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_SERVER_URL}/generate-og-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setOgImageUrl(response.data.imageUrl);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError(error);
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generateOgImage();
  };

  const handleRemoveImage = () => {
    setImage(undefined);
  };

  // useEffect(() => {
  //   generateOgImage();
  // }, [postObj.title, postObj.content, image]);

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="overflow-y-auto overscroll-contain px-8 pb-24">
        <form onSubmit={(e) => submitForm(e)}>
          <InputBox
            type="text"
            defaultValue={postObj.title}
            updateType="title"
            containerStyle="mt-2"
            labelTitle="Title"
            placeholder="Title"
            updateFormValue={updateFormValue}
          />
          <div className="form-control">
            <label className="block mb-2 text-xs font-normal text-white pt-4 ">
              Content
            </label>
            <div className="border border-gray-500 text-white  rounded-lg  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 block w-full p-2">
              <textarea
                placeholder="Type your content ..."
                className="h-32 mt-2 w-full text-sm text-white resize-none border-none bg-transparent focus:outline-none"
                onChange={(e) => updateFormValue("content", e.target.value)}
              />
              <div>
                <div className="flex gap-2">
                  {image && (
                    <div className="relative w-28 h-28 bg-neutral-700 rounded-lg mb-1 ml-1">
                      <div
                        className="w-5 h-5 absolute right-0 top-0 items-center hover:cursor-pointer"
                        onClick={() => handleRemoveImage()}
                      >
                        <i className="fa fa-close"></i>
                      </div>
                      <img
                        className="w-full h-full object-contain rounded-lg"
                        src={URL.createObjectURL(image)}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={imageInputRef}
                onChange={handleImageChange}
              />
              <div className="flex gap-6">
                <button
                  className="btn btn-xs btn-success px-6"
                  onClick={(e) => {
                    e.preventDefault();
                    if (imageInputRef.current) {
                      imageInputRef.current.click();
                    }
                  }}
                >
                  {image ? "Change Image" : "Add Image"}
                </button>
              </div>
            </div>
          </div>
          {error && <ErrorText styleClass="mt-4">{error}</ErrorText>}

          <div className="modal-action">
            <button type="submit" className="btn btn-primary px-6">
              {isLoading && <span className="loading loading-spinner"></span>}
              Post
            </button>
          </div>
        </form>
      </div>
      {/* post preview */}
      <div className="bg-black">
        <PostPreview ogImageUrl={ogImageUrl} postObj={postObj} image={image} />
      </div>
    </div>
  );
}
