import React from 'react';

export interface BaseCanvasProps {
  /** @default default */
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}

const InternalCanvas: React.ForwardRefRenderFunction<
  unknown,
  BaseCanvasProps
> = (props, ref) => {
  const canvasRef = (ref as any) || React.createRef<HTMLElement>();
  return <canvas {...props} ref={canvasRef} />;
};

const Canvas = React.forwardRef(InternalCanvas);

export default Canvas;
