import './FrameVerticalEdge.scss';
import clsx from 'clsx';
import React from 'react';
import { FramePanelProps } from '../../FramePanel';

const FrameVerticalEdge = (props: FramePanelProps & any) => {

  const handleLinkClick = (link: any) => {
    props?.onLinkClick(link);
  };

  return (
    <div className={ clsx(
      'FrameVerticalEdge',
      `FrameVerticalEdge__position-${ props?.position }`,
      `FrameVerticalEdge__theme-${ props?.theme }`,
      `FrameVerticalEdge__active-${ props?.activeLinkIndex ?? 0 }`,
      props?.expand?.[ props?.position ] ? 'FrameVerticalEdge__expanded' : '',
    ) }>
      <div className={ clsx(
        'FrameVerticalEdge__title',
        `FrameVerticalEdge__title-${ props?.position }`,
        'FrameVerticalEdge__label',
        props?.title?.[ props?.position ] ? '' : 'FrameVerticalEdge__no-title'
      ) }>
        <span>{ props?.title?.[ props?.position ] }</span>
      </div>

      { ( props?.links?.[ props?.position ] ?? [] ).map((link: any, idx: number) => {

        return (
          <a key={ [ 'link', idx ].join('_') }
             onClick={ () => handleLinkClick(link) }
             className={ clsx(
               'FrameVerticalEdge__link',
               `FrameVerticalEdge__link-${ props?.position }`,
               `FrameVerticalEdge__link-${ idx }`
             ) }>
            <div className="FrameVerticalEdge__label">{ link.title }</div>
          </a>
        );
      }) }
    </div>
  );
};

export default FrameVerticalEdge;