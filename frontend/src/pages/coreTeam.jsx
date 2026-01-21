import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Trophy, Target, Zap } from 'lucide-react';
import SEO from '@/components/SEO';
import TeamCard from '../components/TeamCard';
import Background3D from '../components/Background3D';
import { motion, AnimatePresence } from 'framer-motion';

const coreTeamMembers = [
  {
    role: "Secretary",
    name: "Aditya Dalvi",
    image: "/CoreTeam/Aaditya.avif",
    instagram: "https://www.instagram.com/aditya_dalvi1207/",
    linkedin: "https://www.linkedin.com/in/aditya-dalvi-a1b825259/"
  },
  {
    role: "Overall Coordinator",
    name: "Tushar Mahajan",
    image: "/CoreTeam/OC.avif",
    instagram: "https://www.instagram.com/_tushar_0810/",
    linkedin: "https://www.linkedin.com/in/tushar-mahajan-a8b720291/"
  }
];

const portfolioHeads = [
  //accounts 1 2
  { role: "Accounts Head", name: "Sairaj Pawar", image: "/CoreTeam/Sairaj.avif", linkedin: "https://www.linkedin.com/in/sairaj-pawar-649b66363?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/sairaj_pawar_7677?igsh=MTl5ZmlrcjRyZnNrYQ==", portfolio: "Accounts" },
  { role: "Accounts Head", name: "Karan Khairnar", image: "/CoreTeam/KaranK_compressed.avif", linkedin: "https://www.linkedin.com/in/karankhairnar", instagram: "https://www.instagram.com/karankhairnar87?igsh=MTFwdXF6OHU2Y2xycw==", portfolio: "Accounts" },
  //AOG 1 2
  { role: "AOG Head", name: "Om Behare", image: "/CoreTeam/Om.avif", linkedin: "https://www.linkedin.com/in/om-behare-26517b292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/ombehare1513?igsh=MXU0b3V4N2kweTBvaQ==", portfolio: "AOG" },
  { role: "AOG Head", name: "Riddhi Kamde", image: "/CoreTeam/Ridhi_compressed.avif", linkedin: "https://www.linkedin.com/in/riddhi-kamde-8a2699290", instagram: "https://www.instagram.com/riddhi.kamde?igsh=bWZ2aTJkanJkZ2Vv", portfolio: "AOG" },
  //Campus 1
  { role: "Campus Head", name: "Ranjit Shinde", image: "/CoreTeam/Ranjit.avif", linkedin: "https://www.linkedin.com/in/ranjit-shinde-02b70237b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/ranjit_shinde_108?igsh=YzVlbjVmMzl1N3hp", portfolio: "Campus" },
  { role: "Campus Head", name: "Sudarshan Mane", image: "/CoreTeam/Sudarshan_compressed.avif", linkedin: "https://www.linkedin.com/in/sudarshan-mane-98a171292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.linkedin.com/in/sudarshan-mane-98a171292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", portfolio: "Campus" },
  //Championship
  { role: "Championship Head", name: "Ajit Patil", image: "/CoreTeam/Ajit_compressed.avif", linkedin: "https://www.linkedin.com/in/ajit-patil-a7282b331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/ajit_patil_20?igsh=MXdmNHBmaHNtdDJmNQ%3D%3D", portfolio: "Championship" },
  //CRN 1 2
  { role: "CRN Head", name: "Bhumika Rawale", image: "/CoreTeam/Bhumika.avif", linkedin: "https://www.linkedin.com/in/bhumika-rawale-362983260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/bhumika_rawale?igsh=dzdwczV2dGMwcmQ4", portfolio: "CRN" },
  { role: "CRN Head", name: "Mokshank Gorwade", image: "/CoreTeam/Mokshank.avif", linkedin: "https://www.linkedin.com/in/mokshank-gorwade-8a2778335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/mokshank_7?igsh=MXVyZXY4azQ5OGdxcg==", portfolio: "CRN" },
  //Design 1 2 3
  { role: "Design Head", name: "Atharv Barve", image: "/CoreTeam/DesignAtharv.avif", linkedin: "https://www.linkedin.com/in/atharv-barve-335196330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/atharv_barve04?igsh=YmtldXRsZzBkaXo0", portfolio: "Design" },
  { role: "Design Head", name: "Vaishnavi Pradhan", image: "/CoreTeam/Vaishnavi_compressed.avif", linkedin: "https://in.linkedin.com/in/vaishnavi-pradhan-0885a039b", instagram: "https://www.instagram.com/vaish_h718?igsh=MmJteHhpdjRlazdl", portfolio: "Design" },
  { role: "Design Head", name: "Deep Vaidya", image: "/CoreTeam/Deep_compressed.avif", linkedin: "https://www.linkedin.com/in/deep-vaidya-vaidya-0b9900317?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/its.deeeeep?igsh=aDZ2YmFqYjljZGtn", portfolio: "Design" },
  //Documents 1
  { role: "Documentation Head", name: "Sahil Watharkar", image: "/CoreTeam/Sahil.avif", linkedin: "https://www.linkedin.com/in/sahil-watharkar-115a9433a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/sahil_watharkar?igsh=dXljMzc3ajllaGI5", portfolio: "Doc" },
  { role: "Documentation Head", name: "Mrunmayee Sangle", image: "/CoreTeam/MrunDocs_compressed.avif", linkedin: " https://www.linkedin.com/in/mrunmayi-sangle-878b8028b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/mrunmayisangle?igsh=MTFhdzR0cHp6dW53eQ==", portfolio: "Doc" },
  //ESM 1
  { role: "ESM Head", name: "Pawan Vaghule", image: "/CoreTeam/pawanWaghule.avif", linkedin: "https://www.linkedin.com/in/pawan-vaghule-59a318250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/pavan_._._09?igsh=amh4NzdnbnVvd3Y3", portfolio: "ESM" },
  //Event 1 2
  { role: "Events Head", name: "Varad Umardand ", image: "/CoreTeam/Varad_compressed.avif", linkedin: "https://www.linkedin.com/in/varad-umardand-786168292", instagram: "https://www.instagram.com/varad_2655?igsh=MXI0c2gxMDBvNWlpcA==", portfolio: "Events" },
  { role: "Events Head", name: "Shripad Pande", image: "/CoreTeam/shripad.avif", linkedin: "https://www.linkedin.com/in/shripad-pande-01181a293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/shripad_43?igsh=OXo2dGlobDdyaWdm", portfolio: "Events" },
  //FnM 1 2
  { role: "Finance and Marketing Head", name: "Utkarsh Wasade", image: "/CoreTeam/Utkarsh.avif", linkedin: "https://www.linkedin.com/in/utkarsh-wasade-b445672a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/utkarsh_wasade17?igsh=bGJiZzhlMWEyaDY0", portfolio: "Finance and Marketing" },
  { role: "Finance and Marketing Head", name: "Mrunal Khutemate", image: "/CoreTeam/Mrunal.avif", linkedin: "https://www.linkedin.com/in/mrunal-khutemate-593954290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/mrunal.khutemate_10?igsh=MWJlcjI2d2UzOWg0OA==", portfolio: "Finance and Marketing" },
  //Hospitality 1 2
  { role: "Hospitality Head", name: "Karan Bonde", image: "/CoreTeam/KaranB.avif", linkedin: "https://www.linkedin.com/in/karan-bonde-bb0576293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/bonde.karan?igsh=MTc0dHNlamJwdGRhag==", portfolio: "Hospitality" },
  { role: "Hospitality Head", name: "Yash Wankhede", image: "/CoreTeam/YashWankhede.avif", linkedin: "https://www.linkedin.com/in/yash-wankhede-b50762216?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/yashh__2_5?igsh=MWF0aDFrNnJrMzEwYg==", portfolio: "Hospitality" },
  //Infra 1 2
  { role: "Infra Head", name: "Atharv Salunkhe", image: "/CoreTeam/AtharvInfra_compressed.avif", linkedin: "https://www.linkedin.com/in/atharv-salunkhe-coep", instagram: "https://www.instagram.com/atharv_7.1?igsh=MWs4MXd0YjYydmJ2dQ==", portfolio: "Infra" },
  //logistics 1
  { role: "Logistics Head", name: "Kedar Patil", image: "/CoreTeam/kedarPatil.avif", linkedin: "https://www.linkedin.com/in/kedar-patil-18386833a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/kedar._.27?igsh=MTF5azRrOG11d2N2YQ==", portfolio: "Logistics" },
  //media 1
  { role: "Media Head", name: "Mrunmayee Jadhav", image: "/CoreTeam/MrunmayeeMedia_compressed.avif", linkedin: "https://www.linkedin.com/in/mrunmayee-jadhav-8a918b224?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/mrunmayeejadhav?igsh=MWk5OHAxMDFwMnoxdw==", portfolio: "Media" },
  //refreshment 1
  { role: "Refreshment Head", name: "Yash Ekhande", image: "/CoreTeam/RefreshmentYash.avif", linkedin: "https://www.linkedin.com/in/yash-ekhande-84296827b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", instagram: "https://www.instagram.com/michtohyashhh?igsh=MTVsdmN4ZzB4aHM4cA%3D%3D&utm_source=qr", portfolio: "Refreshment" },
  //safety 1
  { role: "Safety and Dispute Head", name: "Shrijeet Karandikar", image: "/CoreTeam/shreejit.avif", linkedin: "https://www.linkedin.com/in/shrijeet-karandikar-017570282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/shrik_04?igsh=cTlsaHZvdjB0b3li", portfolio: "Safety and Dispute" },
  //vfx 1
  { role: "VFX Head", name: "Sneha Raut", image: "/CoreTeam/SnehaRaut.avif", linkedin: "https://www.linkedin.com/in/sneha-raut-a39539296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/sneharaut_2137?igsh=ZDVtMDJ3eThvM3gx", portfolio: "VFX" },
  { role: "VFX Head", name: "Arnav Waske", image: "/CoreTeam/VFXArnav.avif", linkedin: "https://www.linkedin.com/in/arnavwaske?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.linkedin.com/in/arnavwaske?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", portfolio: "VFX" },
  //web 1 2  
  { role: "Web Head", name: "Palak Kongale", image: "/CoreTeam/Palak_compressed.avif", linkedin: "https://in.linkedin.com/in/palak-kongale-b212aa290", instagram: "https://www.instagram.com/_palakkongale_?igsh=MTVodDVqdWszMzc3MQ==", portfolio: "Web" },
  { role: "Web Head", name: "Vitthal Karanjkar", image: "/CoreTeam/Vitthal_compressed.avif", linkedin: "https://www.linkedin.com/in/vitthal-karanjkar-a90836226/.", instagram: "https://www.instagram.com/vitthal_karanjkar?igsh=MWdsMDVtNHpnZWpueA==", portfolio: "Web" },
];

const portfolioNames = [
  "Accounts", "AOG", "Campus", "Championship", "CRN", "Design", "Doc", "ESM", "Events", "Finance and Marketing", "Hospitality", "Infra", "Logistics", "Media", "Refreshment", "Safety and Dispute", "VFX", "Web"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const CoreTeam = () => {
  return (
    <div className="min-h-screen bg-neutral-900 relative overflow-hidden selection:bg-orange-600/50">
      <SEO title="CORE TEAM | ZEST '26" description="Meet the Core Team of ZEST 2026." />

      {/* 3D Background */}
      <Background3D />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 text-center z-10 pointer-events-none flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative inline-block border border-orange-500/30 bg-black/40 backdrop-blur-sm px-12 py-6 transform skew-x-[-10deg]"
        >
          {/* Decorative Brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-orange-500 -mt-1 -ml-1" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-orange-500 -mt-1 -mr-1" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-orange-500 -mb-1 -ml-1" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-orange-500 -mb-1 -mr-1" />

          <h1 className="text-4xl md:text-6xl font-['Energan'] uppercase tracking-widest text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,102,0,0.6)]">
            CORE TEAM
          </h1>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 pb-40">

        {/* Core Members Section - Split */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <Trophy size={48} className="text-orange-500" />
            <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase skew-x-[-10deg]">SECRETARY</h2>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-16"
          >
            <motion.div variants={itemVariants}>
              <TeamCard {...coreTeamMembers[0]} cardId="core-0" />
            </motion.div>
          </motion.div>
        </section>

        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <Trophy size={48} className="text-orange-500" />
            <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase skew-x-[-10deg]">OVERALL COORDINATOR</h2>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-16"
          >
            <motion.div variants={itemVariants}>
              <TeamCard {...coreTeamMembers[1]} cardId="core-1" />
            </motion.div>
          </motion.div>
        </section>

        {/* Portfolio Sections */}
        {portfolioNames.map((portfolioName, i) => {
          const portfolioMembers = portfolioHeads.filter(member => member.portfolio === portfolioName);
          if (portfolioMembers.length === 0) return null;

          return (
            <section key={portfolioName} className="mb-32">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-end gap-6 mb-16 border-b-2 border-orange-600/30 pb-4"
              >
                <div className="bg-orange-600/20 p-3 rounded-lg border border-orange-600 transform skew-x-[-10deg]">
                  <Target size={32} className="text-orange-500" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 uppercase italic tracking-tighter">
                  {portfolioName}
                </h2>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-wrap justify-center gap-x-12 gap-y-20"
              >
                {portfolioMembers.map((member, index) => (
                  <motion.div key={`${portfolioName}-${index}`} variants={itemVariants}>
                    <TeamCard {...member} cardId={`${portfolioName}-${index}`} />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default CoreTeam;