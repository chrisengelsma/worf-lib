import './FrameContent.scss';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { FramePanelProps } from '../../FramePanel.tsx';

const FrameContent = (props: FramePanelProps & PropsWithChildren) => {

  return (
    <div className={ clsx(
      'FrameContent',
      props?.sides?.left ? 'FrameContent__left' : null,
      props?.sides?.right ? 'FrameContent__right' : null,
      props?.sides?.top ? 'FrameContent__top' : null,
      props?.sides?.bottom ? 'FrameContent__bottom' : null,

      props?.sides?.left && props?.links?.left ? 'FrameContent__left__links' : null,
      props?.sides?.right && props?.links?.right ? 'FrameContent__right__links' : null,

      props?.sides?.left && props?.links?.left && props?.expand?.left ? 'FrameContent__left-expanded' : null,
      props?.sides?.right && props?.links?.right && props?.expand?.right ? 'FrameContent__right-expanded' : null,

      props?.sides?.left && props?.sides?.top ? 'FrameContent__elbow-top-left' : null,
      props?.sides?.left && props?.sides?.bottom ? 'FrameContent__elbow-bottom-left' : null,
      props?.sides?.right && props?.sides?.top ? 'FrameContent__elbow-top-right' : null,
      props?.sides?.right && props?.sides?.bottom ? 'FrameContent__elbow-top-left' : null,
    ) }>
      <div className={ clsx(
        'FrameContent__buffer',
        props?.expand?.content ? 'FrameContent__buffer-full' : '',
      ) }>
        { props.children }
      </div>
    </div>
  );
};

export default FrameContent;