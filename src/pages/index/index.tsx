import React, { useRef, useState, useEffect } from 'react';
// import * as tf from '@tensorflow/tfjs';

import { View, Input, Text, Image } from 'remax/one';
import Canvas from '@/components/Canvas';
import useCamera from '@/hooks/useCamera';

// tf.setBackend('cpu').then(() =>
//   console.log('Using TensorFlow backend: ', tf.getBackend())
// );
import styles from './index.css';

// const useModel = (path: string) => {
//   const [progress, setProgress] = useState(0);
//   const [model, setModel] = useState<tf.GraphModel>();
//   console.log(progress);
//   useEffect(() => {
//     tf.loadGraphModel(path, { onProgress: setProgress }).then(setModel);
//   }, [path]);
//   return { model, progress };
// };

// async function drawMatte(fgr: any, pha: any, canvas: HTMLCanvasElement) {
//   const rgba = tf.tidy(() => {
//     const rgb =
//       fgr != null
//         ? fgr.squeeze(0).mul(255).cast('int32')
//         : tf.fill([pha.shape[1], pha.shape[2], 3], 255, 'int32');
//     const a =
//       pha != null
//         ? pha.squeeze(0).mul(255).cast('int32')
//         : tf.fill([fgr.shape[1], fgr.shape[2], 1], 255, 'int32');
//     return tf.concat([rgb, a], -1);
//   });
//   fgr && fgr.dispose();
//   pha && pha.dispose();
//   const [height, width] = rgba.shape.slice(0, 2);
//   const pixelData = new Uint8ClampedArray(await rgba.data());
//   const imageData = new ImageData(pixelData, width, height);
//   canvas.width = width;
//   canvas.height = height;
//   canvas.getContext('2d')!.putImageData(imageData, 0, 0);
//   rgba.dispose();
// }

// async function drawHidden(r: any, canvas: HTMLCanvasElement) {
//   const rgba = tf.tidy(() => {
//     r = r.unstack(-1);
//     r = tf.concat(r, 1);
//     r = r.split(4, 1);
//     r = tf.concat(r, 2);
//     r = r.squeeze(0);
//     r = r.expandDims(-1);
//     r = r.add(1).mul(127.5).cast('int32');
//     r = r.tile([1, 1, 3]);
//     r = tf.concat([r, tf.fill([r.shape[0], r.shape[1], 1], 255, 'int32')], -1);
//     return r;
//   });
//   const [height, width] = rgba.shape.slice(0, 2);
//   const pixelData = new Uint8ClampedArray(await rgba.data());
//   const imageData = new ImageData(pixelData, width, height);

//   canvas.width = width;
//   canvas.height = height;
//   canvas.getContext('2d')!.putImageData(imageData, 0, 0);
//   rgba.dispose();
// }

export default () => {
  const canvasRef = useRef(null);
  // const { model, progress } = useModel(`/model/model.json`);
  const { camera, stream } = useCamera(320, 180);

  const animationRef = useRef(-1);
  console.log(canvasRef);
  // useEffect(() => {
  //   console.log(canvasRef);
  //   console.log(model);
  //   let [r1i, r2i, r3i, r4i] = [
  //     tf.tensor(0),
  //     tf.tensor(0),
  //     tf.tensor(0),
  //     tf.tensor(0),
  //   ];
  //   const downsample_ratio = tf.tensor(0.5);
  //   const loop = async () => {
  //     if (model && camera && canvasRef.current) {
  //       const img = await camera.capture();
  //       // console.log('img', img);
  //       const src = tf.tidy(() => img.expandDims(0).div(255));
  //       const out = await model!.executeAsync(
  //         { src, r1i, r2i, r3i, r4i, downsample_ratio },
  //         ['fgr', 'pha', 'r1o', 'r2o', 'r3o', 'r4o']
  //       );
  //       const [fgr, pha, r1o, r2o, r3o, r4o] = out as tf.Tensor[];
  //       drawMatte(fgr.clone(), pha.clone(), canvasRef.current);
  //       canvasRef.current.style.background = 'rgb(120, 255, 155)';
  //       // drawHidden(r1o, canvasRef.current);
  //       tf.dispose([img, src, fgr, pha, r1i, r2i, r3i, r4i]);
  //       [r1i, r2i, r3i, r4i] = [r1o, r2o, r3o, r4o];
  //     }
  //     // animationRef.current = requestAnimationFrame(loop);
  //   };
  //   // animationRef.current = requestAnimationFrame(loop);
  //   return () => {
  //     // cancelAnimationFrame(animationRef.current);
  //     tf.dispose([r1i, r2i, r3i, r4i, downsample_ratio]);
  //   };
  // }, [camera, model]);

  // const draw = async (file) => {
  //   let [r1i, r2i, r3i, r4i] = [
  //     tf.tensor(0),
  //     tf.tensor(0),
  //     tf.tensor(0),
  //     tf.tensor(0),
  //   ];
  //   const downsample_ratio = tf.tensor(0.5);
  //   const imageData = await useImageData(file);
  //   const img = tf.browser.fromPixels(imageData);
  //   console.log(img);
  //   const src = tf.tidy(() => img.expandDims(0).div(255));
  //   console.log('src', src);
  //   const out = await model!.executeAsync(
  //     { src, r1i, r2i, r3i, r4i, downsample_ratio },
  //     ['fgr', 'pha', 'r1o', 'r2o', 'r3o', 'r4o']
  //   );
  //   const [fgr, pha, r1o, r2o, r3o, r4o] = out as tf.Tensor[];
  //   drawMatte(fgr.clone(), pha.clone(), canvasRef.current);
  //   canvasRef.current.style.background = 'rgb(120, 255, 155)';
  //   // drawHidden(r1o, canvasRef.current);
  //   tf.dispose([img, src, fgr, pha, r1i, r2i, r3i, r4i]);
  //   [r1i, r2i, r3i, r4i] = [r1o, r2o, r3o, r4o];
  // };

  // const onChange = (event: ChangeEvent) => {
  //   draw(event.target.files[0]);
  // };
  return (
    <View className={styles.app}>
      <camera
        device-position='back'
        flash='off'
        binderror='error'
        style='width: 100%; height: 300px;'
      ></camera>
      {/* <input type='file' onChange={onChange} /> */}
      <Canvas ref={canvasRef} />
      {/* <video
        ref={(video) => {
          video && (video.srcObject = stream);
        }}
        autoPlay
        style={{ maxWidth: '100%' }}
      /> */}
    </View>
  );
};
