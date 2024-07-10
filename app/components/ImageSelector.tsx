"use client";

import NextImage from "next/image";
import { useRef, useState } from "react";
import { getData } from "../actions";

export default function ImageSelector() {
  const [img, setImg] = useState<HTMLImageElement>();
  const [imgSize, setImgSize] = useState({ naturalWidth: 0, naturalHeight: 0 });
  const [state, setState] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
  }>();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadImage = (imageUrl: string) => {
    const img = new Image();
    img.src = imageUrl;

    setImg(img);

    img.onload = (ev) => {
      const { naturalWidth, naturalHeight } = img;
      setImgSize({ naturalWidth, naturalHeight });
    };
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = ev.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const imageUrl = URL.createObjectURL(selectedFile);
    loadImage(imageUrl);
  };

  const handleClick = async () => {
    const data = await getData();
    setState(data);

    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.font = `${data.height / 1.2}px sans-serif`;
      console.log(ctx.font);
      console.log(ctx.measureText(data.text));
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {img ? (
        <NextImage
          src={img.src}
          alt=""
          width={imgSize.naturalWidth}
          height={imgSize.naturalHeight}
        />
      ) : null}
      <div
        className="absolute"
        style={{ width: imgSize.naturalWidth, height: imgSize.naturalHeight }}
      >
        {state ? (
          <div
            className="absolute"
            style={{
              left: state.x,
              top: state.y,
              // width: state.width,
              height: state.height,
              lineHeight: 1.2,
              fontSize: state.height / 1.2,
            }}
          >
            <p>{state.text}</p>
          </div>
        ) : null}
      </div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>Show OCR results</button>
      <canvas ref={canvasRef} width={0} height={0}></canvas>
    </div>
  );
}
