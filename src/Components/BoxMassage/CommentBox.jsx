import React from "react";
import { IoMdTimer } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Massages from "../Pages/Massages";

const CommentBox = () => {
  return (
    <div className="border rounded-lg bg-slate-50 z-50 absolute cursor-pointer w-80 top-7 p-3">
      {/* Comment 1 */}
      <div className="py-2 px-3 flex justify-between border-b border-zinc-300">
        <img src="/assets/comment1.jpg" className="w-14 h-14 rounded-full mt-2" alt="" />
        <div>
          <h5 className="font-semibold"> الهه سلطانی</h5>
          <p className="pb-0 mb-0 text-sm">اطلاعات کاربری من و گرفتید؟</p>
          <div className="flex items-center mt-2">
            <IoMdTimer className="text-gray-500" />
            <span className="text-xs text-gray-500">۴ ساعت پیش</span>
          </div>
        </div>
        <FaStar className="text-red-600 mt-2" />
      </div>

      {/* Comment 2 */}
      <div className="py-2 px-3 flex justify-between border-b border-zinc-300">
        <img src="/assets/comment2.jpg" className="w-14 h-14 rounded-full mt-2" alt="" />
        <div>
          <h5 className="font-semibold">مهدی حاجیلو</h5>
          <p className="pb-0 mb-0 text-sm">اطلاعات کاربری من و گرفتید؟</p>
          <div className="flex items-center mt-2">
            <IoMdTimer className="text-gray-500" />
            <span className="text-xs text-gray-500">۴ ساعت پیش</span>
          </div>
        </div>
        <FaStar className="text-slate-600 mt-2" />
      </div>

      {/* Comment 3 */}
      <div className="py-2 px-3 flex justify-between border-b border-zinc-300">
        <img src="/assets/comment3.jpg" className="w-14 h-14 rounded-full mt-2" alt="" />
        <div>
          <h5 className="font-semibold">ساتین حاجیلو</h5>
          <p className="pb-0 mb-0 text-sm">اطلاعات کاربری من و گرفتید؟</p>
          <div className="flex items-center mt-2">
            <IoMdTimer className="text-gray-500" />
            <span className="text-xs text-gray-500">۴ ساعت پیش</span>
          </div>
        </div>
        <FaStar className="text-amber-500 mt-2" />
      </div>

      {/* Show all button */}
      <div className="text-center cursor-pointer">
        <Link to='/massages'  className="text-sm p-2">نمایش همه ی پیغام ها</Link>
      </div>
    </div>
  );
};

export default CommentBox;