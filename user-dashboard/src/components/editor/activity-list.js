import React, { useState } from 'react';

const Activities = ({ styles, userLimit, subscriptionPlan, activities, setActivities, selectedActivityIndex, setSelectedActivityIndex }) => {
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

    const handleUpgrade = () => {

    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2>Activities ({activities.length}/{userLimit})</h2>
                {activities.length < userLimit ? '' : (
                    <span>
                        <div className={styles.upgrade}>
                            <p>* Max activities reached. Please upgrade your subscription to add more activities.</p>
                            <button onClick={handleUpgrade}>Upgrade Subscription</button>
                        </div>
                    </span>
                )}
            </div>
            <div className={styles.activitySelect}>
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
                            style={{ marginRight: '10px' }}
                        />
                        <button onClick={handleConfirmAddActivity} style={{ marginRight: '10px' }}>Confirm</button>
                        <button onClick={handleCancelAddActivity} style={{ marginRight: '10px' }}>Cancel</button>
                    </div>
                ) : (
                    <>
                        {activities.length < userLimit ? (
                            <button onClick={handleAddActivity}>Add Activity</button>
                        ) : ''}
                    </>
                )}
            </div>
        </div>
    );
};

export default Activities;