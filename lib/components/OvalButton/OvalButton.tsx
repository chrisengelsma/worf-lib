import React from 'react';

import './OvalButton.scss';
import clsx from 'clsx';
import { CSSProperties } from 'react';

export interface IOvalButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  active?: boolean;
  alert?: boolean;
  tall?: boolean;
  shrink?: boolean;
  grow?: boolean;
  status?: string;
  blink?: boolean;
  label?: any;
  style?: CSSProperties;
}

export const OvalButton: React.FC<IOvalButtonProps> = (
  {
    disabled = false,
    onClick = () => {},
    active = false,
    alert = false,
    tall = false,
    shrink = false,
    grow = false,
    status = '',
    blink = false,
    style = {},
    label = '',
  }: IOvalButtonProps
) => {

  const handleClick = () => {
    if (disabled) { return; }
    onClick();
  };

  return (
    <div onClick={ handleClick }
         className={
           clsx(
             'OvalButton',
             active ? 'OvalButton--active' : null,
             alert ? 'OvalButton__alert' : null,
             shrink ? grow ? null : 'OvalButton__shrink' : grow ? 'OvalButton__grow' : null,
             tall ? 'OvalButton__tall' : null,
             disabled ? 'OvalButton--disabled' : null,
             status ? 'OvalButton__status-' + status : null,
             blink ? 'OvalButton__animate-blink' : null,
           )
         }
         style={ {
           ...style,
         } }
    >{ label }</div>
  );
};
