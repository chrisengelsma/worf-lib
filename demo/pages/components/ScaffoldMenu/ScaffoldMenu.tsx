import './ScaffoldMenu.scss';
import ScaffoldList from '../../../pages/ScaffoldList.ts';
import { NavLink } from 'react-router-dom';
import React from 'react';

const ScaffoldMenu = () => {

  const scaffoldList: any[] = ScaffoldList.map((x: any) => ( { ...x, path: '/test/' + x.component.name } ));


  return (
    <div className="ScaffoldMenu">
      <h3>Scaffolds</h3>
      <hr/>
      { scaffoldList.map((scaffold: any, idx: number) => (
        <div key={ [ 'scaffold', idx ].join('_') }
             className={ scaffold.path.startsWith(location?.pathname) ? 'ScaffoldMenu__item--active' : '' }>
          <NavLink key={ idx } to={ scaffold.path }>
            { scaffold.component.name.replace('Scaffold', '') }
          </NavLink>
        </div>
      )) }
    </div> );
};

export default ScaffoldMenu;