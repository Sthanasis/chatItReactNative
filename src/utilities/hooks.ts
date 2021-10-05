import { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { Colors } from './colors';

export const useTextColor = () => {
  const theme = useAppSelector((state) => state.settingsState.theme);
  const [color, setColor] = useState(
    theme === 'dark' ? Colors.lighter : Colors.darker
  );
  return color;
};
