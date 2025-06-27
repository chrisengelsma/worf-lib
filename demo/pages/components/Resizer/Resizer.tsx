import React, { useRef, useState } from 'react';
import './Resizer.scss';

const Resizer = (props: React.PropsWithChildren<any>): React.ReactElement => {

  const [ dragging, setDragging ] = useState<string[]>([]);
  const [ hitboxSize ] = useState<number>(props?.hitboxSize ?? 10);
  const [ minGutterSize ] = useState<number>(props?.minGutterSize ?? 100);
  const [ outOfBounds, setOutOfBounds ] = useState<string[]>([]);

  const resizeContainerRef: React.RefObject<any> = useRef<any>(null);

  const [ bounds, setBounds ] = useState<any>({ left: minGutterSize, right: minGutterSize, top: minGutterSize, bottom: minGutterSize });

  const handleMouseDown = (id: string) => (e: any) => {
    if (resizeContainerRef?.current) {
      e.preventDefault();
      setDragging(() => id.split('-'));
    }
  };

  const handleMouseMove = (e) => {
    if (!dragging.length || !resizeContainerRef) { return; }

    e.preventDefault();

    const _bounds: any = { ...bounds };
    let oob: any[] = [ ...outOfBounds ];

    const boundingBox: any = resizeContainerRef?.current?.getBoundingClientRect();

    for (const drag of dragging) {

      let pos: number = 0;

      switch (drag) {
        case 'left':
          pos = e.pageX - boundingBox.left;
          break;
        case 'right':
          pos = boundingBox.right - e.pageX;
          break;
        case 'top':
          pos = e.pageY - boundingBox.top;
          break;
        case 'bottom':
          pos = boundingBox.bottom - e.pageY;
          break;
        default:
          console.error(`Unknown value for 'dragging': ${ dragging }`);
          return;
      }

      if (pos < minGutterSize - 10) {
        oob.push(drag);
      } else {
        oob = oob.filter(x => x !== drag);
      }

      _bounds[ drag ] = Math.max(pos, minGutterSize);
    }

    setOutOfBounds([ ...oob ]);
    setBounds((prevState: any) => {
      return {
        ...prevState,
        ..._bounds,
      };
    });
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    setDragging(() => []);
    setOutOfBounds(() => []);
  };

  const renderResizeCorners = (): React.ReactElement[] => {
    return [ 'top-left', 'top-right', 'bottom-left', 'bottom-right' ].map((id: string) => {

      const [ vbound, hbound ] = id.split('-');

      const halfHitboxSize: number = hitboxSize / 2;

      const vb: number = bounds[ vbound ] - halfHitboxSize;
      const hb: number = bounds[ hbound ] - halfHitboxSize;

      return (
        <div key={ 'resize-' + id }
             className={ `Resizer__resizer Resizer__resizer-${ id }` }
             style={ {
               width: hitboxSize,
               height: hitboxSize,
               [ vbound ]: vb,
               [ hbound ]: hb
             } }
             onMouseDown={ handleMouseDown(id) }
        />
      );
    });
  };

  const renderResizeGutters = (): React.ReactElement[] =>
    [ 'left', 'right', 'top', 'bottom' ].map((id: string) => (
      <React.Fragment key={ 'resize-' + id }>
        <div style={ { [ id ]: bounds[ id ] - 10 } }
             className={ `Resizer__resizer Resizer__resizer-${ id } ${ dragging.includes(id) ? `Resizer__resizer-${id}--alert` : '' }` }
             onMouseDown={ handleMouseDown(id) }/>

        <div style={ { [ [ 'left', 'right' ].includes(id) ? 'width' : 'height' ]: bounds[ id ] } }
             className={ `Resizer__gutter Resizer__gutter-${ id } ${ outOfBounds.includes(id) ? `Resizer__gutter--alert` : '' }` }/>
      </React.Fragment>
    ));

  const renderDimensionsLabel = (): React.ReactElement | null => {
    if (resizeContainerRef) {
      const boundingBox: any | undefined = resizeContainerRef?.current?.getBoundingClientRect();

      if (boundingBox) {

        const width: number = Math.floor(boundingBox?.width - ( bounds.right + bounds.left ));
        const height: number = Math.floor(boundingBox?.height - ( bounds.bottom + bounds.top ));

        return (
          <div className="Resizer__resize-label" style={ { left: bounds.left, top: bounds.top - 38 } }>
            { width } x { height }
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="Resizer"
         onMouseMove={ handleMouseMove }
         onMouseUp={ handleDragEnd }
         onMouseLeave={ handleDragEnd }
         ref={ resizeContainerRef }
         style={ {
           // @ts-ignore
           '--idle-color': 'rgba(255, 255, 255, 0.2)',
           '--active-color': 'rgba(255, 0, 0, 0.8)',
         } }
    >

      { renderDimensionsLabel() }
      { renderResizeGutters() }
      { renderResizeCorners() }

      <div className="Resizer__resized-wrapper" style={ { ...bounds } }>
        <div className="Resizer__resized-content">
          { props.children }
        </div>
      </div>
    </div>
  );
};


export default Resizer;
