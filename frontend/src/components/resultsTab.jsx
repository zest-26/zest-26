import React, { useState, useEffect, useRef } from "react";
import { BadgeDollarSign,CalendarSync,Users,GraduationCap,Palette,Hotel,Video,Trophy,Boxes,Building2,IndianRupee,FileText, PenTool, CircuitBoard,Laptop, Share2, ShieldCheck } from "lucide-react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(null);
  const containerRef = useRef(null); // ref for detecting outside clicks

  const tabs = [
    { id: 1,icon: BadgeDollarSign,  title: "Finance and Markerting", people: ["Paul", "Quincy", "Rachel", "Steve", "Tina","Quincy", "Rachel", "Steve", "Tina","Quincy", "Rachel", "Steve", "Tina","Quincy"] },
    { id: 2,icon: CalendarSync, title: "Events", people: ["Uma", "Victor", "Wendy", "Xavier", "Yara","Victor", "Wendy", "Xavier", "Yara","Victor", "Wendy", "Xavier", "Yara","Yara"] },
    { id: 3,icon: Users, title: "CRN", people: ["Zane", "Abby", "Blake", "Cody", "Diana", "Abby", "Blake", "Cody", "Diana", "Abby", "Blake", "Cody"] },
    { id: 4,icon: GraduationCap, title: "AOG", people: ["Paul", "Quincy", "Rachel", "Steve", "Tina", "Quincy", "Rachel", "Steve", "Tina", "Quincy", "Rachel", "Steve"] },
    { id: 5,icon: Palette, title: "Campus", people: ["Uma", "Victor", "Wendy", "Xavier", "Yara","Uma", "Victor", "Wendy", "Xavier", "Yara"] },
    { id: 6,icon: Hotel, title: "Hospitality", people: ["Zane", "Abby", "Blake", "Cody", "Diana", "Diana"] },
    { id: 7,icon: Video, title: "VFX", people: ["Ethan", "Fiona", "George", "Holly", "Ian", "Ian"] },
    { id: 8,icon: Trophy, title: "Championship", people: ["Jack", "Kara", "Liam", "Mona", "Noah"] },
    { id: 9,icon: Boxes, title: "Logistics", people: ["Olivia", "Peter", "Queenie", "Ralph", "Sophia"] },
    { id: 10,icon: Building2, title: "Infra", people: ["Tom", "Usha", "Violet", "Will", "Xena"] },
    { id: 11,icon: IndianRupee, title: "Account", people: ["Yuri", "Zelda", "Arjun", "Bella"] },
    { id: 12,icon: FileText, title: "Documentation", people: ["Derek", "Ella", "Farah", "Gautam"] },
    { id: 13,icon: PenTool, title: "Design", people: ["Isha", "Jay", "Kunal", "Leah"] },
    { id: 14,icon: CircuitBoard, title: "ESM", people: ["Nikhil", "Omar", "Pooja", "Qadir"] },
    { id: 15,icon: Laptop, title: "Web", people: ["Sahil", "Tanvi", "Utkarsh", "Vidya"] },
    { id: 16,icon: Share2, title: "Media", people: ["Xavier", "Yash", "Zoya"] },
    { id: 17,icon: ShieldCheck, title: "Safety", people: ["Chirag", "Deepa", "Eshan"] },
    
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
  className={`w-full relative pl-[15px] rounded-xl text-left font-bold transition-all duration-300 transform h-[49px] 
    ${activeTab === tab.id ? "border-2" : "bg-white/10 hover:bg-white/40 hover:scale-105"}`}
>
  {tab.title}
  <tab.icon className="w-7 h-7 absolute left-[350px] top-[10px]" />  {/* Icon here */}
</button>
        
            {/* Tab Content */}
            {activeTab === tab.id  && [1, 3, 5,7,9,11,13,15,17].includes(tab.id) && (
                <>
             <div className="absolute mt-[22px] left-[400px] w-[120px] h-[2px] bg-white"></div>
              <div className="mt-0 p-4 bg-white/20 w-[280px] border-2 rounded-xl shadow-md transition-all duration-500 absolute left-[519px]">
                <ul className="list-disc list-inside font-bold">
                  {tab.people.map((person, index) => (
                    <p key={index} className="font-bold">{person}</p>
                  ))}
                </ul>
              </div>
              </>
            )}
            {activeTab === tab.id  && [2,4,6,8,10,12,14,16,18].includes(tab.id) && (
                <>
             <div className="absolute mt-[22px] left-[-120px] w-[120px] h-[2px] bg-white"></div>
             
              <div className="mt-0 p-4 bg-white/10 w-[280px] border-2 rounded-xl shadow-md transition-all duration-500 absolute left-[-400px]">
                <ul className="list-disc list-inside font-bold">
                  {tab.people.map((person, index) => (
                    <p key={index}>{person}</p>
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
