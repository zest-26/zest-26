import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
    const siteTitle = 'COEP ZEST 2026';
    const defaultDescription = 'COEP ZEST 2026 is the official annual sports festival of COEP Technological University, Pune.';
    const defaultImage = 'https://coeptechzest.org/Mashal.png';
    const defaultUrl = 'https://coeptechzest.org/';

    const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    return (
        <Helmet key={pageTitle}>
            {/* Standard Metadata */}
            <title>{pageTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={url || defaultUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />
            <meta property="og:url" content={url || defaultUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image || defaultImage} />
        </Helmet>
    );
};

export default SEO;
