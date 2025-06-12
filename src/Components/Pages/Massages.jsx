import React from "react";
import { CheckCircle, Circle, MessageSquare } from "lucide-react";

const messages = [
  {
    id: 1,
    user: "الهه کریمی",
    message: "سلام، لطفا وضعیت تراکنش رو بررسی کن.",
    time: "10 دقیقه پیش",
    unread: true,
  },
  {
    id: 2,
    user: "محمد احمدی",
    message: "گزارش امنیتی جدید ثبت شد.",
    time: "30 دقیقه پیش",
    unread: false,
  },
  {
    id: 3,
    user: "سارا رضایی",
    message: "کاربر جدید ثبت‌نام کرد.",
    time: "1 ساعت پیش",
    unread: true,
  },
];

const MessageList = () => {
  return (
    <div className="mt-6 mx-4 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center flex justify-center items-center gap-2">
        <MessageSquare className="text-blue-500" />
        پیام‌ها
      </h2>

      <ul className="space-y-4">
        {messages.map((msg) => (
          <li
            key={msg.id}
            className={`p-4 rounded-lg border hover:shadow-lg transition group cursor-pointer ${
              msg.unread ? "bg-gray-100 dark:bg-gray-700 border-blue-400" : "bg-gray-50 dark:bg-gray-600 border-transparent"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800 dark:text-gray-200">{msg.user}</span>
              {msg.unread ? (
                <Circle className="text-blue-500 w-4 h-4 animate-pulse" />
              ) : (
                <CheckCircle className="text-green-500 w-4 h-4" />
              )}
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 group-hover:scale-[1.02] transition">
              {msg.message}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
