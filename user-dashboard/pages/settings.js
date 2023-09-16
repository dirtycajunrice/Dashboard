import React, { useState } from 'react';
import Layout from '@/app/layout';
import LeftPanel from '@/components/settings/left-panel';
import RightDisplay from '@/components/settings/right-display';
import { useStylesContext } from '@/app/styles-context';

const Settings = () => {
    const [selectedCategory, setSelectedCategory] = useState('Theme');
    const { settings } = useStylesContext();
    const userLimit = 2;

    return (
        <Layout>
            <div className={settings.settingsContainer}>
                <LeftPanel selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} styles={settings} />
                <RightDisplay selectedCategory={selectedCategory} styles={settings} userLimit={userLimit} />
            </div>
        </Layout>
    );
};

export default Settings;