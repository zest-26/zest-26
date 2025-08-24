import React, { useState, useEffect, useRef } from "react";
import { BadgeDollarSign,CalendarSync,Users,GraduationCap,Palette,Hotel,Video,Trophy,Boxes,Building2,IndianRupee,FileText, PenTool, CircuitBoard,Laptop, Share2, ShieldCheck, Coffee } from "lucide-react";
import gsap from "gsap";
const Tabs = () => {
  const [activeTab, setActiveTab] = useState(null);
  const containerRef = useRef(null); // ref for detecting outside clicks
  const peopleRefs = useRef([]); // refs for each tab's people
  const tabs = [
    { id: 1,icon: IndianRupee, title: "Account", people: ["1. Niraj Ghuge",
"2. Suyash Jadhav",
"3. Sairaj Ahire",
"4. Harshwardhan Patil",
"5. Aditi Patil"] },
 { id: 2,icon: GraduationCap, title: "AOG", people: [
      "1. Aditya Upadhya",
"2. Harshad Deshmukh",
"3. Abhijeet Thool",
"4. Yuvraj Gavade",
"5. Sambodhi Ghansawant",
"6. Rutuja Kunde",
"7. Shubham Desai",
"8. Ritesh Lokare"
    ] },
    { id:3,icon: Palette, title: "Campus", people: ["1. Supriya Madne",
"2. Shreyash Shelake",
"3. Samruddhi Jadhav",
"4. Samruddhi Tavare",
"5. Sai Sanjay Athave",
"6. Prerana Nitin Gosavi",
"7. Sujal Sanjay Jadhav",
"8. Uday Rahate",
"9. Minal Vilas Rathod",
"10. Janhavi Atul Rathi",
"11. Anushka Vinod Pate",
"12. Samiksha Santosh Teke"] },
{ id: 4,icon: Trophy, title: "Championship", people: ["1. Bhavik Pawar",
"2. Shlok Sanap",
"3. Palak Chandankhede",
"4. Parth Shinde",
"5. Sushil Patil",
"6. Kushal Sonawane"] },
{ id: 5,icon: Users, title: "CRN", people: [
      "1. Devansh Ranjan",
      "2. Aditya Uikey",
      "3. Prachi Sonawane",
      "4. Mayur Chavan",
      "5. Swarali Shindikar",
      "6. Aditya Thube",
      "7. Ritesh Lokare",
      "8. Pranav Singh",
      "9. Sanskar Patil",
      "10. Niosh Mate",
      "12. Aman Kakate",
      "13. Siddhant Hemagire",
      "14. Kedar Kukade",
      "15. Harsvardhan Jagadale"
    ] },
     { id: 6,icon: PenTool, title: "Design", people: ["1. Sharvari Jadhav",
"2. Ankit Prasad Chaudhary",
"3. Shravani Bagde",
"4. Minal Jayraj Tawari"] },
 { id: 7,icon: FileText, title: "Documentation", people: ["1. Sayali Gujar",
"2. Shivam Ghuge",
"3. Prathamesh Dadas",
"4. Saharsh Kolhe",
"5. Juee Salunkhe"] },
{ id: 8,icon: CircuitBoard, title: "ESM", people: ["1. Khushwant Nandkmar",
"2. Parth Rathour",
"3. Ninad Patil",
"4. Rughved Ranadive",
] },
{ id: 9,icon: CalendarSync, title: "Events", people: [
      "1. Vishwajeet Patil",
"2. Radhika Rajput",
"3. Tushar Badgujar",
"4. Aditya Patil",
"5. Rutuja Mane",
"6. Swayam Gandhewar",
"7. Pranav Mohokar",
"8. Jayraj Chougule",
"9. Rutuja Tajave",
"10. Uday Gavali",
"11. Sanskriti Hegade",
"12. Shreyas Shinde",
"13. Ved Dethe",
"14. Ankit Gaikwad",
"15. Saumya Dere",
"16. Aditya Kadam"

    ] },

    
    { id: 10,icon: BadgeDollarSign,  title: "Finance and Markerting", people: [
      "1. Mandar Shimpi",
      "2. Om Mahalle",
      "3. Shivanjali Shinde",
      "4. Yash Pawar",
      "5. Soham Akolkar",
      "6. Shreyass Vispute",
      "7. Om Raut",
      "8. Mansi Gavande",
      "9. Shaurya Dubey",
      "10. Himesh Sisodiya",
      "11. Vaibhav Bahiram",
      "12. Pranav Gawand"] },

      { id: 11,icon: Hotel, title: "Hospitality", people: ["1. Krishna Chavan",
"2. Parth Patil",
"3. Prerna Roy",
"4. Swaraj Nayakawadi",
"5. Gayatri Chaudhari",
"6. Vaibhavi Patil"] },
{ id: 12,icon: Building2, title: "Infra", people: ["1. Viraj Borse",
"2. Kartikey Sharma",
"3. Abhishek Gajulwar",
"4. Abhijit More",
"5. Shubham Dada",
"6. Chetan Gomase"] },
    { id: 13,icon: Boxes, title: "Logistics", people: ["1. Soham Shinde",
"2. Aniket Thorat",
"3. Jeet Lotake",
"4. Nitesh Devali",
"5. Abhishek Talwar",
"6. Harsh Mehta"] },
{ id: 14,icon: Share2, title: "Media", people: ["1. Somya Bachhire","2. Sanchita Patil", "3. Kavita Sagawat","4. Nirzara Shinde"
] },
 { id: 15,icon: Coffee, title: "Refreshment", people: ["1. Om Haral",
"2. Dhananjay Jirekar",
"3. Sanket Khedkar",
"4. Jayesh Sadafule",
"5. Rushikesh Vikhe"] },

   { id: 16,icon: ShieldCheck, title: "Safety and Dispute", people: ["1. Prashant Patil",
"2. Parth Shinde",
"3. Arpita Wagh",
"4. Mayuresh Bhalerao",
"5. Shreyas Patil"] },

    { id: 17,icon: Video, title: "VFX", people: ["1. Sanjit Sakhare",
"2. Viren Patil",
"3. Atharv Rakhonde",
"4. Sanskar Kakade",
"5. Nihar Mali",
"6. Sanchita Nangare",
"7. Aditya Sarda",
"8. Prathmesh Murdande",
"9. Krishna Bamnote"] },
    { id: 18,icon: Laptop, title: "Web", people: ["1. Khilesh Rajput",
"2. Shreya Janorkar",
"3. Sanket Dube",
"4. Pratik Kumbhar"] },


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
