import React, { useState } from "react";
import { Bell, Key, Globe, Palette, Settings, Shield, BatteryCharging } from "lucide-react";

const SettingsPanel = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [batterySaverEnabled, setBatterySaverEnabled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("fa");
  const [selectedTheme, setSelectedTheme] = useState("default");

  const settingsOptions = [
    {
      title: "مدیریت اعلان‌ها",
      icon: <Bell size={30} />,
      action: (
        <ToggleSwitch
          enabled={notificationsEnabled}
          setEnabled={setNotificationsEnabled}
        />
      ),
    },
    {
      title: "تایید دو مرحله‌ای",
      icon: <Shield size={30} />,
      action: (
        <ToggleSwitch
          enabled={twoFactorEnabled}
          setEnabled={setTwoFactorEnabled}
        />
      ),
    },
    {
      title: "حالت صرفه‌جویی باتری",
      icon: <BatteryCharging size={30} />,
      action: (
        <ToggleSwitch
          enabled={batterySaverEnabled}
          setEnabled={setBatterySaverEnabled}
        />
      ),
    },
    {
      title: "انتخاب زبان",
      icon: <Globe size={30} />,
      action: (
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="p-2 rounded border dark:bg-gray-700 dark:text-white"
        >
          <option value="fa">فارسی</option>
          <option value="en">انگلیسی</option>
        </select>
      ),
    },
    {
      title: "انتخاب تم رنگی",
      icon: <Palette size={30} />,
      action: (
        <select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
          className="p-2 rounded border dark:bg-gray-700 dark:text-white"
        >
          <option value="default">پیش‌فرض</option>
          <option value="red">قرمز</option>
          <option value="blue">آبی</option>
          <option value="green">سبز</option>
        </select>
      ),
    },
    {
      title: "تغییر رمز عبور",
      icon: <Key size={30} />,
      action: (
        <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          تغییر
        </button>
      ),
    },
  ];

  return (
    <div className="mt-6 mx-4 p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center flex justify-center items-center gap-2">
        <Settings className="text-purple-500" />
        تنظیمات
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsOptions.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center bg-purple-100 dark:bg-purple-500 text-purple-700 dark:text-white rounded-full">
                {item.icon}
              </div>
              <span className="text-lg font-semibold">{item.title}</span>
            </div>
            <div>{item.action}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ToggleSwitch = ({ enabled, setEnabled }) => {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${
        enabled ? "bg-blue-600" : "bg-gray-400"
      }`}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
          enabled ? "translate-x-7" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
};

export default SettingsPanel;
