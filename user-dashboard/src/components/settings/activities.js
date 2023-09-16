import React, { useState } from 'react';
import ActivitySettings from './activity-settings';

const Activities = ({ styles, userLimit, subscriptionPlan }) => {
    const [activities, setActivities] = useState([{name:'Airsoft', settings:{shortWaivers: true}}]);
    const [selectedActivityIndex, setSelectedActivityIndex] = useState(null);
    const [isAddingActivity, setIsAddingActivity] = useState(false);
    const [newActivityName, setNewActivityName] = useState('');

    const handleAddActivity = () => {
        if (activities.length < userLimit) {
            setIsAddingActivity(true);
        }
    };

    const handleConfirmAddActivity = () => {
        if (newActivityName.trim() !== '') {
            const newActivity = {
                name: newActivityName,
                settings: {
                    // Default settings for the activity
                    shortWaivers: true
                },
            };
            const newActivities = [...activities, newActivity];
            const newIndex = newActivities.length - 1;
            setActivities(newActivities);
            setIsAddingActivity(false);
            setNewActivityName('');
            setSelectedActivityIndex(newIndex);
        }
    };

    const handleCancelAddActivity = () => {
        setIsAddingActivity(false);
        setNewActivityName('');
    };

    const handleSelectActivity = (index) => {
        setSelectedActivityIndex(index);
    };

    const handleActivitySettingsChange = (updatedSettings) => {
        const updatedActivities = [...activities];
        updatedActivities[selectedActivityIndex] = updatedSettings;
        setActivities(updatedActivities);
    };

    const handleUpgrade = () => {

    }

    return (
        <div>
            <h2>Activities</h2>
            {activities.length === 0 ? (
                <p>No activities</p>
            ) : (
                <div>
                    <select value={selectedActivityIndex} onChange={(e) => handleSelectActivity(e.target.value)}>
                        <option value={''}>Select an activity</option>
                        {activities.map((activity, index) => (
                            <option key={index} value={index}>
                                {activity.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {isAddingActivity ? (
                <div>
                    <input
                        type="text"
                        placeholder="Activity Name"
                        value={newActivityName}
                        onChange={(e) => setNewActivityName(e.target.value)}
                        style={{marginRight:'10px'}}
                    />
                    <button onClick={handleConfirmAddActivity} style={{marginRight:'10px'}}>Confirm</button>
                    <button onClick={handleCancelAddActivity} style={{marginRight:'10px'}}>Cancel</button>
                </div>
            ) : (
                <>
                    {activities.length < userLimit ? (
                        <button onClick={handleAddActivity}>Add Activity</button>
                    ) : (
                        <div>
                            <p>Please upgrade your subscription to add more activities.</p>
                            <button onClick={handleUpgrade}>Upgrade Subscription</button>
                        </div>
                    )}
                </>
            )}
            {selectedActivityIndex !== null && activities[selectedActivityIndex] && (
                <ActivitySettings
                    settings={activities[selectedActivityIndex]}
                    onSettingsChange={handleActivitySettingsChange}
                />
            )}
        </div>
    );
};

export default Activities;