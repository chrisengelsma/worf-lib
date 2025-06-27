import React, { useEffect, useState } from 'react';
import './Controls.scss';

const Controls = (props: any) => {

  const [ controls, setControls ] = useState<any[]>([]);

  const handleCheckboxChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props?.onControlChange) {
      props.onControlChange({ id, value: e?.target?.checked ?? null });
    }
  };

  const handleMultiSelectChange = (id: string, option: string, arr: any[]) => (e: React.ChangeEvent<any>) => {
    if (arr && e.target.value === 'on') {
      if (arr.includes(option)) {
        arr.splice(arr.indexOf(option), 1);
      } else {
        arr.push(option);
      }
    }

    if (props?.onControlChange) {
      props.onControlChange({ id, value: arr });
    }
  };

  const handleControlChange = (id: string, value?: any) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (props?.onControlChange) {
      props.onControlChange({ id, value: value ?? e?.target?.value });
    }
  };

  const handleNumberControlChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (props?.onControlChange) {
      props.onControlChange({ id, value: +e?.target?.value });
    }
  };

  useEffect(() => {
    setControls([ ...props.controls ]);
  }, [ props?.controls ]);

  const renderControl = (control: any) => (
      <>
        { control.type === 'option' ? (
          <select value={ control.value }>
            { ( control.options ?? [] ).map((option: any, idx: number) => (
              <option key={ [ control.id, idx ].join('_') }>
                { option }
              </option>
            )) }
          </select>
        ) : null }

        { control.type === 'number' ? (
          <div>
            <span>{ control?.min }</span>
            <input type="range"
                   value={ control.value }
                   max={ control?.max }
                   min={ control?.min }
                   onChange={ handleNumberControlChange(control.id) }
            />
            <span>{ control?.max }</span>
          </div> ) : null }

        {
          control.type === 'text' ? (
            <input type="text"
                   value={ control.value }
                   onChange={ handleControlChange(control.id) }
            />
          ) : null }

        {
          control.type === 'json' ? (
            <textarea value={ JSON.stringify(control.value, null, 2) }
                      onChange={ handleControlChange(control.id) }
            />
          ) : null
        }

        {
          control.type === 'boolean' ? (
            <input type="checkbox"
                   checked={ control.value }
                   onChange={ handleCheckboxChange(control.id) }/>
          ) : null
        }

        {
          control.type === 'choice' ? (
            <fieldset id={ control.id }>
              { ( control.options ?? [] ).map((option: any, idx: number) => (
                <React.Fragment key={ [ control.id, idx ].join('_') }>
                  <input name={ control.id }
                         checked={ control.value === option }
                         onChange={ handleControlChange(control.id, option) }
                         type="radio"/>&nbsp;{ option }
                </React.Fragment>
              )) }
            </fieldset>
          ) : null
        }


        {
          control.type === 'multiple' ? (
            <fieldset id={ control.id }>
              { ( control.options ?? [] ).map((option: any, idx: number) => (
                <React.Fragment key={ [ option.id, idx ].join('_') }>
                  <input name={ option.id }
                         checked={ control.value.includes(option) }
                         onChange={ handleMultiSelectChange(control.id, option, control.value) }
                         type="checkbox"/>&nbsp;{ option }
                </React.Fragment>
              )) }
            </fieldset>
          ) : null
        }
      </>
    )
  ;

  return (
    <div className="Controls">
      <h3>Controls</h3>
      <form id="controls">
        <table className="Controls__table">
          <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>
          { controls.map((control: any, idx: number) => (
            <tr key={ [ 'control', idx ].join('_') }>
              <td>{ control.id }</td>
              <td>{ control.type }</td>
              <td style={ { width: '100%' } }>{ renderControl(control) }</td>
            </tr>
          )) }
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Controls;
