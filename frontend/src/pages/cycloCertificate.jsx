
import React, { useState, useRef } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import * as fontkit from 'fontkit';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const CycloCertificate = () => {
  const [bibNumber, setBibNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.animate-in', {
      duration: 0.8,
      opacity: 0,
      y: 30,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  const participantMaps = new Map([
  ['15103', { name: 'Aditiya Kulkarni' }],
  ['15107', { name: 'Sumit Danekar' }],
  ['15039', { name: 'Saharsh Kolhe' }],
  ['15120', { name: 'Vijay Bajad' }],
  ['15071', { name: 'Riddhesh Randive' }],
  ['15069', { name: 'Shruti Rathod' }],
  ['15068', { name: 'Adarsh Sanap' }],
  ['15024', { name: 'Sarthak Dupare' }],
  ['15064', { name: 'Ishwari Chavan' }],
  ['15132', { name: 'Ishwari Walke' }],
  ['15141', { name: 'Yeshashree Karhale' }],
  ['15133', { name: 'Vedashri Karhale' }],
  ['15011', { name: 'Aditi Mane' }],
  ['15001', { name: 'Jahnavi Singh' }],
  ['15097', { name: 'Narayani Toke' }],
  ['15115', { name: 'Dhruv Shiradhonkar' }],
  ['15117', { name: 'Kunal Bharsakale' }],
  ['15111', { name: 'Amay Bembde' }],
  ['15072', { name: 'Chaitanya Ghadge' }],
  ['15129', { name: 'Riya Kadam' }],
  ['15137', { name: 'Vaishnavi Patil' }],
  ['15029', { name: 'Pratham Nigade' }],
  ['15032', { name: 'Sunil Patil' }],
  ['15008', { name: 'Ratna Bangali' }],
  ['15048', { name: 'Aditya Roy' }],
  ['15044', { name: 'Shreya' }],
  ['15121', { name: 'Anuj Mattami' }],
  ['15013', { name: 'Pavan Payagude' }],
  ['15073', { name: 'Pratik Wanave' }],
  ['15040', { name: 'Sonal Mehta' }],
  ['15019', { name: 'Tanvi Loya' }],
  ['15085', { name: 'Narayan Auti' }],
  ['15041', { name: 'Samarth Patil' }],
  ['15065', { name: 'Harsh Vathare' }],
  ['15061', { name: 'Jay Savalwade' }],
  ['15036', { name: 'Dharini Patil' }],
  ['15057', { name: 'Ajinkya Magadum' }],
  ['15113', { name: 'Rana Patil' }],
  ['15081', { name: 'Sopan Pandurang Auti' }],
  ['15037', { name: 'Manav Khandve' }],
  ['15033', { name: 'Ansh Nerkar' }],
  ['15084', { name: 'Atharva Mankar' }],
  ['15060', { name: 'Krushnesh Hardas' }],
  ['15077', { name: 'Hemant Jadar' }],
  ['15056', { name: 'Herambh Bhrushundi' }],
  ['15102', { name: 'Mandar Khond' }],
  ['30299', { name: 'Sanjay Kuche' }],
  ['30084', { name: 'Abhijit Joshi' }],
  ['30149', { name: 'Ketan Gore' }],
  ['30173', { name: 'Sagar Satpute' }],
  ['30262', { name: 'Adheesh Subhedar' }],
  ['30122', { name: 'Sujit Vidwans' }],
  ['30176', { name: 'Yogeshwar Pendse' }],
  ['30032', { name: 'Gaurav Mothekadam' }],
  ['30188', { name: 'Viraj Sawant' }],
  ['30023', { name: 'Sushil Deore' }],
  ['30061', { name: 'Nikhil Takale' }],
  ['30069', { name: 'Col Prasad S V S A' }],
  ['30310', { name: 'Tanaji Gore' }],
  ['30110', { name: 'Kishore Bhamare' }],
  ['30190', { name: 'Varad Malekar' }],
  ['30270', { name: 'Pradnesh Ghatol' }],
  ['30198', { name: 'Aryan Rasane' }],
  ['30294', { name: 'Gaurav Pancholia' }],
  ['30162', { name: 'Yogendra Jagtap' }],
  ['30101', { name: 'Krushna Badhe' }],
  ['30274', { name: 'Ayaansh Das' }],
  ['30246', { name: 'Ronak Bhandari' }],
  ['30250', { name: 'Nirvan Mehta' }],
  ['30254', { name: 'Adwaay Ranade' }],
  ['30258', { name: 'Rishi Mulay' }],
  ['30108', { name: 'Bhooshan Waghmare' }],
  ['30177', { name: 'Anil Sharma' }],
  ['30076', { name: 'Tejas Cholkar' }],
  ['30286', { name: 'Sandip Gandekar' }],
  ['30169', { name: 'Yogesh Magdum' }],
  ['30277', { name: 'Sachin Mule' }],
  ['30111', { name: 'Kailas Pawar' }],
  ['30118', { name: 'Rohit Sancheti' }],
  ['30283', { name: 'Tulshidas Metakari' }],
  ['30180', { name: 'Satyajeet' }],
  ['30133', { name: 'Nimish Petkar' }],
  ['30066', { name: 'Nitin Tiwari' }],
  ['30072', { name: 'Jagdish Vyavahare' }],
  ['30242', { name: 'Nitin Muley' }],
  ['30290', { name: 'Ramdas Jagdale' }],
  ['30039', { name: 'Swapnil Naik' }],
  ['30281', { name: 'Anant Devgirikar' }],
  ['30029', { name: 'Khush Gandhi' }],
  ['30038', { name: 'Rupesh Babar' }],
  ['30201', { name: 'Nishkam Malik' }],
  ['30114', { name: 'Akash' }],
  ['30012', { name: 'Harsh Modak' }],
  ['30067', { name: 'Mahesh Kasar' }],
  ['30019', { name: 'Ansh Mehta' }],
  ['30285', { name: 'Dipak Salunkhe' }],
  ['30281', { name: 'Angad Mandve' }],
  ['30087', { name: 'Sagar Harpale' }],
  ['30197', { name: 'Abhijeet Varangaonkar' }],
  ['30129', { name: 'Nitin Joshi' }],
  ['30088', { name: 'Richhpal' }],
  ['30015', { name: 'Dhruv Shinde' }],
  ['30011', { name: 'Subodh Medsikar' }],
  ['30117', { name: 'Vedant Kulkarni' }],
  ['30064', { name: 'Sachindra Chavan' }],
  ['30006', { name: 'Rohan Musale' }],
  ['30086', { name: 'Deepak Patwardhan' }],
  ['30082', { name: 'Aroti Patwardhan' }],
  ['30078', { name: 'Deepali Joshi' }],
  ['30053', { name: 'Sachin Rajopadhye' }],
  ['30201', { name: 'Rajeev Khandekar' }],
  ['30200', { name: 'Jayant Cholkar' }],
  ['30158', { name: 'Rahul Khadekar' }],
  ['30154', { name: 'Rupesh Sharma' }],
  ['30150', { name: 'Vaibhav Limaye' }],
  ['30142', { name: 'Sanjay Bharambe' }],
  ['30138', { name: 'Bharat Moghe' }],
  ['30134', { name: 'Pankaj Devare' }],
  ['30206', { name: 'Nitin Sadawarte' }],
  ['30146', { name: 'Ayush Sadawarte' }],
  ['30202', { name: 'Nishant Wartak' }],
  ['30182', { name: 'Vamsee Krishna' }],
  ['30059', { name: 'Deepak Kumar' }],
]);


  const generatePDF = async (participant) => {
    const { name } = participant;

    try {
      setLoading(true);
      setError('');

      const [templateResponse, fontResponse] = await Promise.all([
        fetch('/pdf/cyclocert.pdf'),
        fetch('/fonts/cert.ttf')
      ]);
      const [existingPdfBytes, fontBytes] = await Promise.all([
        templateResponse.arrayBuffer(),
        fontResponse.arrayBuffer()
      ]);
      
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      pdfDoc.registerFontkit(fontkit);
      const customFont = await pdfDoc.embedFont(fontBytes);
      
      const [firstPage] = pdfDoc.getPages();
      const { width, height } = firstPage.getSize();
      const fontSize = 48;
      const textWidth = customFont.widthOfTextAtSize(name, fontSize);
      const xPosition = (width - textWidth) / 2;
      const yPosition = height / 2 - 50; 
      
      firstPage.drawText(name, {
        x: xPosition,
        y: yPosition,
        size: fontSize,
        font: customFont,
        color: rgb(0.1, 0.2, 0.5), 
      });
      
      const pdfBytes = await pdfDoc.save();
      const file = new File([pdfBytes], `Cyclothon_Certificate_${name.replace(/\s/g, '_')}.pdf`, { type: 'application/pdf;charset=utf-8' });
      saveAs(file);

      setBibNumber(''); 

    } catch (err)
     {
      setError('Oops! Failed to generate certificate. Please try again.');
      console.error('Detailed Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const trimmedBib = bibNumber.trim().toUpperCase(); 
    const participant = participantMaps.get(trimmedBib);

    if (participant) {
      generatePDF(participant);
    } else {
      setError('Invalid BIB number. Please check and try again.');
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full bg-gradient-to-br from-[#0a192f] to-[#091a31] text-white flex flex-col items-center justify-center p-4 font-sans"
    >
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="mb-10 text-center">
          <p className="text-lg text-gray-300 animate-in">Your E-Certificate Is Ready!</p>
        </div>

        <div className="w-full max-w-md p-8 space-y-6 border shadow-2xl animate-in border-white/10 shadow-cyan-500/10 bg-black/30 backdrop-blur-xl rounded-2xl">
          <h2 className="text-2xl font-semibold text-center text-gray-100">
            Download Your Certificate
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={bibNumber}
              onChange={(e) => setBibNumber(e.target.value)}
              placeholder="Enter Your BIB Number"
              className={`w-full px-4 py-3 text-white placeholder-gray-400 rounded-lg bg-gray-900/50 border-2 border-transparent
                transition-all duration-500
                focus:outline-none
                focus:border-white
                focus:ring-2 focus:ring-white
                focus:ring-offset-2 focus:ring-offset-black
                focus:scale-105`}
              required
            />

            
            <button
                type="submit"
                disabled={loading || !bibNumber.trim()}
                className="w-full px-4 py-3 font-bold text-white transition-all duration-300 transform bg-transparent border-2 rounded-lg border-white/50 hover:border-white hover:shadow-lg hover:shadow-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-100"
              >
                {loading ? 'Generating...' : 'Download Certificate'}
            </button>


            {error && (
              <div className="pt-2 font-medium text-center text-red-400">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CycloCertificate;