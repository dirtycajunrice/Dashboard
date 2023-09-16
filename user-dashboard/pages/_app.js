import React from 'react';
import Head from 'next/head';
import { StylesContext } from '@/app/styles-context';
import '@/app/globals.css'; // Import your global stylesheet
import indexStyles from './index.module.css'; // Import your CSS module
import settingsStyles from './settings.module.css';
import editorStyles from './editor.module.css';
import headerStyles from '@/app/header.module.css'; // Import your CSS module
import waiverTableStyles from '@/components/dashboard/waiver-table.module.css'; // Import your CSS module
import activitySettingsStyles from '@/components/settings/activity-settings.module.css'; // Import your CSS module
import waiverPreviewStyles from '@/components/settings/waiver-preview.module.css'; // Import your CSS module

function MyApp({ Component, pageProps }) {
    const styles = {
        index: indexStyles,
        settings: settingsStyles,
        editor: editorStyles,
        header: headerStyles,
        waiverTable: waiverTableStyles,
        activitySettingsStyles: activitySettingsStyles,
        waiverPreviewStyles: waiverPreviewStyles
    };

    return (
        <>
            <Head>
                {/* Other meta tags, title, etc. */}
            </Head>
            <StylesContext.Provider value={styles}>
                <Component {...pageProps} />
            </StylesContext.Provider>
        </>
    );
}

export default MyApp;