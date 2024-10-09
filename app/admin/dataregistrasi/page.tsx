"use client"; // This will make the entire file a Client Component

import Link from 'next/link';
import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// Komponen Sidebar
const Sidebar: React.FC<{ activeButton: number; onButtonClick: (index: number) => void }> = ({ activeButton, onButtonClick }) => {
    return (
        <div className="sidebar">
            <h2>MANAGEMENT MUNAS</h2>
            <ul>
                <li>
                    <Link href="/admin" className={`sidebar-link ${activeButton === 1 ? 'active' : ''}`} onClick={() => onButtonClick(1)}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/admin/dataregistrasi" className={`sidebar-link ${activeButton === 2 ? 'active' : ''}`} onClick={() => onButtonClick(2)}>
                        Data Registrasi
                    </Link>
                </li>
                <li>
                    <Link href="/admin/addnews" className={`sidebar-link ${activeButton === 3 ? 'active' : ''}`} onClick={() => onButtonClick(3)}>
                        Add News
                    </Link>
                </li>
                <li>
                    <Link href="/admin/addgaleri" className={`sidebar-link ${activeButton === 4 ? 'active' : ''}`} onClick={() => onButtonClick(4)}>
                        Add Gallery
                    </Link>
                </li>
            </ul>
        </div>
    );
};

// Komponen StoryTable
interface Story {
    no: number;
    title: string;
    writers: string;
    date: string;
    image: string;
}

const StoryTable: React.FC<{ stories: Story[], onDelete: (no: number) => void; onEdit: (story: Story) => void }> = ({ stories, onDelete, onEdit }) => {
    return (
        <table className="story-table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Writers</th>
                    <th>Date</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {stories.map((story) => (
                    <tr key={story.no}>
                        <td>{story.no}</td>
                        <td>{story.title}</td>
                        <td>{story.writers}</td>
                        <td>{story.date}</td>
                        <td><img src={story.image} alt={story.title} style={{ width: '50px', height: 'auto' }} /></td>
                        <td>
                            <button onClick={() => onEdit(story)}>Edit</button>
                            <button onClick={() => onDelete(story.no)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// Komponen Utama (Page)
const StoryManagementPage: React.FC = () => {
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [stories, setStories] = useState<Story[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newStory, setNewStory] = useState<Omit<Story, 'no'>>({ title: '', writers: '', date: '', image: '' });
    const [nextNo, setNextNo] = useState(1);
    const [editStoryNo, setEditStoryNo] = useState<number | null>(null);
    const [activeButton, setActiveButton] = useState<number>(0); // Ubah default ke 0

    // Function to handle deletion of a story
    const handleDelete = (no: number) => {
        setStories(stories.filter(story => story.no !== no));
        console.log(`Deleted story with No: ${no}`);
    };

    // Function to handle adding a new story
    const handleAddStory = () => {
        setOpenDialog(true);
        setEditStoryNo(null);
        setNewStory({ title: '', writers: '', date: '', image: '' });
    };

    // Function to save the new or updated story
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

    // Function to handle image upload
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

    // Function to handle editing a story
    const handleEdit = (story: Story) => {
        setNewStory({ title: story.title, writers: story.writers, date: story.date, image: story.image });
        setEditStoryNo(story.no);
        setOpenDialog(true);
    };

    return (
        <div className="container">
            <style>
                {`
                    * {
                        box-sizing: border-box;
                    }
                    body {
                        margin: 0;
                        font-family: Arial, sans-serif;
                        height: 100vh;
                    }
                    .container {
                        display: flex;
                        height: 100%;
                    }
                    .sidebar {
                        width: 250px;
                        background-color: #2c3e50;
                        color: white;
                        padding: 20px;
                        height: 100%;
                        margin-bottom: 20px;
                    }
                    .sidebar h2 {
                        margin-bottom: 20px;
                    }
                    .sidebar ul {
                        list-style-type: none;
                        padding: 0;
                        margin-bottom: 20px;
                    }
                    .sidebar ul li {
                        margin-bottom: 20px;
                    }
                    .sidebar ul li a {
                        display: block;
                        color: white;
                        text-decoration: none;
                        padding: 10px;
                        border-radius: 4px;
                        text-align: center;
                        transition: background-color 0.3s ease;
                    }
                    .sidebar ul li a:hover,
                    .sidebar ul li a.active { /* Tambahkan kondisi untuk aktif dan hover */
                        background-color: #2980b9; /* Ubah warna sesuai preferensi */
                    }
                    .content {
                        flex-grow: 1;
                        padding: 20px;
                        overflow-y: auto;
                    }
                    .header-controls {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;
                    }
                    .search-bar {
                        padding: 10px;
                        width: 300px;
                    }
                    .story-table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .story-table th, .story-table td {
                        border: 1px solid #ddd;
                        padding: 8px;
                    }
                    .story-table th {
                        background-color: #f4f4f4;
                        text-align: left;
                    }
                    button {
                        margin-right: 5px;
                        padding: 5px 10px;
                        cursor: pointer;
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 4px;
                    }
                    .preview-image {
                        width: 100px; /* Set the width for the preview */
                        height: auto; /* Maintain aspect ratio */
                        margin-bottom: 10px;
                    }
                `}
            </style>
            <Sidebar activeButton={activeButton} onButtonClick={setActiveButton} />
            <div className="content">
                <h1>News</h1>
                <div className="header-controls">
                    <input type="text" placeholder="Search by Writers/Title" className="search-bar" />
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
                        {newStory.image && ( // Tampilkan gambar yang ada jika ada
                            <img src={newStory.image} alt="Preview" className="preview-image" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
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
