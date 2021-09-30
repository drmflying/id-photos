import React, { useRef, useState, useEffect } from 'react';

export default function useImageData(file: File) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    reader.onload = ({ target }) => {
      let img = new Image();
      img.onload = () => {
        // let width =
        context?.drawImage(img, 0, 0, img.width, img.height);
        let data = context?.getImageData(0, 0, img.width, img.height);
        resolve(data);
      };
      img.onerror = reject;
      img.src = target?.result;
    };
    reader.readAsDataURL(file);
  });
}
