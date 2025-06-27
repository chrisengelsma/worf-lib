import './FrameHorizontalEdge.scss';
import clsx from 'clsx';
import React from 'react';

const FrameHorizontalEdge = (props: any) => {

  const titlePosition: string =
    props?.expand?.right
      ? 'left-left'
      : 'left-middle';

  return (
    <div className={ clsx(
      `FrameHorizontalEdge`,
      `FrameHorizontalEdge__position-${ props?.position }`,
      `FrameHorizontalEdge__theme-${ props?.theme }`,
      `FrameHorizontalEdge__active-${ props?.activeLinkIndex ?? 0 }`,
      props?.expand?.left ? 'FrameHorizontalEdge__left-expanded' : '',
      !props?.sides?.[ props?.position ] ? 'FrameHorizontalEdge__collapsed' : '',
      ( props?.position === 'top' && props?.sides?.left ) ? 'FrameHorizontalEdge__top-left-elbow' : '',
      ( props?.position === 'bottom' && props?.sides?.left ) ? 'FrameHorizontalEdge__bottom-left-elbow' : '',
    ) }
    >
      <div className={ clsx(
        'FrameHorizontalEdge__right-section',
      ) }>
        <div className="FrameHorizontalEdge__right-section-spacer"></div>
        { props?.decorators?.[ props?.position ] ?
          <>
            <div className="FrameHorizontalEdge__node"></div>
            <div className="FrameHorizontalEdge__short-divider"></div>
          </>
          : null }
        <div className={ clsx(
          'FrameHorizontalEdge__title-bar',
          ( props?.position === 'top' && props?.sides?.right ) ? 'FrameHorizontalEdge__top-right-elbow' : '',
          ( props?.position === 'bottom' && props?.sides?.right ) ? 'FrameHorizontalEdge__bottom-right-elbow' : '',
        ) }>
          { props?.title?.[ props?.position ]
            ? <div className={ clsx(
              'FrameHorizontalEdge__title',
              `FrameHorizontalEdge__title-${ props?.sides?.right && props?.links?.right ? props?.expand?.right ? 'shifted-full' : 'shifted' : 'edge' }`
            ) }>
              { props?.title?.[ props?.position ] }
            </div>
            : null }
        </div>
      </div>
    </div>
  );
};

export default FrameHorizontalEdge;