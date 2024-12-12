import React, { useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo, language }) => {
  const [downloading, setDownloading] = useState(false);
  const isNameHebrew = /[\u0590-\u05FF]/.test(name);  // Detect Hebrew in name
  const isPromptHebrew = /[\u0590-\u05FF]/.test(prompt);  // Detect Hebrew in prompt

  const handleDownload = async () => {
    if (!photo) {
      alert(language === 'he' ? 'אנא צור תמונה לפני ההורדה' : 'Please generate an image before downloading');
      return;
    }

    setDownloading(true);
    try {
      const timestamp = Date.now(); // Generate a unique timestamp
      const filename = `MindCraftAI-${name || 'user'}-${timestamp}.jpg`; // Name the image with timestamp
      await downloadImage(photo, name, filename); // Pass the photo URL, name, and filename to downloadImage
    } catch (error) {
      alert(`Error downloading: ${error.message}`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative group">
      {/* Image */}
      <img
        src={photo}
        alt={prompt}
        className="w-full h-full object-cover rounded-lg"
      />

      {/* Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Prompt Text */}
        <p
          className={`text-sm mb-2 ${isPromptHebrew ? 'text-right' : 'text-left'}`}
          style={{ direction: isPromptHebrew ? 'rtl' : 'ltr' }}
        >
          {prompt}
        </p>

        {/* User Info and Download */}
        <div className={`flex items-center ${isNameHebrew ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* User Info */}
          <div className={`flex items-center ${isNameHebrew ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* User Image */}
            <div className={`w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white text-lg`}>
              {name[0]} {/* First letter */}
            </div>
            {/* User Name */}
            <span className="text-sm mx-2">{name}</span>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className={`text-lg hover:text-cyan-500 ${isNameHebrew ? 'ml-2' : 'mr-2'} order-1`}  // Ensure it comes first when Hebrew
            disabled={downloading}
          >
            {downloading ? (
              <span>{language === 'he' ? '...מוריד' : 'Downloading...'}</span>
            ) : (
              <MdDownloadForOffline size={32} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
