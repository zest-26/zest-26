
import React, { useState, useRef, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import * as fontkit from 'fontkit';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import LightRays from './LightRays';
import DownloadButton from './DownloadButton';

gsap.registerPlugin(TextPlugin);

const CycloCertificate = () => {
    const [bibNumber, setBibNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showCard, setShowCard] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [downloadFileName, setDownloadFileName] = useState('');

    const containerRef = useRef(null);
    const cardRef = useRef(null);

    // GSAP animations for revealing elements
    useGSAP(() => {
        gsap.to("#welcome-title", {
            duration: 2.5,
            text: "Cyclothon Done Right!",
            ease: "none",
            delay: 0.5,
        });

        gsap.fromTo("#welcome-subtitle",
            { opacity: 0 },
            { opacity: 1, duration: 1, delay: 3 }
        );

        if (showCard) {
            gsap.fromTo(cardRef.current,
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' }
            );
        }
    }, { scope: containerRef, dependencies: [showCard] });

    useEffect(() => {
        const timer = setTimeout(() => {
            const welcomeContainer = containerRef.current.querySelector('#welcome-container');
            gsap.to(welcomeContainer, {
                opacity: 0, y: -20, duration: 0.7, ease: 'power3.in',
                onComplete: () => setShowCard(true)
            });
        }, 4500);
        return () => clearTimeout(timer);
    }, []);

    const participantMaps = new Map([
        ['15001', { name: 'Jahnavi Singh' }],
        ['15001', { name: 'Ketan Marathe' }],
        ['15002', { name: 'Dinesh Nikumbh' }],
        ['15002', { name: 'Aditya Kulkarni' }],
        ['15003', { name: 'Mahesh Tangsali' }],
        ['15003', { name: 'Parth Baxi' }],
        ['15004', { name: 'Mangesh Yelgaonkar' }],
        ['15005', { name: 'Vaibhav Munot' }],
        ['15005', { name: 'Aaryan Thanekar' }],
        ['15006', { name: 'Sanjay Gaikwad' }],
        ['15007', { name: 'Pravin Kadam' }],
        ['15008', { name: 'Ratna Bangali' }],
        ['15009', { name: 'Varad Chutake' }],
        ['15010', { name: 'Sandip Gholap' }],
        ['15011', { name: 'Aditi Mane' }],
        ['15011', { name: 'Shivam More' }],
        ['15012', { name: 'Pranav Patel' }],
        ['15013', { name: 'Pavan Payagude' }],
        ['15015', { name: 'Milind Pundlik' }],
        ['15016', { name: 'Yuvraj Salunke' }],
        ['15017', { name: 'Sanjay Rathod' }],
        ['15019', { name: 'Tanvi Loya' }],
        ['15020', { name: 'Riddhi Narkhede' }],
        ['15021', { name: 'ATHARVKA KHOTE' }],
        ['15023', { name: 'Aditya Salokhe' }],
        ['15024', { name: 'Sarthak Dupare' }],
        ['15025', { name: 'Prakash Mayane' }],
        ['15027', { name: 'Kedar Kulkarni' }],
        ['15028', { name: 'Nirupama Bhave' }],
        ['15029', { name: 'Pratham Nigade' }],
        ['15029', { name: 'Vikas Sawant' }],
        ['15031', { name: 'Prabhaker Shanmukha' }],
        ['15031', { name: 'Jagdish Sankpal' }],
        ['15032', { name: 'Sunil Patil' }],
        ['15033', { name: 'Ansh Nerkar' }],
        ['15035', { name: 'Mihika Bhagwat' }],
        ['15036', { name: 'Dharini Patil' }],
        ['15037', { name: 'Manav Khandve' }],
        ['15039', { name: 'Saharsh Kolhe' }],
        ['15040', { name: 'Sonal Mehta' }],
        ['15041', { name: 'Samarth Patil' }],
        ['15043', { name: 'Harsh Mehta' }],
        ['15044', { name: 'Shreya' }],
        ['15045', { name: 'Parth Kamalakar' }],
        ['15048', { name: 'Aditya Roy' }],
        ['15049', { name: 'Darsheel Nagrale' }],
        ['15052', { name: 'Sanskruti Kewale' }],
        ['15053', { name: 'Mayuresh Jadhav' }],
        ['15055', { name: 'Dhanashri Nivaragi' }],
        ['15056', { name: 'Herambh Bhrushundi' }],
        ['15057', { name: 'Ajinkya Magadum' }],
        ['15059', { name: 'Khushi Gogave' }],
        ['15060', { name: 'Krushnesh Hardas' }],
        ['15061', { name: 'Jay Savalwade' }],
        ['15063', { name: 'Samrat Manmode' }],
        ['15064', { name: 'Ishwari Chavan' }],
        ['15065', { name: 'Harsh Vathare' }],
        ['15067', { name: 'Vedant Kolte' }],
        ['15068', { name: 'Adarsh Sanap' }],
        ['15069', { name: 'Shruti Rathod' }],
        ['15071', { name: 'Riddhesh Randive' }],
        ['15072', { name: 'Chaitanya Ghadge' }],
        ['15073', { name: 'Pratik Wanave' }],
        ['15075', { name: 'Ravindra Bothe' }],
        ['15076', { name: 'Atharv 18' }],
        ['15077', { name: 'Hemant Jadar' }],
        ['15080', { name: 'Vighnesh Jagtap' }],
        ['15081', { name: 'Sopan Pandurang Auti' }],
        ['15083', { name: 'Swapnil Pawar' }],
        ['15084', { name: 'Atharva Mankar' }],
        ['15085', { name: 'Narayan Auti' }],
        ['15087', { name: 'Anant Sonale' }],
        ['15088', { name: 'Suresh Ankolikar' }],
        ['15089', { name: 'Shourya Tadwale' }],
        ['15091', { name: 'Pranali Buya' }],
        ['15092', { name: 'Nandkishor Gawade' }],
        ['15093', { name: 'Prathamesh More' }],
        ['15095', { name: 'Mahesh Khandkar' }],
        ['15096', { name: 'Atulya Anand' }],
        ['15097', { name: 'Narayani Toke' }],
        ['15099', { name: 'Shridhar Motale' }],
        ['15100', { name: 'Avadhut Khendad' }],
        ['15101', { name: 'Snehal Mane' }],
        ['15102', { name: 'Mandar Khond' }],
        ['15103', { name: 'Aditya Kulkarni' }],
        ['15105', { name: 'Tapan Das' }],
        ['15106', { name: 'Sharva Karne' }],
        ['15107', { name: 'Sumit Danekar' }],
        ['15108', { name: 'Nikhil Abhyankar' }],
        ['15109', { name: 'Santosh Divekar' }],
        ['15111', { name: 'Amay Bembde' }],
        ['15112', { name: 'Harshad Gangurde' }],
        ['15113', { name: 'Rana Patil' }],
        ['15115', { name: 'Dhruv Shiradhonkar' }],
        ['15116', { name: 'Hansh Ramchandani' }],
        ['15117', { name: 'Kunal Bharsakale' }],
        ['15119', { name: 'Aditya Sanjeevi' }],
        ['15120', { name: 'Vijay Bajad' }],
        ['15121', { name: 'Anuj Mattami' }],
        ['15124', { name: 'Avinash Devkhile' }],
        ['15125', { name: 'Samarth Deshmukh' }],
        ['15127', { name: 'Manas Ghagde' }],
        ['15129', { name: 'Riya Kadam' }],
        ['15130', { name: 'Rahul Karur' }],
        ['15131', { name: 'Aadesh Babar' }],
        ['15132', { name: 'Ishwari Walke' }],
        ['15133', { name: 'Vedashri Karhale' }],
        ['15135', { name: 'Sherwin Advant' }],
        ['15136', { name: 'Aditi Manwadkar' }],
        ['15137', { name: 'Vaishnavi Patil' }],
        ['15138', { name: 'Bhargav Sawant' }],
        ['15139', { name: 'Vijay Rajgude' }],
        ['15140', { name: 'Mousami Vaibhav Munot' }],
        ['15141', { name: 'Yeshashree Karhale' }],
        ['15143', { name: 'Rajesh Deshmukh' }],
        ['15144', { name: 'Nitin Patil' }],
        ['15145', { name: 'Ajinkya Burle' }],
        ['15146', { name: 'Omkar Dhavalsank' }],
        ['15147', { name: 'Chandrakant Jagtap' }],
        ['15148', { name: 'Ravindra Bhangare' }],
        ['15149', { name: 'Surabhi Nene' }],
        ['15150', { name: 'Anurag Bhute' }],
        ['15151', { name: 'Kunal Gangurde' }],
        ['15160', { name: 'Talha Shaikh' }],
        ['15161', {name : 'Saurish Dange'}],
        ['30004', { name: 'Santosh Gogave' }],
        ['30006', { name: 'Rohan Musale' }],
        ['30007', { name: 'Aditya Gagare' }],
        ['30008', { name: 'Bhushan Murudkar' }],
        ['30009', { name: 'Sunil Narake' }],
        ['30009', { name: 'Ravi Mohrut' }],
        ['30011', { name: 'Subodh Medsikar' }],
        ['30012', { name: 'Harsh Modak' }],
        ['30013', { name: 'Dnyaneshwar Shelke' }],
        ['30015', { name: 'Dhruv Shinde' }],
        ['30016', { name: 'Aniket Deshpande' }],
        ['30017', { name: 'Yuvaraj Bhinge' }],
        ['30018', { name: 'Anand Sharma' }],
        ['30019', { name: 'Ansh Mehta' }],
        ['30020', { name: 'Milind Patil' }],
        ['30022', { name: 'Ajay Chaurasiya' }],
        ['30023', { name: 'Sushil Deore' }],
        ['30024', { name: 'Murlidhar Hadke' }],
        ['30025', { name: 'Dhanraj Thorat' }],
        ['30026', { name: 'RAMESH CHOUDHARY' }],
        ['30027', { name: 'Ajit Purohit' }],
        ['30028', { name: 'Kuldip Kulkarni' }],
        ['30029', { name: 'Khush Gandhi' }],
        ['30031', { name: 'Nimish Chincholkar' }],
        ['30032', { name: 'Gaurav Mothekadam' }],
        ['30033', { name: 'Sandip Malode' }],
        ['30034', { name: 'Rakesh Sonawane' }],
        ['30035', { name: 'Akash Shinde' }],
        ['30036', { name: 'Vishal Kale' }],
        ['30037', { name: 'Yogesh Sadashiv Bhadal' }],
        ['30038', { name: 'Rupesh Babar' }],
        ['30039', { name: 'Swapnil Naik' }],
        ['30040', { name: 'Shivraj Nirmale' }],
        ['30041', { name: 'Bhushan Bhangale' }],
        ['30042', { name: 'Vinay Hiremath' }],
        ['30043', { name: 'AMOL BANDAL' }],
        ['30044', { name: 'Tukaram Dahiphale' }],
        ['30045', { name: 'Sandeep Bhongal' }],
        ['30046', { name: 'Sandip Borate' }],
        ['30047', { name: 'Pradeep Shirsath' }],
        ['30048', { name: 'Navin Khedikar' }],
        ['30049', { name: 'Shubham Sonawane' }],
        ['30050', { name: 'Sandeep Kalekar' }],
        ['30051', { name: 'Rijul Jantre' }],
        ['30052', { name: 'Mangesh Samsthewar' }],
        ['30053', { name: 'Sachin Rajopadhye' }],
        ['30054', { name: 'Anil Kasodekar' }],
        ['30055', { name: 'Anil Kulkarni' }],
        ['30056', { name: 'Prashant Patil' }],
        ['30057', { name: 'Vinod Savkare' }],
        ['30058', { name: 'Vaibhav Shinde' }],
        ['30059', { name: 'Deepak Kumar' }],
        ['30060', { name: 'Bhargav Gahtori' }],
        ['30061', { name: 'Nikhil Takale' }],
        ['30062', { name: 'Akshay Yogesh Naphade' }],
        ['30063', { name: 'Gururaj Patil' }],
        ['30064', { name: 'Sachindra Chavan' }],
        ['30065', { name: 'Varun Maharia' }],
        ['30066', { name: 'Nitin Tiwari' }],
        ['30067', { name: 'Mahesh Kasar' }],
        ['30069', { name: 'Col Prasad S V S A' }],
        ['30070', { name: 'Ankit Agrawal' }],
        ['30071', { name: 'Aditya Mehendale' }],
        ['30072', { name: 'Jagdish Vyavahare' }],
        ['30073', { name: 'Shweta Mane' }],
        ['30076', { name: 'Tejas Cholkar' }],
        ['30077', { name: 'Pranav Singh' }],
        ['30078', { name: 'Deepali Joshi' }],
        ['30079', { name: 'Anish Bidkar' }],
        ['30080', { name: 'Sunil Chacko' }],
        ['30081', { name: 'Nachiket Sorte' }],
        ['30082', { name: 'Aroti Patwardhan' }],
        ['30083', { name: 'Kusha Shetty' }],
        ['30084', { name: 'Abhijit Joshi' }],
        ['30085', { name: 'Randhir' }],
        ['30086', { name: 'Deepak Patwardhan' }],
        ['30087', { name: 'Sagar Harpale' }],
        ['30087', { name: 'Rahul Patil' }],
        ['30088', { name: 'Richhpal' }],
        ['30089', { name: 'Sandhan Barpanda' }],
        ['30090', { name: 'Vishal Wash' }],
        ['30091', { name: 'Prasad Lambe' }],
        ['30092', { name: 'Babloo Singh' }],
        ['30093', { name: 'SHRIDHAR V.C' }],
        ['30094', { name: 'Sanjay Kumar Jaladi' }],
        ['30095', { name: 'Mayuresh Dighe' }],
        ['30096', { name: 'Rachna Kumari' }],
        ['30097', { name: 'Devendra Nemade' }],
        ['30098', { name: 'Shrishkumar Shinde' }],
        ['30099', { name: 'MANOJ PATIL' }],
        ['30100', { name: 'Diksha' }],
        ['30101', { name: 'Krushna Badhe' }],
        ['30101', { name: 'Yogesh Shinde' }],
        ['30102', { name: 'Sagar Chavan' }],
        ['30103', { name: 'Aayush Patil' }],
        ['30104', { name: 'prashant sahu sahu' }],
        ['30105', { name: 'AVANISH KHANDELWAL' }],
        ['30106', { name: 'Tushar Pawar' }],
        ['30107', { name: 'mahesh Karande' }],
        ['30108', { name: 'Bhooshan Waghmare' }],
        ['30109', { name: 'Abhijeet' }],
        ['30110', { name: 'Kishore Bhamare' }],
        ['30111', { name: 'Kailas Pawar' }],
        ['30112', { name: 'Kumari Prerna' }],
        ['30113', { name: 'Shaunak Dahibhate' }],
        ['30114', { name: 'Akash' }],
        ['30116', { name: 'Sahil Yadav' }],
        ['30117', { name: 'Vedant Kulkarni' }],
        ['30118', { name: 'Rohit Sancheti' }],
        ['30120', { name: 'Gautam Kumar' }],
        ['30122', { name: 'Sujit Vidwans' }],
        ['30124', { name: 'Aman Jeet Kaur' }],
        ['30126', { name: 'Jagan Ramalingam' }],
        ['30128', { name: 'Lakshya Kumar' }],
        ['30129', { name: 'Nitin Joshi' }],
        ['30130', { name: 'Siddhi vishwambhar Pawar' }],
        ['30133', { name: 'Nimish Petkar' }],
        ['30134', { name: 'Pankaj Devare' }],
        ['30136', { name: 'Kshitij Kumar' }],
        ['30137', { name: 'PANKAJ SABLE' }],
        ['30138', { name: 'Bharat Moghe' }],
        ['30140', { name: 'Jatin yadav' }],
        ['30141', { name: 'Satyen Jagtap' }],
        ['30142', { name: 'Sanjay Bharambe' }],
        ['30144', { name: 'Aman Kaswa' }],
        ['30145', { name: 'Tanmay Joshi' }],
        ['30145', { name: 'Shivansh Kaul' }],
        ['30146', { name: 'Ayush Sadawarte' }],
        ['30148', { name: 'Adarsh Yadav' }],
        ['30149', { name: 'Ketan Gore' }],
        ['30150', { name: 'Vaibhav Limaye' }],
        ['30153', { name: 'Kiran Jadhav' }],
        ['30154', { name: 'Rupesh Sharma' }],
        ['30156', { name: 'chhatarpal DANGI' }],
        ['30157', { name: 'Devanand Patil' }],
        ['30158', { name: 'Rahul Khandekar' }],
        ['30160', { name: 'Yash Kumar' }],
        ['30161', { name: 'Shishir Kulkarni' }],
        ['30162', { name: 'Yogendra Jagtap' }],
        ['30164', { name: 'Harish Kannuru' }],
        ['30165', { name: 'Bhushan Patil' }],
        ['30166', { name: 'Vivek Mate' }],
        ['30168', { name: 'Gaurav' }],
        ['30169', { name: 'Yogesh Magdum' }],
        ['30172', { name: 'Abhishek Kumar' }],
        ['30173', { name: 'Sagar Satpute' }],
        ['30174', { name: 'Charudatta Tandale' }],
        ['30176', { name: 'Yogeshwar Pendse' }],
        ['30176', { name: 'Deepak Rai' }],
        ['30177', { name: 'Anil Sharma' }],
        ['30178', { name: 'Maahi Tandale' }],
        ['30180', { name: 'Satyajeet' }],
        ['30181', { name: 'Mangesh Nemade' }],
        ['30182', { name: 'Vamsee Krishna' }],
        ['30184', { name: 'Rohan Patil' }],
        ['30185', { name: 'Chetan Bonde' }],
        ['30188', { name: 'Viraj Sawant' }],
        ['30189', { name: 'Pramod Dhanke' }],
        ['30190', { name: 'Varad Malekar' }],
        ['30192', { name: 'Vyankatesh Wable' }],
        ['30193', { name: 'Kiran B Raut' }],
        ['30194', { name: 'Subhash Pande' }],
        ['30196', { name: 'Gautam More' }],
        ['30197', { name: 'Abhijeet Varangaonkar' }],
        ['30198', { name: 'Aryan Rasane' }],
        ['30200', { name: 'Jayant Cholkar' }],
        ['30201', { name: 'Nishkam Malik' }],
        ['30201', { name: 'Rajeev Khandekar' }],
        ['30202', { name: 'Nishant Wartak' }],
        ['30206', { name: 'Nitin Sadawarte' }],
        ['30214', { name: 'Mahesh Karle' }],
        ['30218', { name: 'Balvinder Singh Batish' }],
        ['30222', { name: 'Sarush Roul' }],
        ['30225', { name: 'Raj Kale' }],
        ['30226', { name: 'Milind Gajghate' }],
        ['30230', { name: 'Vivan' }],
        ['30234', { name: 'Pradip Sadanshiv' }],
        ['30242', { name: 'Nitin Muley' }],
        ['30246', { name: 'Ronak Bhandari' }],
        ['30250', { name: 'Nirvan Mehta' }],
        ['30254', { name: 'Adwaay Ranade' }],
        ['30258', { name: 'Rishi Mulay' }],
        ['30261', { name: 'Aryakee Sachin Sorte' }],
        ['30262', { name: 'Adheesh Subhedar' }],
        ['30265', { name: 'Yash Bhavale' }],
        ['30266', { name: 'Anil Katore' }],
        ['30269', { name: 'Atharva Mohite' }],
        ['30270', { name: 'Pradnesh Ghatol' }],
        ['30274', { name: 'Ayaansh Das' }],
        ['30277', { name: 'Sachin Mule' }],
        ['30278', { name: 'Pratik Mane Deshmukh' }],
        ['30281', { name: 'Anant Devgirikar' }],
        ['30281', { name: 'Angad Mandve' }],
        ['30281', { name: 'Nilesh Bhopale' }],
        ['30282', { name: 'Shankar Walanjkar' }],
        ['30283', { name: 'Tulshidas Metakari' }],
        ['30285', { name: 'Dipak Salunkhe' }],
        ['30286', { name: 'Sandip Gandekar' }],
        ['30290', { name: 'Ramdas Jagdale' }],
        ['30294', { name: 'Gaurav Pancholia' }],
        ['30298', { name: 'Ashish Funde' }],
        ['30299', { name: 'Sanjay Kuche' }],
        ['30310', { name: 'Tanaji Gore' }],
        ['300000', { name: 'Suhas Kulkarni' }],
    ]);

    const generatePDF = async (participant) => {
        const { name } = participant;
        try {
            setLoading(true);
            setError('');
            setDownloadUrl(null);
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
                x: xPosition, y: yPosition, size: fontSize, font: customFont, color: rgb(0.1, 0.2, 0.5),
            });
            const pdfBytes = await pdfDoc.save();
            const fileName = `Cyclothon_Certificate_${name.replace(/\s/g, '_')}.pdf`;
            const blob = new Blob([pdfBytes], { type: 'application/pdf;charset=utf-8' });
            saveAs(blob, fileName);
            setDownloadUrl(URL.createObjectURL(blob));
            setDownloadFileName(fileName);
            setBibNumber('');
        } catch (err) {
            setError('Oops! Failed to generate certificate. Please try again.');
            console.error('Detailed Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setDownloadUrl(null);
        const trimmedBib = bibNumber.trim().toUpperCase();
        const participant = participantMaps.get(trimmedBib);
        if (participant) {
            generatePDF(participant);
        } else {
            setError('Invalid BIB number. Please check and try again.');
        }
    };

    return (
        <main
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden font-sans bg-gray-950"
        >
            <LightRays
                raysColor="#d97706"
                raysOrigin="top-center"
                raysSpeed={1.2}
                lightSpread={0.7}
                rayLength={1.3}
                followMouse={true}
                mouseInfluence={0.1}
                className="absolute inset-0 z-0 opacity-20"
            />
            <div className="absolute inset-0 z-10 flex items-center justify-center p-4 text-white">
                {!showCard && (
                    <div id="welcome-container" className="text-center">
                        <h1 
                            id="welcome-title" 
                            className="text-5xl font-bold tracking-tight text-transparent md:text-7xl min-h-[86px] md:min-h-[120px] bg-gradient-to-r from-amber-800 to-amber-400 bg-clip-text drop-shadow-[0_2px_4px_rgba(245,158,11,0.4)] font-[CyclothonFont]"
                        >
                        </h1>
                        <p id="welcome-subtitle" className="mt-4 text-lg text-gray-400 opacity-0">Your certificate is moments away.</p>
                    </div>
                )}
                {showCard && (
                    <div ref={cardRef} className="w-full max-w-md p-8 space-y-6 border shadow-2xl opacity-0 border-gray-700/50 bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-black/40">
                        <h2 className="text-3xl font-bold text-center text-gray-100">
                            Get Your Certificate
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="relative">
                                <svg className="absolute w-6 h-6 text-gray-500 top-3.5 left-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3.75 19.125v-4.5ZM13.5 4.875c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 13.5 9.375v-4.5ZM13.5 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 13.5 19.125v-4.5Z" />
                                </svg>
                                <input type="text" value={bibNumber} onChange={(e) => setBibNumber(e.target.value)}
                                    placeholder="Enter Your BIB Number"
                                    className={`w-full pl-12 pr-4 py-3 text-white placeholder-gray-500 bg-gray-950/50 border border-gray-700 rounded-xl transition-all duration-300 focus:outline-none focus:scale-105 focus:border-orange-100 focus:ring-2 focus:ring-orange-500/50 shadow-inner`}
                                    required
                                />
                            </div>
                            
                            {/* ✅ This div now centers the button */}
                            <div className="flex justify-center">
                                <DownloadButton
                                    onClick={handleSubmit}
                                    disabled={loading || !bibNumber.trim()}
                                />
                            </div>

                        </form>
                        {error && (
    <div className="pt-4 text-center">
        {/* The original error message */}
        <p className="font-medium text-red-400">{error}</p>
    </div>
)}

{/* ✅ WhatsApp contact info — now always visible */}
<div className="mt-2 text-sm text-center text-gray-400">
    If you believe this is an error, contact us on{' '}
    <a
        href="https://wa.me/919370984236"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-orange-400 underline transition-colors hover:text-orange-300"
    >
        WhatsApp
    </a>.
</div>
                        {downloadUrl && (
                            <div className="pt-4 text-sm text-center text-gray-400">
                                Download didn't start?{' '}
                                <a href={downloadUrl} download={downloadFileName} className="font-medium text-orange-400 underline transition-colors hover:text-orange-300">
                                    Click here
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default CycloCertificate;

