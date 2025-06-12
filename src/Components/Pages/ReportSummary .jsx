import React, { useState, useRef, useEffect } from "react";
import { TrendingUp, TrendingDown, Users, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";

const ReportSummary = () => {
  const reports = [
    {
      title: "تعداد تراکنش‌ها",
      value: "1,250",
      icon: <TrendingUp className="text-green-500" />,
      details: [
        { label: "تراکنش موفق: ", value: "1,100" },
        { label: "تراکنش در انتظار: ", value: "150" },
      ],
    },
    {
      title: "کاربران فعال",
      value: "860",
      icon: <Users className="text-blue-500" />,
      details: [
        { label: "الهه کریمی", value: "وضعیت: فعال" },
        { label: "محمد احمدی", value: "وضعیت: فعال" },
      ],
    },
    {
      title: "تراکنش‌های ناموفق",
      value: "120",
      icon: <TrendingDown className="text-red-500" />,
      details: [
        { label: "عدم موجودی حساب", value: "70 مورد" },
        { label: "مشکل شبکه", value: "50 مورد" },
      ],
    },
    {
      title: "گزارش‌های امنیتی",
      value: "25",
      icon: <ShieldCheck className="text-purple-500" />,
      details: [
        { label: "ورود مشکوک", value: "10 مورد" },
        { label: "تلاش ورود ناموفق", value: "15 مورد" },
      ],
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="mt-6 mx-4 p-6 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md">
      <h2 className="text-2xl font-bold mb-10 mr-2 text-right ">گزارشات </h2>
      <ul className="space-y-4">
        {reports.map((report, index) => (
          <li
            key={index}
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition group cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl transform transition-transform duration-300 group-hover:scale-125">
                  {report.icon}
                </div>
                <span className="text-lg font-medium">{report.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-700 dark:text-gray-200">{report.value}</span>
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            <div
              ref={(el) => (contentRefs.current[index] = el)}
              style={{
                maxHeight: openIndex === index ? `${contentRefs.current[index]?.scrollHeight}px` : "0px",
                opacity: openIndex === index ? 1 : 0,
              }}
              className="overflow-hidden transition-all duration-700 ease-in-out"
            >
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-600 rounded">
                <ul className="space-y-2 mb-3">
                  {report.details.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  اطلاعات بیشتر
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportSummary;
