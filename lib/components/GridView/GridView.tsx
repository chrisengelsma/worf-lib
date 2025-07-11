import './GridView.scss';
import React from 'react';
import clsx from 'clsx';

/**
 * Displays data in an orange grid.
 * @param props
 */
export const GridView = (props: any) => {

  const [ columnCount, setColumnCount ] = React.useState<number>(props?.columnCount ?? 6);
  const [ data, setData ] = React.useState<any | any[]>(props?.data);
  const containerRef: React.RefObject<HTMLDivElement | null> = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setData(props?.data);
  }, [ props ]);

  React.useEffect(() => {
    if (containerRef.current) {
      delay(200).then(() => blinkRow(1).catch(console.error));
    }
  }, [ containerRef.current ]);

  async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const blinkRow = async (rowNo: number) => {
    const results: Element[] = Array.from(document.body.getElementsByClassName(`GridView-grid-row-${ rowNo }`));
    if (results.length === 0) {
      return;
    }

    results.forEach((_: Element, idx: number, arr: Element[]) => arr[ idx ].classList.remove('GridView-grid-cell-pulse'));
    for (let iCell: number = 0; iCell < columnCount; iCell++) {
      results[ iCell ].classList.add('GridView-grid-cell-pulse');
    }

    rowNo += 1;
    return delay(10).then(() => blinkRow(rowNo));
  };

  const emptyRow = () => new Array(columnCount).fill(' ');

  const handleCellClick = (e: { column?: number, row?: number, label?: string, index?: number, value?: string }) => (): void => {
    if (props?.onCellClick) {
      props.onCellClick(e);
    }
  };

  const handleMouseOverCell = (_props: { label?: string, row?: number, column?: number, value?: string }) => (): void => {
    const classNames = `${ props?.selectionModes?.includes('row') ? `GridView-grid-row-${ _props?.row }` : '' } ${ props?.selectionModes?.includes('column') ? `GridView-grid-column-${ _props?.column }` : '' }`;
    const results: Element[] = Array.from(document.body.getElementsByClassName(classNames));
    results.forEach((_: Element, idx: number, arr: Element[]) => arr[ idx ].classList.add(`GridView-grid-cell-wrapper-highlighted`));

    if (props?.onMouseOverCell) {
      props.onMouseOverCell(_props);
    }
  };

  const handleMouseLeaveCell = (_props: { label?: string, row?: number, column?: number, value?: string }) => (): void => {
    const classNames = `${ props?.selectionModes?.includes('row') ? `GridView-grid-row-${ _props?.row }` : '' } ${ props?.selectionModes?.includes('column') ? `GridView-grid-column-${ _props?.column }` : '' }`;
    const results: Element[] = Array.from(document.body.getElementsByClassName(classNames));
    results.forEach((_: Element, idx: number, arr: Element[]) => arr[ idx ].classList.remove(`GridView-grid-cell-wrapper-highlighted`));

    if (props?.onMouseLeaveCell) {
      props.onMouseLeaveCell(_props);
    }
  };

  const buildRows = (data: string | number | string[] | number[], lastRow: number, label?: string): { lastRow: number, components: React.ReactElement[] } => {
    if (!Array.isArray(data)) {
      data = [ data ] as string[] | number[];
    }

    const cells: string[] = [];
    let idx: number = 0;

    for (const dat of data) {
      if (idx % columnCount === 0) {
        cells.push(...emptyRow());
        if (label) { cells[ idx++ ] = idx === 1 ? label : ''; }
      }
      cells[ idx++ ] = dat.toString();
    }

    const components: React.ReactElement[] = cells.map((cell: string, index: number) => {
        if (index % columnCount === 0) { lastRow++; }
        const columnNo = index % columnCount;
        return (
          <span className={
            clsx(
              `GridView-grid-row-${ lastRow }`,
              `GridView-grid-column-${ columnNo }`,
              `GridView-grid-cell-wrapper`,
              // `GridView-grid-cell-wrapper-${ label }`,
              ( ( props?.showHeaderColumn && columnNo === 0 ) ||
                ( props?.showHeaderRows && index < columnCount ) ) ? 'GridView-grid-cell-header' : '',
            ) }
                onMouseOver={ handleMouseOverCell({ label, row: lastRow, column: columnNo, value: cell }) }
                onMouseLeave={ handleMouseLeaveCell({ label, row: lastRow, column: columnNo, value: cell }) }
                key={ [ 'cell', label, index ].join('_') }>

            <span className={
              clsx(
                `GridView-grid-cell`,
                `GridView-grid-cell-${ label }-${ index }`
              ) }
                  onClick={ handleCellClick({ column: index % columnCount, row: lastRow, label, index, value: cell }) }
            >{ cell }</span>
          </span>
        );
      }
    );

    if (props?.leaveGap) {
      for (let i: number = 0; i < columnCount; i++) {
        components.push(<div key={ [ label, 'gap', i ].join('_') }
                             style={ { paddingBottom: '1em' } }
        ></div>);
      }
    }
    return { components, lastRow };
  };

  const buildGrid = (): React.ReactElement[] => {
    let statRows: React.ReactElement[] = [];

    if (data) {
      if (Array.isArray(data)) {
        statRows = buildRows(data as string[], 0).components;
      } else {
        let lastRow: number = 0;
        for (const key of Object.keys(data)) {
          const value: string | string[] | number = data[ key ];
          const result = buildRows(value, lastRow, key);
          lastRow = result.lastRow;
          statRows = statRows.concat(result.components);
        }
      }
    }

    return statRows;
  };


  React.useEffect(() => {
    if (props?.gridColumnCount) {
      setColumnCount(props?.gridColumnCount);
    }
  }, [ props?.gridColumnCount ]);


  return (
    <div className="GridView-container"
         ref={ containerRef }
         style={ { gridTemplateColumns: `minmax(80px, 20%) repeat(${ columnCount - 1 }, minmax(80px, 1fr))` } }>
      { buildGrid() }
    </div>
  );
};
