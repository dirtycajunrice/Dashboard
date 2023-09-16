import React, { useState, useEffect } from 'react';
import Layout from '@/app/layout';
import WaiverTable from '@/components/dashboard/waiver-table';
import { useStylesContext } from '@/app/styles-context';

const Dashboard = () => {
    const [waiverData, setWaiverData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [editing, setEditing] = useState(false);
    const [checkedInCount, setCheckedInCount] = useState(0);
    const { index } = useStylesContext();

    const handleEditing = () => {
        setEditing(!editing);
    };

    const formatDate = (dateString) => {
        const dateParts = dateString.split('-'); // Split the date string into an array [year, month, day]
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        const formattedDate = `${day}-${month}-${year}`; // Rearrange the parts and format the date string
        return formattedDate;
    }
    // Fetch waiver data from the backend API
    const fetchWaiverData = async (date) => {
        try {
            const response = await fetch(`/api/waivers?date=${date}`);
            if (response.ok) {
                const data = await response.json();
                setWaiverData(data.waivers);
            } else {
                console.error('Failed to fetch waiver data');
            }
        } catch (error) {
            console.error('Error connecting to the API', error);
        }
    };

    const handleNewMessage = (message) => {
        // Process the incoming message and update the state
        if (message.event && message.event === 'waiverAdded') {
            const newWaiverData = message.data;
            if (newWaiverData.date_attending === selectedDate) {
                setWaiverData((prevWaiverData) => prevWaiverData.concat(newWaiverData));
            }
        }
    };

    // Calculate checkedInCount whenever waiverData changes
    useEffect(() => {
        const count = waiverData.reduce((count, waiver) => count + (waiver.checked_in === 1 ? 1 : 0), 0);
        setCheckedInCount(count);
    }, [waiverData]);

    useEffect(() => {
        // Fetch waiver data on component mount
        fetchWaiverData(selectedDate);

        // Optionally, set up a polling or WebSocket mechanism to periodically update the waiver data
        // based on your requirements
    }, []);

    return (
        <Layout>
            <div className='dashboard'>
                <div style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p></p>
                    <span>
                        <label>
                            Select Date:
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => {
                                    const date = e.target.value;
                                    setSelectedDate(date);
                                    fetchWaiverData(date);
                                }}
                            />
                        </label>
                    </span>
                </div>
                <h1 style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Waiver Submissions
                    <span style={{ fontSize: '24px' }}>
                        <p>Count: {waiverData.length}</p>
                        <p>Checked in: {checkedInCount}</p>
                    </span>
                </h1>
                <span>
                    <button style={{ float: 'right' }} className={index.editButton} onClick={handleEditing}>
                        {editing ? 'CANCEL' : 'EDIT'}
                    </button>
                    <button style={{ float: 'right' }} className={index.editButton} onClick={() => fetchWaiverData(selectedDate)}>
                        REFRESH
                    </button>
                </span>
                <WaiverTable waiverData={waiverData} setWaiverData={setWaiverData} editing={editing}></WaiverTable>
            </div>
        </Layout>
    );
};

export default Dashboard;