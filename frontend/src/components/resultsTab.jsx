import React, { useState, useEffect, useRef } from "react";
import { BadgeDollarSign,CalendarSync,Users,GraduationCap,Palette,Hotel,Video,Trophy,Boxes,Building2,IndianRupee,FileText, PenTool, CircuitBoard,Laptop, Share2, ShieldCheck } from "lucide-react";
import gsap from "gsap";
const Tabs = () => {
  const [activeTab, setActiveTab] = useState(null);
  const containerRef = useRef(null); // ref for detecting outside clicks
  const peopleRefs = useRef([]); // refs for each tab's people
  const tabs = [
    { id: 1,icon: BadgeDollarSign,  title: "Finance and Markerting", people: ["1. Paul", "2. Quincy", "3. Rachel", "4. Steve", "5. Tina","6. Quincy", "7. Rachel", "8. Steve", "9. Tina","10. Quincy", "11. Rachel", "12. Steve", "13. Tina","14. Quincy"] },
    { id: 2,icon: CalendarSync, title: "Events", people: ["1. Paul", "2. Quincy", "3. Rachel", "4. Steve", "5. Tina","6. Quincy", "7. Rachel", "8. Steve", "9. Tina","10. Quincy", "11. Rachel", "12. Steve", "13. Tina","14. Quincy"] },
    { id: 3,icon: Users, title: "CRN", people: ["1. Paul", "2. Quincy", "3. Rachel", "4. Steve", "5. Tina","6. Quincy", "7. Rachel", "8. Steve", "9. Tina","10. Quincy", "11. Rachel", "12. Steve", "13. Tina","14. Quincy"] },
    { id: 4,icon: GraduationCap, title: "AOG", people: ["1. Paul", "2. Quincy", "3. Rachel", "4. Steve", "5. Tina","6. Quincy", "7. Rachel", "8. Steve", "9. Tina","10. Quincy", "11. Rachel", "12. Steve", "13. Tina","14. Quincy"] },
    { id: 5,icon: Palette, title: "Campus", people: ["1. Paul", "2. Quincy", "3. Rachel", "4. Steve", "5. Tina","6. Quincy", "7. Rachel", "8. Steve", "9. Tina","10. Quincy", "11. Rachel", "12. Steve", "13. Tina","14. Quincy"] },
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

  // Animate people list when tab opens
  useEffect(() => {
    if (activeTab !== null && peopleRefs.current.length > 0) {
      gsap.fromTo(
        peopleRefs.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.1 }
      );
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col  pr-2 sm:pr-0 items-center w-full h-full" ref={containerRef}>
      {/* Loop through tabs */}
      <div className="flex flex-col top-[-140px] sm:top-[10px] pl-15 pr-3 sm:pl-0 sm:pr-0 sm:ml-15 sm:mr-0 w-full gap-3 relative">
        {tabs.map((tab) => (
          <div key={tab.id} className="flex items-start gap-4 w-full">
            {/* Tab Button */}
        
<button
  onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
  className={`w-full relative pl-[15px] rounded-xl text-left font-bold transition-all duration-300 transform h-[49px] 
    ${activeTab === tab.id ? "border-2" : "bg-white/10 hover:bg-white/40 hover:scale-105"}`}
>
  {tab.title}
  <tab.icon className="w-7 h-7 absolute left-[270px] top-[10px] sm:left-[350px] sm:top-[10px]" />  {/* Icon here */}
</button>
        
            
           
    
{activeTab === tab.id && (
  <div className=" relative mt-16  ml-[-335px] sm:ml-[-410px]">
    <div className="p-4  w-[320px] sm:w-[400px] shadow-md transition-all duration-500">
      <ul className="list-disc list-inside font-bold">
        {tab.people.map((person, index) => <p key={index} ref={(el) => (peopleRefs.current[index] = el)} className="opacity-0">{person}</p>)}
      </ul>
    </div>
  </div>
)}
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
