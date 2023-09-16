import React, { useState } from 'react';
import { useStylesContext } from '@/app/styles-context';

const WaiverTable = ({ waiverData, setWaiverData, editing }) => {
    const { waiverTable } = useStylesContext();
    const [isCheckingIn, setIsCheckingIn] = useState({});

    const [lastTapTime, setLastTapTime] = useState(0);
    const [lastTapEntryId, setLastTapEntryId] = useState(null);

    const handleSingleTap = (entry) => {
        const currentTime = new Date().getTime();
        const tapDelay = 300; // Set the delay time for detecting double taps (in milliseconds)

        if (lastTapEntryId === entry.waiver_id && currentTime - lastTapTime < tapDelay) {
            // Double tap detected
            handleCheckIn(entry);
            setLastTapTime(0);
            setLastTapEntryId(null);
        } else {
            // Single tap detected
            setLastTapTime(currentTime);
            setLastTapEntryId(entry.waiver_id);
        }
    };

    const handleDeleteEntry = async (entry) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            try {
                const response = await fetch(`/api/deletewaiverentry`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(entry),
                });
                if (response.ok) {
                    const updatedWaiverData = waiverData.filter((item) => item.waiver_id !== entry.waiver_id);
                    setWaiverData(updatedWaiverData);
                } else {
                    console.error('Failed to delete waiver entry');
                }
            } catch (error) {
                console.error('Error connecting to the API', error);
            }
        }
    };

    const handleCheckIn = async (entry) => {
        if (!isCheckingIn[entry.waiver_id]) {
            setIsCheckingIn(prevState => ({ ...prevState, [entry.waiver_id]: true }));
            try {
                const response = await fetch('/api/checkin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(entry),
                });
                if (response.ok) {
                    // Update the checked_in status in the local state
                    const updatedWaiverData = waiverData.map((waiver) =>
                        waiver.waiver_id === entry.waiver_id ? { ...waiver, checked_in: entry.checked_in === 1 ? 0 : 1 } : waiver
                    );
                    setWaiverData(updatedWaiverData);
                } else {
                    console.error('Failed to check in waiver entry');
                }
            } catch (error) {
                console.error('Error connecting to the API', error);
            } finally {
                setIsCheckingIn(prevState => ({ ...prevState, [entry.waiver_id]: false }));
            }
        }
    };

    return (
        <div>
            <table style={{ width: '100%', alignSelf: 'center' }}>
                <thead>
                    <tr style={{ backgroundColor: '#c8ffce' }}>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Signature</th>
                        {editing && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {waiverData.length > 0 ? (
                        waiverData.map((waiver) => (
                            <tr key={waiver.waiver_id} className={waiver.checked_in === 0 && waiverTable.not-checkedIn} onClick={() => handleSingleTap(waiver)}>
                                <td>{waiver.first_name}</td>
                                <td>{waiver.last_name}</td>
                                <td>{waiver.email}</td>
                                <td className={waiverTable.signature-container}>
                                    <img className={waiverTable.signature} src={`${waiver.signature}`} alt="signature" />
                                </td>
                                {editing && (
                                    <td className={waiverTable.actions-column}>
                                        <button
                                            className={waiverTable.delete-button}
                                            onClick={() => handleDeleteEntry(waiver)}
                                        >
                                            DELETE
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={editing && 5 || 4}>No waiver submissions found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default WaiverTable;