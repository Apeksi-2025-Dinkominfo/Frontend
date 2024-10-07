"use client"; // This will make the entire file a Client Component

import Link from 'next/link';
import React, { useState } from 'react';

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
                    <Link href="#" className={`sidebar-link ${activeButton === 2 ? 'active' : ''}`} onClick={() => onButtonClick(2)}>
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
    category: string;
    keyword: string[];
}

const storiesData: Story[] = [
    { no: 1, title: 'The Moon that Can’t be Seen', writers: 'Rara', category: 'Teen Fiction', keyword: ['school', 'fiction']},
    { no: 2, title: 'Given', writers: 'Sansa S.', category: 'Romance', keyword: ['music']},
    { no: 3, title: 'Fish Swimming In The Sky', writers: 'Kaenarita Faly', category: 'Fantasy', keyword: ['fantasy', 'romance'] },
    { no: 4, title: 'The Science of Fertility PCOS', writers: 'Jessie Inchauspé', category: 'Non Fiction', keyword: ['science', 'PCOS']},
    { no: 5, title: 'The Glucose Goddess Method', writers: 'Jessie Inchauspé', category: 'Non Fiction', keyword: ['glucose', 'science']}
];

const StoryTable: React.FC<{ stories: Story[], onDelete: (no: number) => void; onUpdate: (story: Story) => void }> = ({ stories, onDelete, onUpdate }) => {
    return (
        <table className="story-table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Writers</th>
                    <th>Category</th>
                    <th>Keyword</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {stories.map((story) => (
                    <tr key={story.no}>
                        <td>{story.no}</td>
                        <td>{story.title}</td>
                        <td>{story.writers}</td>
                        <td>{story.category}</td>
                        <td>{story.keyword.join(', ')}</td>
                        <td>
                            <button onClick={() => onUpdate(story)}>Update</button>
                            <button onClick={() => onDelete(story.no)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// Komponen AddStoryButton
const AddStoryButton: React.FC = () => {
    return (
        <button className="add-story-btn">
            + Add Story
        </button>
    );
};

// Komponen Utama (Page)
const StoryManagementPage: React.FC = () => {
    const [activeButton, setActiveButton] = useState<number>(0); // Set default active button

    // Function to handle deletion of a story
    const handleDelete = (no: number) => {
        console.log(`Deleted story with No: ${no}`);
        // Logic to delete the story from data source would go here
    };

    // Function to handle updating a story
    const handleUpdate = (story: Story) => {
        console.log(`Update story:`, story);
        // Logic to update the story would go here
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
                        textDecoration: none;
                    }
                    .content {
                        flex-grow: 1;
                        padding: 20px;
                        overflow-y: auto; /* Allows scrolling if content overflows */
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
                    .add-story-btn {
                        background-color: orange;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        cursor: pointer;
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
                `}
            </style>
            <Sidebar activeButton={activeButton} onButtonClick={setActiveButton} />
            <div className="content">
                <h1>Stories</h1>
                <div className="header-controls">
                    <input type="text" placeholder="Search by Writers/Title" className="search-bar" />
                    <AddStoryButton />
                </div>
                <StoryTable stories={storiesData} onDelete={handleDelete} onUpdate={handleUpdate} />
            </div>
        </div>
    );
};

export default StoryManagementPage; 
