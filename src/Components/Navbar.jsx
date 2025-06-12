import React, { useState, useEffect, useRef } from 'react';
import { Menu, BellRing, Mail, Cog, X, LogOut, User } from 'lucide-react';
import Theme from './Theme';
import CommentBox from './BoxMassage/CommentBox';
import { Link } from 'react-router-dom';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);


  const bellRef = useRef(null);
  const commentBoxRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isCommentBoxOpen &&
        commentBoxRef.current &&
        bellRef.current &&
        !commentBoxRef.current.contains(event.target) &&
        !bellRef.current.contains(event.target)
      ) {
        setIsCommentBoxOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isCommentBoxOpen]);

  return (
    <div
      className={`h-16 fixed top-0 left-0 right-0 z-10 bg-[#f5f4f4] shadow-md dark:bg-[#181B23] flex items-center justify-between px-6 transition-all ease-in-out duration-300`}
    >
      <div className="flex items-center gap-3 relative">
        <LogOut className="w-5 h-5 hover:scale-110 transition cursor-pointer text-red-600" />
        <User className="w-5 h-5 hover:scale-110 transition cursor-pointer" />

        <div className="relative" ref={bellRef}>
          <BellRing
            className="w-5 h-5 hover:scale-110 transition cursor-pointer"
            onClick={() => setIsCommentBoxOpen(!isCommentBoxOpen)}
          />
          {isCommentBoxOpen && (
            <div ref={commentBoxRef}>
              <CommentBox />
            </div>
          )}
        </div>

        <Link to='/setting'>
          <Cog className="w-5 h-5 hover:rotate-45 transition cursor-pointer" />
        </Link>
        <Theme />
      </div>

      <div className="text-2xl gap-2 items-center flex font-semibold text-gray-800">
        <div>
          <button
            className="transition-all duration-500"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <X className="cursor-pointer border-none dark:text-blue-50" />
            ) : (
              <Menu className="cursor-pointer border-none dark:text-blue-50" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
