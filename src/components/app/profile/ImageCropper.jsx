"use client";

import getCroppedImg from "@/components/app/profile/cropImage";
import { useAuthContext } from "@/contexts/AuthProvider";
import { ArrowUpTrayIcon, XCircleIcon } from "@heroicons/react/24/outline";
import axios from "@/config/axios";
import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";

export default function ImageCropper({ imageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/doctor-avatar.jpg`, hide = () => {} }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [progress, setProgress] = useState(-1);
  const [sending, setSending] = useState({ picture: false });
  const { fetchUser } = useAuthContext();

  console.log("-------------------- progress --------------------");
  console.log(progress);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const config = {
    onUploadProgress: (e) => {
      const prog = Math.round((e.loaded * 100) / e.total);
      setProgress(prog);
    },
  };

  async function updatePicture() {
    if (sending.picture) return;

    try {
      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);

      console.log("croppedImage", croppedImage);

      const formData = new FormData();

      formData.append("picture", croppedImage);

      setSending((prev) => ({ ...prev, picture: true }));
      const res = await axios.post("/api/users/update-picture", formData, config);

      fetchUser();
      hide();
    } catch (e) {
      console.error(e);
    } finally {
      setSending((prev) => ({ ...prev, picture: false }));
      setProgress(-1);
    }
  }

  const onClose = () => {
    setCroppedImage(null);
  };

  return (
    <div className="mt-2">
      <div className="relative h-[200px]">
        <Cropper
          image={imageUrl}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          onCropAreaChange={setCroppedArea}
        />
      </div>
      <div className="flex items-center justify-center w-[150px] mt-3 mx-auto aspect-square border-2 rounded-full overflow-hidden">
        <div className="w-full h-full">{croppedArea && <Output croppedArea={croppedArea} imageUrl={imageUrl} />}</div>
      </div>
      <div className="mt-2 w-fit mx-auto">
        <div className="flex gap-2 w-fit">
          <button
            onClick={updatePicture}
            className={`flex items-center gap-1 py-1 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[15px] duration-200 shadow-md`}
          >
            <ArrowUpTrayIcon className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button
            onClick={() => {
              hide();
            }}
            className={`flex items-center gap-1 py-1 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[15px] duration-200 shadow-md`}
          >
            <XCircleIcon className="size-5" />
            <span>Cancel</span>
          </button>
        </div>
        {progress > -1 && (
          <div className="relative w-full mx-auto rounded border border-green-500 overflow-hidden mt-2">
            <div className="bg-green-500 h-3" style={{ width: progress + "%" }}></div>
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs">{progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

const CROP_AREA_ASPECT = 1;

const Output = ({ croppedArea, imageUrl }) => {
  const scale = 100 / croppedArea.width;
  const transform = {
    x: `${-croppedArea.x * scale}%`,
    y: `${-croppedArea.y * scale}%`,
    scale,
    width: "calc(100% + 0.5px)",
    height: "auto",
  };

  const imageStyle = {
    transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
    width: transform.width,
    height: transform.height,
  };
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ paddingBottom: `${100 / CROP_AREA_ASPECT}%` }}>
      <img src={imageUrl} className="absolute top-0 left-0 origin-top-left" alt="" style={imageStyle} />
    </div>
  );
};
