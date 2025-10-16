import React, { useState, useRef, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import * as fontkit from 'fontkit';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import LightRays from './LightRays';

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

    // Effect to switch from welcome text to the card
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
        ['15103', { name: 'Aditya Kulkarni' }],
        ['15107', { name: 'Sumit Danekar' }],
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
            const fileName = `zest_cyclo_${name.replace(/\s/g, '_')}.pdf`;
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
            <div className="absolute inset-0 z-10 flex items-center justify-center p-4 text-white bg-black/20">
                {!showCard && (
                    <div id="welcome-container" className="text-center">
                        <h1 id="welcome-title" className="text-5xl font-bold tracking-tight text-transparent md:text-7xl min-h-[86px] md:min-h-[120px] bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text drop-shadow-[0_2px_4px_rgba(245,158,11,0.4)]">
                        </h1>
                        <p id="welcome-subtitle" className="mt-4 text-lg text-gray-400 opacity-0">Your certificate is moments away.</p>
                    </div>
                )}
                {showCard && (
                    // THEME CHANGE: Card is now the primary "black" element with neutral gray borders.
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
                                    className={`w-full pl-12 pr-4 py-3 text-white placeholder-gray-500 bg-gray-950/50 border border-gray-700 rounded-xl transition-all duration-300 focus:outline-none focus:scale-105 focus:border-orange-100 focus:ring-2 focus:ring-orange-700/50 shadow-inner`}
                                    required
                                />
                            </div>
                            
                            <button type="submit" disabled={loading || !bibNumber.trim()}
                                className="relative w-full px-4 py-3 overflow-hidden text-lg font-bold text-white transition-all duration-300 transform rounded-xl bg-gradient-to-r from-orange-500 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed active:scale-100 group">
                                <span className="absolute w-64 h-64 duration-500 origin-center transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-full opacity-10 top-1/2 left-1/2 group-hover:scale-150"></span>
                                <span className="relative">{loading ? 'Generating...' : 'Download'}</span>
                            </button>
                        </form>
                        {error && (<div className="pt-2 font-medium text-center text-red-400">{error}</div>)}
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