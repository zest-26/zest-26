import React, { useState, useEffect, useRef } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(null);
  const containerRef = useRef(null); // ref for detecting outside clicks

  const tabs = [
    { id: 1, title: "Finance and Markerting", people: ["Paul", "Quincy", "Rachel", "Steve", "Tina"] },
    { id: 2, title: "Tab 2", people: ["Uma", "Victor", "Wendy", "Xavier", "Yara"] },
    { id: 3, title: "Tab 3", people: ["Zane", "Abby", "Blake", "Cody", "Diana"] },
    { id: 4, title: "Tab 4", people: ["Paul", "Quincy", "Rachel", "Steve", "Tina"] },
    { id: 5, title: "Tab 5", people: ["Uma", "Victor", "Wendy", "Xavier", "Yara"] },
    { id: 6, title: "Tab 6", people: ["Zane", "Abby", "Blake", "Cody", "Diana"] },
    { id: 7, title: "Tab 7", people: ["Ethan", "Fiona", "George", "Holly", "Ian"] },
    { id: 8, title: "Tab 8", people: ["Jack", "Kara", "Liam", "Mona", "Noah"] },
    { id: 9, title: "Tab 9", people: ["Olivia", "Peter", "Queenie", "Ralph", "Sophia"] },
    { id: 10, title: "Tab 10", people: ["Tom", "Usha", "Violet", "Will", "Xena"] },
    { id: 11, title: "Tab 11", people: ["Yuri", "Zelda", "Arjun", "Bella", "Chris"] },
    { id: 12, title: "Tab 12", people: ["Derek", "Ella", "Farah", "Gautam", "Hazel"] },
    { id: 13, title: "Tab 13", people: ["Isha", "Jay", "Kunal", "Leah", "Meera"] },
    { id: 14, title: "Tab 14", people: ["Nikhil", "Omar", "Pooja", "Qadir", "Riya"] },
    { id: 15, title: "Tab 15", people: ["Sahil", "Tanvi", "Utkarsh", "Vidya", "Wasim"] },
    { id: 16, title: "Tab 16", people: ["Xavier", "Yash", "Zoya", "Ananya", "Bhavesh"] },
    { id: 17, title: "Tab 17", people: ["Chirag", "Deepa", "Eshan", "Fatima", "Gopal"] },
    { id: 18, title: "Tab 18", people: ["Harsh", "Ira", "Jatin", "Khushi", "Laksh"] },
  ];

  // 🔹 Close tab when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveTab(null); // close active tab
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full" ref={containerRef}>
      {/* Loop through tabs */}
      <div className="flex flex-col w-full gap-3 relative">
        {tabs.map((tab) => (
          <div key={tab.id} className="flex items-start gap-4 w-full">
            {/* Tab Button */}
            <button
              onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
              className={`w-[330px] px-4 py-2 rounded-xl text-left font-bold transition-all duration-300 h-[49px] ml-[180px]
                ${activeTab === tab.id ? "border-2" : "bg-white/20 hover:bg-white/40"}`}
            >
              {tab.title}
            </button>

            {/* Tab Content */}
            {activeTab === tab.id  && [1, 3, 5,7,9,11,13,15,17].includes(tab.id) && (
                <>
             <div className="absolute mt-[22px] left-[511px] w-[120px] h-[2px] bg-white"></div>
              <div className="mt-0 p-4 bg-white/10 w-[290px] border-2 rounded-xl shadow-md transition-all duration-500 absolute left-[631px]">
                <ul className="list-disc list-inside text-sm">
                  {tab.people.map((person, index) => (
                    <li key={index}>{person}</li>
                  ))}
                </ul>
              </div>
              </>
            )}
            {activeTab === tab.id  && [2,4,6,8,10,12,14,16,18].includes(tab.id) && (
                <>
             <div className="absolute mt-[22px] left-[60px] w-[120px] h-[2px] bg-white"></div>
              <div className="mt-0 p-4 bg-white/10 w-[290px] border-2 rounded-xl shadow-md transition-all duration-500 absolute left-[-230px]">
                <ul className="list-disc list-inside text-sm">
                  {tab.people.map((person, index) => (
                    <li key={index}>{person}</li>
                  ))}
                </ul>
              </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
