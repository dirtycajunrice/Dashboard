import React, { useState } from 'react';
import Layout from '@/app/layout';
import Activities from '@/components/editor/activity-list';
import LeftPanel from '@/components/editor/left-panel';
import RightPanel from '@/components/editor/right-panel';
import { useStylesContext } from '@/app/styles-context';

const Editor = () => {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [activities, setActivities] = useState([{ name: 'Airsoft', settings: { shortWaivers: true } }]);
    const [selectedActivityIndex, setSelectedActivityIndex] = useState(null);
    const { editor } = useStylesContext();

    const handleActivityChange = (activity) => {
        setSelectedActivity(activity);
    };

    return (
        <Layout>
            <div className={editor.editorContainer}>
                <Activities styles={editor} userLimit={2} activities={activities} setActivities={setActivities} selectedActivityIndex={selectedActivityIndex} setSelectedActivityIndex={setSelectedActivityIndex} />
                {selectedActivityIndex !== null && activities[selectedActivityIndex] && (
                    <div className={editor.editorContent}>
                        <LeftPanel styles={editor} />
                        <iframe src={`/${selectedActivity}`} className={editor.viewer} title="Editor" />
                        <RightPanel styles={editor} />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Editor;