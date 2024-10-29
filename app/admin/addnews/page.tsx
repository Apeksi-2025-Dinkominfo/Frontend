"use client"; // This will make the entire file a Client Component

import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Sidebar from '../../components/sidebar';

interface Story {
    no: number;
    title: string;
    writers: string;
    date: string;
    image: string;
}

const StoryTable: React.FC<{ stories: Story[], onDelete: (no: number) => void; onEdit: (story: Story) => void }> = ({ stories, onDelete, onEdit }) => {
    return (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
                <tr className="bg-gray-200 text-left">
                    <th className="py-3 px-4 font-semibold text-sm">No</th>
                    <th className="py-3 px-4 font-semibold text-sm">Title</th>
                    <th className="py-3 px-4 font-semibold text-sm">Writers</th>
                    <th className="py-3 px-4 font-semibold text-sm">Date</th>
                    <th className="py-3 px-4 font-semibold text-sm">Image</th>
                    <th className="py-3 px-4 font-semibold text-sm">Actions</th>
                </tr>
            </thead>
            <tbody>
                {stories.map((story) => (
                    <tr key={story.no} className="border-b border-gray-200">
                        <td className="py-3 px-4">{story.no}</td>
                        <td className="py-3 px-4">{story.title}</td>
                        <td className="py-3 px-4">{story.writers}</td>
                        <td className="py-3 px-4">{story.date}</td>
                        <td className="py-3 px-4">
                            <img src={story.image} alt={story.title} className="w-12 h-auto" />
                        </td>
                        <td className="py-3 px-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-1 rounded mr-2 hover:bg-blue-600"
                                onClick={() => onEdit(story)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                onClick={() => onDelete(story.no)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// Main Component (Page)
const StoryManagementPage: React.FC = () => {
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [stories, setStories] = useState<Story[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newStory, setNewStory] = useState<Omit<Story, 'no'>>({ title: '', writers: '', date: '', image: '' });
    const [nextNo, setNextNo] = useState(1);
    const [editStoryNo, setEditStoryNo] = useState<number | null>(null);
    const [activeButton, setActiveButton] = useState<number>(0); // Ubah default ke 0

    const handleDelete = (no: number) => {
        setStories(stories.filter(story => story.no !== no));
        console.log(`Deleted story with No: ${no}`);
    };

    const handleAddStory = () => {
        setOpenDialog(true);
        setEditStoryNo(null);
        setNewStory({ title: '', writers: '', date: '', image: '' });
    };

    const handleSaveStory = () => {
        if (editStoryNo !== null) {
            setStories(stories.map(story => (story.no === editStoryNo ? { ...story, ...newStory } : story)));
        } else {
            const storyToAdd = { no: nextNo, ...newStory };
            setStories([...stories, storyToAdd]);
            setNextNo(nextNo + 1);
        }
        setOpenDialog(false);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewStory({ ...newStory, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = (story: Story) => {
        setNewStory({ title: story.title, writers: story.writers, date: story.date, image: story.image });
        setEditStoryNo(story.no);
        setOpenDialog(true);
    };

    return (
        <div className="flex h-screen">
            <Sidebar activeButton={activeButton} onButtonClick={setActiveButton} />
            <div className="flex-1 p-2 ml-1">
                <h1 className="text-2xl font-bold mb-6">News</h1>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by Writers/Title"
                        className="w-full border p-2 rounded-lg"
                    />
                </div>
                <StoryTable stories={stories} onDelete={handleDelete} onEdit={handleEdit} />

                {/* Speed Dial for adding new story */}
                <SpeedDial
                    ariaLabel="Add Actions"
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    icon={<AddIcon />}
                    onClose={() => setOpenSpeedDial(false)}
                    onOpen={() => setOpenSpeedDial(true)}
                    open={openSpeedDial}
                >
                    <SpeedDialAction
                        key="addNews"
                        icon={<AddIcon />}
                        tooltipTitle="Add News"
                        onClick={handleAddStory}
                    />
                </SpeedDial>

                {/* Dialog for adding/editing story */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>{editStoryNo !== null ? 'Edit Story' : 'Add New Story'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            fullWidth
                            variant="outlined"
                            value={newStory.title}
                            onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Writers"
                            fullWidth
                            variant="outlined"
                            value={newStory.writers}
                            onChange={(e) => setNewStory({ ...newStory, writers: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Date"
                            type="date"
                            fullWidth
                            variant="outlined"
                            value={newStory.date}
                            onChange={(e) => setNewStory({ ...newStory, date: e.target.value })}
                        />
                        {newStory.image && (
                            <img src={newStory.image} alt="Preview" className="w-full mt-4" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-4"
                            onChange={handleImageUpload}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button onClick={handleSaveStory}>{editStoryNo !== null ? 'Update' : 'Save'}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default StoryManagementPage;
