import React, { useEffect, useState } from 'react';
import { FramePanel } from '@lib';


const links: any = {
  left: [
    { title: 'Link 1', path: 'Link1' },
    { title: 'Link 2', path: 'Link2' },
    { title: 'Link 3', path: 'Link3' },
    { title: 'Link 4', path: 'Link4' },
  ]
};

const FramePanelScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({ links });

  const [ activeLinkIndex, setActiveLinkIndex ] = useState<number>(0);

  const handleLinkClick = (link: any): void => {
    setActiveLinkIndex(links.indexOf(link));
  };

  useEffect(() => {
    setProps((prevState: any) => { return { ...prevState, ..._props?.defaultProps }; });
  }, [ _props?.defaultProps ]);

  return (
    <FramePanel { ...props }
                    onLinkClick={ handleLinkClick }
                    activeLinkIndex={ activeLinkIndex }>
      <PlaceHolder/>
    </FramePanel>
  );

};

const PlaceHolder = () => {

  const canvasRef: React.RefObject<HTMLCanvasElement | null> = React.useRef<HTMLCanvasElement>(null);
  const containerRef: React.RefObject<HTMLDivElement | null> = React.useRef<HTMLDivElement>(null);

  const resizeCanvas = () => {
    if (canvasRef?.current && containerRef?.current) {
      const canvas: HTMLCanvasElement | undefined = canvasRef?.current;
      const container: HTMLDivElement | undefined = containerRef?.current;

      if (canvas && container) {
        const ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d');
        if (ctx !== null && ctx !== undefined) {
          const width: number = container?.clientWidth ?? 0;
          const height: number = container?.clientHeight ?? 0;

          canvas.width = width;
          canvas.height = height;
          const lineWidth: number = 2;
          const x0: number = lineWidth / 2;
          const y0: number = x0;
          const x1: number = width - x0;
          const y1: number = height - y0;
          ctx.strokeStyle = 'red';
          ctx.lineWidth = lineWidth;
          ctx.beginPath();

          // Square border
          ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);

          // Diagonal lines
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);

          ctx.moveTo(x0, y1);
          ctx.lineTo(x1, y0);
          ctx.stroke();
        }
      }
    }
  };


  useEffect(() => {
    resizeCanvas();
  }, [ canvasRef?.current, containerRef?.current ]);

  return (
    <div ref={ containerRef } style={ { width: '100%', height: 'calc(100% - 2px)', position: 'relative' } }>
      <canvas style={ { width: '100%', height: 'calc(100% - 2px)', position: 'relative' } } ref={ canvasRef }></canvas>
    </div>
  );
};


export default FramePanelScaffold;
