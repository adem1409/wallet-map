"use client";

import ImageCropper from "@/components/app/profile/ImageCropper";
import Modal from "@/components/Modal";
import { useAuthContext } from "@/contexts/AuthProvider";
import { XMarkIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UpdatePictureModal({ show, hide, afterLeave = () => {} }) {
  const { user } = useAuthContext();

  const [error, setError] = useState("");
  const [image, setImage] = useState(`${user?.picture}`);
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setImage(blobUrl);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <Modal
      show={show}
      hide={hide}
      dialogClassName="w-full md:max-w-[500px] h-fit my-auto py-6 px-4 rounded-lg"
      afterLeave={() => {
        afterLeave();
        setError("");
      }}
    >
      <div className="flex justify-between bg-gray-50 pb-5 px-2">
        <h3 className="text-lg font-medium text-gray-900">Update Picture</h3>
        <button type="button" onClick={hide}>
          <XMarkIcon className="size-7 text-slate-600 hover:text-black duration-200" />
        </button>
      </div>
      <label
        {...getRootProps()}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 mb-4 ${
          isDragActive ? "border-blue-600" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} ref={inputRef} />
        <div className="flex items-center gap-1 w-fit mx-auto py-1 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[15px] duration-200 shadow-md cursor-pointer">
          <PlusIcon className="size-6" />
          <span>Upload</span>
        </div>
        <p className="text-sm text-slate-600 text-center">Or drop an image here</p>
      </label>
      <ImageCropper imageUrl={image} hide={hide} />
    </Modal>
  );
}
