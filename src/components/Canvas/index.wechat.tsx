import React from 'react';
import { Canvas as WXCanvas } from 'remax/wechat';

const InternalCanvas = (props, ref) => {
  return <WXCanvas type='2d' {...props} ref={ref} />;
};
const Canvas = React.forwardRef(InternalCanvas);

export default Canvas;
