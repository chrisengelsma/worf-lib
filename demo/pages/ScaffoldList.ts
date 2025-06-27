import FramePanelScaffold from './scaffolds/FramePanelScaffold.tsx';
import OvalButtonScaffold from './scaffolds/OvalButtonScaffold.tsx';
import GridViewScaffold from './scaffolds/GridViewScaffold.tsx';

const ThemeControl: any = {
  id: 'theme',
  type: 'choice',
  value: 'warm',
  options: [ 'warm', 'cold', 'engineering', 'tng', 'blue-alert', 'red-alert' ]
};

export default [
  {
    component: FramePanelScaffold,
    controls: [
      ThemeControl,
      { id: 'sides.top', type: 'boolean', value: true },
      { id: 'sides.bottom', type: 'boolean', value: true },
      { id: 'sides.left', type: 'boolean', value: true },
      { id: 'sides.right', type: 'boolean', value: false },
      { id: 'expand.left', type: 'boolean', value: true, },
      { id: 'expand.right', type: 'boolean', value: false, },
      { id: 'expand.content', type: 'boolean', value: false, },
      { id: 'decorators.top', type: 'boolean', value: true, },
      { id: 'decorators.bottom', type: 'boolean', value: true, },
      { id: 'title.top', type: 'text', value: 'Top Title' },
      { id: 'title.bottom', type: 'text', value: 'Bottom Title' },
      { id: 'title.left', type: 'text', value: 'Left Title' },
      { id: 'title.right', type: 'text', value: 'Right Title' },
    ],
  },
  {
    component: OvalButtonScaffold,
    controls: [
      { id: 'label', type: 'text', value: 'Test Button' },
      { id: 'status', type: 'choice', value: 'none', options: [ 'none', 'success', 'error' ] },
      { id: 'blink', type: 'boolean', value: false },
      { id: 'active', type: 'boolean', value: false },
      { id: 'shrink', type: 'boolean', value: false },
      { id: 'grow', type: 'boolean', value: false },
      { id: 'disabled', type: 'boolean', value: false },
      { id: 'tall', type: 'boolean', value: false },
    ]
  },
  {
    component: GridViewScaffold,
    controls: [
      { id: 'gridColumnCount', type: 'number', value: 6, max: 10, min: 2 },
      { id: 'leaveGap', type: 'boolean', value: false },
      { id: 'selectionModes', type: 'multiple', value: [ 'row' ], options: [ 'row', 'column' ] },
      { id: 'showHeaderRows', type: 'boolean', value: true },
      { id: 'showHeaderColumn', type: 'boolean', value: true },
    ]
  },
];
