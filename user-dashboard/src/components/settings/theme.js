import React, { useState, useEffect } from 'react';

const ThemeSettings = (styles) => {
    const [logoUrl, setLogoUrl] = useState('/logo-no-background.png');
    const [primaryColor, setPrimaryColor] = useState('#007bff');
    const [secondaryColor, setSecondaryColor] = useState('#6c757d');
    const [textColor, setTextColor] = useState('#333333');
    const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
    const [headerColor, setHeaderColor] = useState('#f8f9fa');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');

    useEffect(() => {
        // Fetch the logo URL from your server or storage here
        // For example, you can make an API call or retrieve it from local storage
        const fetchedLogoUrl = ''/* Fetch the logo URL */;
        if (fetchedLogoUrl) {
            setLogoUrl(fetchedLogoUrl);
        }
    }, []); // Empty dependency array ensures this effect runs only once

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const logoDataUrl = e.target.result;
                // You can now save the logoDataUrl to your server or cloud storage
                setLogoUrl(logoDataUrl); // Update the state to display the uploaded logo
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle other settings changes similarly
    return (
        <div style={{display:'inline-block'}}>
            <img src={logoUrl} alt="Logo" style={{ maxHeight: '150px', maxWidth: '500px' }} />
            <div>
                <label>Logo Upload:</label>
                <input type="file" accept="image/*" onChange={handleLogoUpload} />
            </div>
            <div>
                <label>Primary Color:</label>
                <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
            </div>
            <div>
                <label>Secondary Color:</label>
                <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
            </div>
            <div>
                <label>Background Color:</label>
                <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
            </div>
            <div>
                <label>Header Color:</label>
                <input type="color" value={headerColor} onChange={(e) => setHeaderColor(e.target.value)} />
            </div>
            <div>
                <label>Text Color:</label>
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
            </div>
            <div>
                <label>Secondary Color:</label>
                <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
            </div>
            <div style={{flexDirection:'row'}}>
                <label>Font Family:</label>
                <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="Helvetica, sans-serif">Helvetica</option>
                    <option value="Times New Roman, serif">Times New Roman</option>
                    <option value="Courier New, monospace">Courier New</option>
                    {/* Add more font options as needed */}
                </select>
                <span style={{fontFamily:fontFamily, marginLeft:'40px'}}>Lorem ipsum dolor sit amet</span>
            </div>
            {/* Add similar sections for other settings */}
        </div>
    );
};

export default ThemeSettings;