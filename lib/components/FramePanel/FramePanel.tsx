import './FramePanel.scss';
import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import FrameHorizontalEdge from './components/FrameHorizontalEdge/FrameHorizontalEdge.tsx';
import FrameVerticalEdge from './components/FrameVerticalEdge/FrameVerticalEdge.tsx';
import FrameContent from './components/FrameContent/FrameContent.tsx';

export interface FramePanelProps extends PropsWithChildren {
  debug?: boolean;
  theme?: string;
  activeLinkIndex?: number;
  links?: {
    left?: { title?: string, href?: string, target?: string }[],
    right?: { title?: string, href?: string, target?: string }[],
  };
  sides?: {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  };
  title?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  decorators?: {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  };
  expand?: {
    left?: boolean;
    right?: boolean;
    content?: boolean;
  };
  onLinkClick?: (link: any) => void;
}

export const FramePanel = (_props: FramePanelProps) => {

  const [ props, setProps ] = React.useState<FramePanelProps>({});

  React.useEffect(() => {

    setProps((prevState: FramePanelProps) => ( {
      ...prevState,
      ..._props
    } ));

  }, [ _props ]);

  return props ? (
    <div className="FramePanel">
      <div className={ clsx(
        'FramePanel__frame',
        props?.sides?.left ? 'FramePanel__frame-left-margin' : '',
        props?.sides?.top ? 'FramePanel__frame-top-margin' : '',
        props?.sides?.bottom ? 'FramePanel__frame-bottom-margin' : '',
        props?.sides?.right ? 'FramePanel__frame-right-margin' : '',
        ( props?.sides?.top && props?.sides?.left && props?.links?.left ) ? 'FramePanel__frame-top-left-elbow' : '',
        ( props?.sides?.top && props?.sides?.right && props?.links?.right ) ? 'FramePanel__frame-top-right-elbow' : '',
        ( props?.sides?.bottom && props?.sides?.left && props?.links?.left ) ? 'FramePanel__frame-bottom-left-elbow' : '',
        ( props?.sides?.bottom && props?.sides?.right && props?.links?.right ) ? 'FramePanel__frame-bottom-right-elbow' : '',
      ) }>

        <FrameHorizontalEdge position="top" { ...props }/>

        <div className="FramePanel__content">
          <FrameVerticalEdge { ...props } position="left"/>

          <FrameContent { ...props } />

          <FrameVerticalEdge { ...props } position="right"/>
        </div>


        <FrameHorizontalEdge position="bottom" { ...props }/>

      </div>
    </div>
  ) : null;
};
