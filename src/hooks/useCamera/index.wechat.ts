import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

export default function useCamera(width: number, height: number) {
  const stateRef = useRef<any>({ camera: null, stream: null });
  const [state, setState] = useState<any>(stateRef.current);
  useEffect(() => {
    const context = wx.createCameraContext();

    const listener = context.onCameraFrame((frame) => {
      console.log(frame.data instanceof ArrayBuffer, frame.width, frame.height);
      tf.data.webcam(video).then((camera) => {
        stateRef.current = { camera, stream };
        setState(stateRef.current);
      });
    });
    // listener.start();
    return () => {
      if (stateRef.current.stream) {
        stateRef.current.stream.getTracks().forEach((track: any) => {
          track.stop();
        });
        stateRef.current.camera.stop();
        stateRef.current = { camera: null, stream: null };
        setState(stateRef.current);
      }
    };
  }, [width, height]);
  return state;
}
