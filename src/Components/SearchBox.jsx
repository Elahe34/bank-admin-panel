import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';

const SearchBox = () => {
  const [openSearchBox, setOpenSearchBox] = useState(false);

  return (
    <div className="mr-0">
      <AnimatePresence>
        {openSearchBox && (
          <motion.input
            key="search-box"
            type="text"
            placeholder="جستجو کنید و لذت ببرید"
            className="search-box px-2 py-1 text-sm outline-none placeholder-gray-500 dark:placeholder-white"
            style={{
              width: '0px',
              borderBottom: 'none',
              overflow: 'hidden',
              transition: 'border-bottom 0.3s ease-in-out',
            }}
            initial={{ width: 0, opacity: 0, borderBottom: 'none' }}
            animate={{
              width: '300px',
              opacity: 1,
              borderBottom: '2px solid #D00E1D',
              transition: { duration: 0.4 },
            }}
            exit={{
              width: 0,
              opacity: 0,
              borderBottom: 'none',
              transition: { duration: 0.4 },
            }}
          />
        )}
      </AnimatePresence>
      <IoSearch
        onClick={() => setOpenSearchBox(!openSearchBox)}
        className="search-box-icon text-xl text-gray-600"
      />
    </div>
  );
};

export default SearchBox;
