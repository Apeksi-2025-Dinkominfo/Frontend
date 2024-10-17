"use client"; // This will make the entire file a Client Component

import React, { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import Sidebar from '../components/sidebar'; // Impor Sidebar yang baru

// Tipe untuk cerita
interface Story {
    no: number;
    title: string;
    writers: string;
    category: string;
    keyword: string[];
}

// Data cerita awal
const storiesData: Story[] = [
    { no: 1, title: 'The Moon that Can’t be Seen', writers: 'Rara', category: 'Ambon', keyword: ['school', 'fiction'] },
    { no: 2, title: 'Given', writers: 'Sansa S.', category: 'Surabaya', keyword: ['music'] },
    { no: 3, title: 'Fish Swimming In The Sky', writers: 'Kaenarita Faly', category: 'Bima', keyword: ['fantasy', 'romance'] },
    { no: 4, title: 'The Science of Fertility PCOS', writers: 'Jessie Inchauspé', category: 'Bandung', keyword: ['science', 'PCOS'] },
    { no: 5, title: 'The Glucose Goddess Method', writers: 'Jessie Inchauspé', category: 'Jakarta Utara', keyword: ['glucose', 'science'] }
];

// Tipe untuk kriteria sorting
type SortCriteria = 'title' | 'writers' | 'category' | 'keyword';

// Komponen StoryTable
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

// Komponen Utama (Page)
const StoryManagementPage: React.FC = () => {
    const [activeButton, setActiveButton] = useState<number>(1);
    const [stories, setStories] = useState<Story[]>(storiesData);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortCriteria, setSortCriteria] = useState<SortCriteria>('title'); // State untuk menyimpan kriteria sorting

    // Function to handle deletion of a story
    const handleDelete = (no: number) => {
        setStories(stories.filter(story => story.no !== no));
    };

    // Function to handle updating a story
    const handleUpdate = (story: Story) => {
        console.log(`Update story:`, story);
    };

    // Function to handle search input
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Function to filter stories based on search term
    const filteredStories = stories.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.writers.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.category.toLowerCase().includes(searchTerm.toLowerCase()) || // Pencarian berdasarkan kategori
        story.keyword.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) // Pencarian berdasarkan kata kunci
    );

    // Function to sort stories based on selected criteria
    const sortedStories = [...filteredStories].sort((a, b) => {
        if (typeof a[sortCriteria] === 'string' && typeof b[sortCriteria] === 'string') {
            return a[sortCriteria].localeCompare(b[sortCriteria]); // Menggunakan localeCompare untuk string
        } else if (Array.isArray(a[sortCriteria]) && Array.isArray(b[sortCriteria])) {
            return a[sortCriteria].join(',').localeCompare(b[sortCriteria].join(',')); // Menggunakan join untuk keyword
        }
        return 0; // Jika tidak ada kondisi yang sesuai, tidak mengubah urutan
    });

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
                        color: black;
                        border: none;
                        border-radius: 4px;
                    }
                `}
            </style>
            <Sidebar activeButton={activeButton} onButtonClick={setActiveButton} />
            <div className="content">
                <h1>Search</h1>
                <div className="header-controls">
                    <input 
                        type="text" 
                        placeholder="Search by Writers/Title/Category/Keyword" 
                        className="search-bar" 
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {/* Dropdown untuk Sorting */}
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered">
                                Sort By
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Sort Options">
                            <DropdownItem key="title" onClick={() => setSortCriteria('title')}>Title</DropdownItem>
                            <DropdownItem key="writers" onClick={() => setSortCriteria('writers')}>Writers</DropdownItem>
                            <DropdownItem key="category" onClick={() => setSortCriteria('category')}>Category</DropdownItem>
                            <DropdownItem key="keyword" onClick={() => setSortCriteria('keyword')}>Keyword</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <StoryTable stories={sortedStories} onDelete={handleDelete} onUpdate={handleUpdate} />
            </div>
        </div>
    );
};

export default StoryManagementPage;
