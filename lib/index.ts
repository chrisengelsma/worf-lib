import { FramePanel as OriginalFramePanel } from './components/FramePanel/FramePanel.tsx';
import { OvalButton as OriginalOvalButton } from './components/OvalButton/OvalButton.tsx';
import { GridView as OriginalGridView } from './components/GridView/GridView.tsx';
import { CalendarGrid as OriginalCalendarGrid } from './components/CalendarGrid/CalendarGrid.tsx';

import { withWorfTheme } from './components/ThemeProvider/ThemeProvider.tsx';

export const FramePanel = withWorfTheme(OriginalFramePanel);
export const OvalButton = withWorfTheme(OriginalOvalButton);
export const GridView = withWorfTheme(OriginalGridView);
export const CalendarGrid = withWorfTheme(OriginalCalendarGrid);

export { ThemeProvider } from './components/ThemeProvider/ThemeProvider.tsx';
