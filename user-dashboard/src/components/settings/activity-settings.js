import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip'
import { useStylesContext } from '@/app/styles-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

const ActivitySettings = ({ settings, onSettingsChange }) => {
    const [activitySettings, setActivitySettings] = useState(settings);
    const [isEditing, setIsEditing] = useState(false);
    const [showSettingsSaved, setShowSettingsSaved] = useState(false);
    const { activitySettingsStyles } = useStylesContext();
    const [showAddInputDialog, setShowAddInputDialog] = useState(false);
    const [inputType, setInputType] = useState('text');
    const [inputLabel, setInputLabel] = useState('');
    const [newInputType, setNewInputType] = useState('text');
    const [newInputLabel, setNewLabel] = useState('');
    const [newRequired, setNewRequired] = useState('');
    const defaultInputs = [
        { label: 'First Name', type: 'text', required: true },
        { label: 'Last Name', type: 'text', required: true },
        { label: 'Email', type: 'email', required: true },
        { label: 'Address', type: 'longtext', required: false },
        { label: 'Date of Birth', type: 'date', required: false },
        { label: 'Contact Number', type: 'phone', required: false },
        { label: 'Signature', type: 'signature', required: true },
    ]
    const [addedInputs, setAddedInputs] = useState(defaultInputs);

    useEffect(() => {
        setActivitySettings(settings);
    }, [settings]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setActivitySettings((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }));
    };

    const handleSaveSettings = () => {
        onSettingsChange(activitySettings);
        setShowSettingsSaved(true);

        // Reset the "Settings saved" message after 2 seconds
        setTimeout(() => {
            setShowSettingsSaved(false);
        }, 2000);
    };

    const handleSaveClick = () => {
        onSettingsChange(activitySettings);
        setIsEditing(false);
    };

    const handleAddInputClick = () => {
        setShowAddInputDialog(true);
    };

    const handleAddInput = () => {
        if (newInputLabel.trim() !== '') {
            const newInput = {
                label: newInputLabel,
                type: newInputType,
                required: newRequired,
            };
            setAddedInputs([...addedInputs, newInput]);
            setNewLabel('');
            setNewRequired(false);
            setShowAddInputDialog(false);
        }
    };

    const handleCancel = () => {
        setNewLabel('');
        setNewRequired(false);
        setShowAddInputDialog(false);
    };

    const handleDeleteInput = (index) => {
        const updatedInputs = addedInputs.filter((_, i) => i !== index);
        setAddedInputs(updatedInputs);
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const updatedInputs = Array.from(addedInputs);
        const [removed] = updatedInputs.splice(result.source.index, 1);
        updatedInputs.splice(result.destination.index, 0, removed);

        setAddedInputs(updatedInputs);
    };

    const modules = {
        toolbar: [
            [{ 'font': [] }, { 'size': [] }],
            [ 'bold', 'italic', 'underline', 'strike' ],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'super' }, { 'script': 'sub' }],
            [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
            [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
            [ 'direction', { 'align': ''}, { 'align': 'center'}, {'align': 'right'}],
            [ 'link', 'image', 'video', 'formula' ],
            [ 'clean' ]
      ]
    }

    return (
        <div className={activitySettingsStyles.activitySettings}>
            <h3>Activity Settings</h3>
            <div>
                {isEditing ? (
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={activitySettings.name}
                            onChange={handleInputChange}
                            className={activitySettingsStyles.activityNameInput}
                        />
                        <button onClick={handleSaveClick}>Save</button>
                    </div>
                ) : (
                    <div className={activitySettingsStyles.activityInfo}>
                        <p>Name: {activitySettings.name}</p>
                        <button className={activitySettingsStyles.smallButton} onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                )}
            </div>
            <div style={{maxWidth:'800px'}}>
                <label>Waiver Content:</label>
                {/* Integrate the rich text editor */}
                <QuillNoSSRWrapper
                    key='waiverContent'
                    value={activitySettings.waiverContent || ''}
                    onChange={(content) => {
                        setActivitySettings((prevSettings) => ({
                          ...prevSettings,
                          waiverContent: content,
                        }));
                      }}
                    placeholder='Create your waiver here...'
                    theme="snow"
                    modules={modules}
                />
            </div>
            <div>
                <label>Allow short waivers?</label>
                <FontAwesomeIcon
                    icon={faQuestionCircle}
                    data-tooltip-id="toolTip"
                    data-tooltip-float='true'
                />
                <Tooltip id="toolTip">
                    <div style={{ marginTop:'0', display: 'flex', flexDirection: 'column' }}>
                        <span>Enable this option to allow short waivers.</span>
                        <span>Short waivers allow the customer to fill only required fields</span>
                        <span>providing a full waiver has been completed before.</span>
                    </div>
                </Tooltip>
                <input
                    key='shortWaiverCheckbox'
                    type='checkbox'
                    name='shortWaivers'
                    checked={activitySettings.settings.shortWaivers}
                    onChange={(e) => setActivitySettings({ ...activitySettings, settings: { ...activitySettings.settings, shortWaivers: e.target.checked } })}
                />
            </div>
            <div>
                <h3>Customer Inputs</h3>
                <button onClick={handleAddInputClick}>Add Customer Input</button>
            </div>
            {showAddInputDialog && (
                <div className={activitySettingsStyles.addInput}>
                    <label>Add Customer Input:</label>
                    <select value={newInputType} onChange={(e) => setNewInputType(e.target.value)}>
                        <option value="text">Text</option>
                        <option value="select">Select</option>
                        {/* Add more input types as needed */}
                    </select>
                    <input
                        type="text"
                        placeholder="Label for Input"
                        value={newInputLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                    />
                    <input
                        type="checkbox"
                        value={newRequired}
                        onChange={(e) => setNewRequired(e.target.value)}
                        title="Required every time?"
                    />
                    <button onClick={handleAddInput}>Add Input</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
            <div>
                {addedInputs.length > 0 && (
                    <div>
                        <h4>Added Inputs:</h4>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="inputs">
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef} className={activitySettingsStyles.addedInput}>
                                        {addedInputs.map((input, index) => (
                                            <Draggable key={index} draggableId={index.toString()} index={index}>
                                                {(provided) => (
                                                    <li title={input.required && "Required every time" || "Only required on first waiver"}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        {input.label} ({input.type}) {input.required && (<span style={{ color: '#f00', fontWeight: 900 }}>*</span>)}
                                                        <button className={activitySettingsStyles.smallButton} onClick={() => handleDeleteInput(index)}>Delete</button>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                )}
            </div>
            <button onClick={handleSaveSettings}>Save Settings</button>
            <p className={`${activitySettingsStyles.settingsSavedMessage} ${showSettingsSaved ? activitySettingsStyles.show : ''}`}>
                Settings saved!
            </p>
        </div>
    );
};

export default ActivitySettings;