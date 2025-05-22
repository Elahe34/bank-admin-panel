import { useDispatch, useSelector } from 'react-redux';
import { Sun, Moon } from 'lucide-react';
import { toggleTheme } from '../Slices/ThemeSlice';

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <div className="flex items-center gap-2">
      <Sun
        className={`w-5 h-5 ${
          mode === 'dark' ? 'scale-75' : 'scale-110 text-amber-400'
        }`}
      />

      <button
        onClick={() => dispatch(toggleTheme())}
        className={`w-14 h-7 flex items-center rounded-full p-1 duration-300 ${
          mode === 'dark'
            ? 'bg-gray-800 justify-end'
            : 'bg-yellow-400 justify-start'
        }`}
      >
        <div className="bg-white w-5 h-5 rounded-full shadow-md"></div>
      </button>
      <Moon
        className={`w-5 h-5 ${
          mode === 'dark' ? 'scale-110 text-amber-400' : 'scale-75'
        }`}
      />
    </div>
  );
};

export default ThemeSwitch;
