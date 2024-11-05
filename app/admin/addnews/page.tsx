"use client";


import React, { useState, useEffect } from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

interface Story {
    id: number;
    tittle: string;
    location: string;
    date: string;
    body: string;
    images: string;
}

const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const StoryTable: React.FC<{ stories: Story[], onDelete: (id: number) => void; onEdit: (story: Story) => void }> = ({ stories, onDelete, onEdit }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="py-3 px-4 font-semibold text-sm">No</th>
                        <th className="py-3 px-4 font-semibold text-sm">Title</th>
                        <th className="py-3 px-4 font-semibold text-sm">Location</th>
                        <th className="py-3 px-4 font-semibold text-sm">Date</th>
                        <th className="py-3 px-4 font-semibold text-sm">Body</th>
                        <th className="py-3 px-4 font-semibold text-sm">Image</th>
                        <th className="py-3 px-4 font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stories.map((story, index) => (
                        <tr key={story.id} className="border-b border-gray-200">
                            <td className="py-3 px-4">{index + 1}</td>
                            <td className="py-3 px-4">{story.tittle}</td>
                            <td className="py-3 px-4">{story.location}</td>
                            <td className="py-3 px-4">{formatDate(story.date)}</td> {/* Format the date here */}
                            <td className="py-3 px-4">{truncateText(story.body, 100)}</td>
                            <td className="py-3 px-4">
                                <img src={story.images} alt={story.tittle} className="w-12 h-auto" />
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
                                    onClick={() => onDelete(story.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const StoryManagementPage: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newStory, setNewStory] = useState<Omit<Story, 'id'>>({ tittle: '', location: '', date: '', body: '', images: '' });
    const [editStoryId, setEditStoryId] = useState<number | null>(null);

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        const response = await fetch('http://localhost:5000/news');
        const data = await response.json();
        setStories(data);
    };

    const handleAddStory = () => {
        setOpenDialog(true);
        setEditStoryId(null);
        setNewStory({ tittle: '', location: '', date: '', body: '', images: '' });
    };

    const handleEdit = (story: Story) => {
        setNewStory({ tittle: story.tittle, location: story.location, date: story.date, body: story.body, images: story.images });
        setEditStoryId(story.id);
        setOpenDialog(true);
    };


    
    
    const handleSaveStory = async () => {
        const formData = new FormData();
        formData.append('tittle', newStory.tittle);
        formData.append('location', newStory.location);
        
        // Ensure the date is formatted to ISO-8601
        const formattedDate = new Date(newStory.date).toISOString(); // Format date
        formData.append('date', formattedDate);
        
        formData.append('body', newStory.body);
    
        // Only append the image file if it exists
        if (newStory.images) {
            formData.append('images', newStory.images);
        }
    
        try {
            let response;
            if (editStoryId !== null) {
                response = await fetch(`http://localhost:5000/news/${editStoryId}`, {
                    method: 'PATCH',
                    body: formData,
                });
            } else {
                response = await fetch('http://localhost:5000/news', {
                    method: 'POST',
                    body: formData,
                });
            }
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error:", errorData);
                alert("Failed to save story. Check the console for more details.");
                return;
            }
    
            fetchStories(); // Refresh the story list
            setOpenDialog(false); // Close dialog after successful creation
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please check your server connection.");
        }
    };
    
    
    

    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:5000/news/${id}`, { method: 'DELETE' });
        fetchStories();
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Create a URL for the file
            const fileUrl = URL.createObjectURL(file);
            setNewStory({ ...newStory, images: fileUrl }); // Save the URL string
        }
    };
    

    return (
        <div className="flex h-screen flex-col md:flex-row">
            <div className="flex-1 p-2 ml-1 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6">News</h1>
                <StoryTable stories={stories} onDelete={handleDelete} onEdit={handleEdit} />

                {/* Speed Dial for adding new story */}
                <div className="fixed bottom-16 right-16">
                    <SpeedDial
                        ariaLabel="Add Actions"
                        icon={<AddIcon />}
                        onClick={handleAddStory}
                    >
                        <SpeedDialAction
                            icon={<AddIcon />}
                            tooltipTitle="Add News"
                        />
                    </SpeedDial>
                </div>

                {/* Dialog for adding/editing story */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>{editStoryId !== null ? 'Edit Story' : 'Add New Story'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            fullWidth
                            variant="outlined"
                            value={newStory.tittle}
                            onChange={(e) => setNewStory({ ...newStory, tittle: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Location"
                            fullWidth
                            variant="outlined"
                            value={newStory.location}
                            onChange={(e) => setNewStory({ ...newStory, location: e.target.value })}
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
                        <TextField
                            margin="dense"
                            label="Body"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            value={newStory.body}
                            onChange={(e) => setNewStory({ ...newStory, body: e.target.value })}
                        />
                        {newStory.images && (
                            <img src={newStory.images} alt="Preview" className="w-full mt-4" />
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
                        <Button onClick={handleSaveStory}>{editStoryId !== null ? 'Update' : 'Save'}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default StoryManagementPage;
