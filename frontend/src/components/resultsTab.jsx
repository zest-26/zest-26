import React, { useState, useEffect, useRef } from "react";
import { BadgeDollarSign,CalendarSync,Users,GraduationCap,Palette,Hotel,Video,Trophy,Boxes,Building2,IndianRupee,FileText, PenTool, CircuitBoard,Laptop, Share2, ShieldCheck, Coffee } from "lucide-react";
import gsap from "gsap";
const Tabs = () => {
  const [activeTab, setActiveTab] = useState(null);
  const containerRef = useRef(null); // ref for detecting outside clicks
  const peopleRefs = useRef([]); // refs for each tab's people
  const tabs = [
    { id: 1,icon: IndianRupee, title: "Accounts", people: ["1. Samarth Phartade",
"2. Mayuresh Jadhav",
"3. Aditi Manwadkar",
"4. Manav Khandave"] },
 { id: 2,icon: GraduationCap, title: "AOG", people: [
  "1. Pranjal Bhagat",
  "2. Hemabika Chaudhuri",
  "3. Neeraj Kumare",
  "4. Shaksham Betal",
  "5. Atharv Sakure"
] },
    { id:3,icon: Palette, title: "Campus", people: [
  "1. Praneeti Jogdande",
  "2. Srushti Burdande",
  "3. Bhavik Sangle",
  "4. Riya Rajesh Appini",
  "5. Sharyu Sonawane",
  "6. Shreya Dalmal",
  "7. Lokesh Suryawanshi",
  "8. Arjun Atul Hivarkar",
  "9. Varad Pandurang Vankar",
  "10. Akshay Susar",
  "11. Neeraj Rahte",
  "12. Ranjeet Wakde"
] },
{ id: 4,icon: Trophy, title: "Championship", people: [
  "1. Alraza Shaikh",
  "2. Aditi Manwadkar",
  "3. Ayush Phad",
  "4. Manya Yadav",
  "5. Kunal Gangurde"
] },
{ id: 5,icon: Users, title: "CRN", people: [
  "1. Aanchal Sourabh Kulkarni",
  "2. Sharwari Rajesh Jawade",
  "3. Sarvesh Kale",
  "4. Atharva Pankaj Jagtap",
  "5. Atharva Sandip Gadge",
  "6. Tanmay Eshwar Pendharkar",
  "7. Shreyash Raghunath Desai",
  "8. Akshaj Saxena",
  "9. Ajinkya Arvind Magadum",
  "10. Tejveer Dhakne",
  "11. Suraj Sakharam Binnar",
  "12. Samruddhi Vinod Wayal",
  "13. Ruturaj Dhotre",
  "14. Prasad Wadkae",
  "15. Akshita Sharma"
] },
     { id: 6,icon: PenTool, title: "Design", people: [
  "1. Arti Vinod Pradhan",
  "2. Adeena Mir",
  "3. Yashwant Chandane",
  "4. Sanat Nikesh Nagpurkar"
] },
 { id: 7,icon: FileText, title: "Documentation", people: [
  "1. Satyajeet Patil",
  "2. Shambhuraje Gosavi",
  "3. Adarsh Sanap",
  "4. Ansh Nerkar"
] },
{ id: 8,icon: CircuitBoard, title: "ESM", people: [
  "1. Achyut Kamble",
  "2. Vijay Sinde",
  "3. Vedant Mahajan"
] },
{ id: 9,icon: CalendarSync, title: "Events", people: [
  "1. Parth Kamlakar",
  "2. Ajinkya Magdum",
  "3. Samarth Patil",
  "4. Shaurya Ichalkaranjikar",
  "5. Jay Savalwade",
  "6. Shruti Rathod",
  "7. Sunayana Chakane",
  "8. Avantika Shinde",
  "9. Atharva Sakhare",
  "10. Ajinkya Kamdi",
  "11. Ravindra Raut",
  "12. Atharva Vyas",
  "13. Janvi Shende",
  "14. Archie Meshram",
  "15. Vedhika Matey",
  "16. Anisha Kamble",
  "17. Rahul Shinde"
] },

    
    { id: 10,icon: BadgeDollarSign,  title: "Finance and Markerting", people: [
  "1. Shreya Dagade",
  "2. Aanchal Kulkarni",
  "3. Karan Jagdale",
  "4. Tejveer Dhokne",
  "5. Aditya Jadhav",
  "6. Vedika Bhagat",
  "7. Tanishq Bhirud",
  "8. Samrudhi Wayal",
  "9. Anisha Gadkari",
  "10. Mustafa",
  "11. Shreyash Wathore",
  "12. Ruturaj Dhotre"
] },

      { id: 11,icon: Hotel, title: "Hospitality", people: [
  "1. Angad Joshi",
  "2. Vedshree Karha",
  "3. Atharva Sakhre"
] },
{ id: 12,icon: Building2, title: "Infra", people: [
  "1. Rohan Wagh",
  "2. Ketan Roplekar",
  "3. Sayyam Badgujar",
  "4. Harshwardhan Pawar"
] },
    { id: 13,icon: Boxes, title: "Logistics", people: [
  "1. Aditya Shergave",
  "2. Shubham Pawar",
  "3. Pranav Katkar",
  "4. Harsh Wathare",
  "5. Shambhavi Sachin Jagtap"
] },
{ id: 14,icon: Share2, title: "Media", people: [
  "1. Pawan Devtale",
  "2. Archi Meshram ",
  "3. Shreyas Tathe "
] },
 { id: 15,icon: Coffee, title: "Refreshment", people: [
  "1. Shreyash Wathore",
  "2. Saksham Betal",
  "3. Ketan Roplekar",
  "4. Aishwarya Prakash"
] },

   { id: 16,icon: ShieldCheck, title: "Safety and Dispute", people: [
  "1. Tushar",
  "2. Manas",
  "3. Janvhi",
  "4. Riya"
] },

    { id: 17,icon: Video, title: "VFX", people: [
  "1. Abhishek Bijaraya",
  "2. Mrunmayi Landhe",
  "3. Sanskruti Rakas",
  "4. Neeraj Mane"
] },
    { id: 18,icon: Laptop, title: "Web", people: [
  "1. Arjun",
  "2. Dhruv",
  "3. Sonal"
] },


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
