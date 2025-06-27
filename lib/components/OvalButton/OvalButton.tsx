import './OvalButton.scss';
import clsx from 'clsx';

export const OvalButton = (props: any) => {

  const handleClick = () => {
    if (props.disabled) { return; }
    if (props.onClick) { props.onClick(); }
  };

  return (
    <div onClick={ handleClick }
         className={
           clsx(
             'OvalButton',
             props?.active ? 'OvalButton--active' : null,
             props?.alert ? 'OvalButton__alert' : null,
             props?.shrink ? props?.grow ? null : 'OvalButton__shrink' : props?.grow ? 'OvalButton__grow' : null,
             props?.tall ? 'OvalButton__tall' : null,
             props?.disabled ? 'OvalButton--disabled' : null,
             props?.status ? 'OvalButton__status-' + props?.status : null,
             props?.blink ? 'OvalButton__animate-blink' : null,
           )
         }
         style={ {
           background: props?.background,
           width: props?.width,
           fontSize: props?.fontSize,
         } }
    >{ props?.label }</div>
  );
};
