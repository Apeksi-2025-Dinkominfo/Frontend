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

// Komponen Utama (Page)
interface GalleryItem {
    no: number;
    image: string;
    caption: string;
    category: string; // Tambahkan kategori
}

const GalleryManagementPage: React.FC = () => {
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newItem, setNewItem] = useState<Omit<GalleryItem, 'no'>>({ image: '', caption: '', category: '' }); // Tambahkan kategori ke newItem
    const [nextNo, setNextNo] = useState(1);
    const [editItemNo, setEditItemNo] = useState<number | null>(null);
    const [activeButton, setActiveButton] = useState<number>(0); // Ubah default ke 0
    const [activeCategory, setActiveCategory] = useState<string>(''); // Tambahkan state kategori aktif

    // Function to handle deletion of a gallery item
    const handleDelete = (no: number) => {
        setGalleryItems(galleryItems.filter(item => item.no !== no));
        console.log(`Deleted gallery item with No: ${no}`);
    };

    // Function to handle adding a new gallery item
    const handleAddItem = () => {
        setOpenDialog(true);
        setEditItemNo(null);
        setNewItem({ image: '', caption: '', category: '' }); // Reset kategori saat menambah item baru
    };

    // Function to save the new or updated gallery item
    const handleSaveItem = () => {
        if (editItemNo !== null) {
            setGalleryItems(galleryItems.map(item => (item.no === editItemNo ? { ...item, ...newItem } : item)));
        } else {
            const itemToAdd = { no: nextNo, ...newItem };
            setGalleryItems([...galleryItems, itemToAdd]);
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
                setNewItem({ ...newItem, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to handle editing a gallery item
    const handleEdit = (item: GalleryItem) => {
        setNewItem({ image: item.image, caption: item.caption, category: item.category }); // Ambil kategori saat edit
        setEditItemNo(item.no);
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
                    .sidebar ul li a.active {
                        background-color: #2980b9;
                    }
                    .content {
                        flex-grow: 1;
                        padding: 20px;
                        overflow-y: auto;
                    }
                    .content h1 {
                    font-size: 36px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    }
                    }
                    .category-buttons {
                        margin-bottom: 20px;
                    }
                    .category-buttons button {
                        margin-right: 10px;
                        padding: 10px 20px;
                        background-color: #2980b9;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    }
                    .category-buttons button:hover {
                        background-color: #3498db;
                    }
                    .category-buttons button.active {
                        background-color: #1abc9c;
                    }
                    .gallery-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                        gap: 20px;
                    }
                    .gallery-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 15px;
                        border: 1px s
                        olid #ddd;
                        border-radius: 8px;
                        text-align: center;
                        transition: box-shadow 0.3s ease;
                        background-color: white;
                    }
                    .gallery-item:hover {
                        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
                    }
                    .gallery-image {
                        width: 100%;
                        height: auto;
                        object-fit: cover;
                        border-radius: 8px;
                        margin-bottom: 10px;
                    }
                    .preview-image {
                        width: 100px;
                        height: auto;
                        object-fit: cover; 
                        margin-bottom: 10px;
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
                    @media (max-width: 600px) {
                        .gallery-grid {
                            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                        }
                    }
                `}
            </style>
            <Sidebar activeButton={activeButton} onButtonClick={setActiveButton} />
            <div className="content">
                <h1>Gallery</h1>

                {/* Tombol Kategori */}
                <div className="category-buttons">
                    <button className={activeCategory === 'Day' ? 'active' : ''} onClick={() => setActiveCategory('Day')}>Day</button>
                    <button className={activeCategory === 'Event' ? 'active' : ''} onClick={() => setActiveCategory('Event')}>Event</button>
                    <button className={activeCategory === 'Venue' ? 'active' : ''} onClick={() => setActiveCategory('Venue')}>Venue</button>
                </div>

                {/* Galeri berdasarkan kategori */}
                <div className="gallery-grid">
                    {galleryItems.filter(item => item.category === activeCategory).map((item) => (
                        <div key={item.no} className="gallery-item">
                            <img src={item.image} alt={`Gallery ${item.no}`} className="gallery-image" />
                            <p>{item.caption}</p>
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item.no)}>Delete</button>
                        </div>
                    ))}
                </div>

                {/* Speed Dial for adding new gallery item */}
                <SpeedDial
                    ariaLabel="Add Actions"
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    icon={<AddIcon />}
                    onClose={() => setOpenSpeedDial(false)}
                    onOpen={() => setOpenSpeedDial(true)}
                    open={openSpeedDial}
                >
                    <SpeedDialAction
                        key="addGallery"
                        icon={<AddIcon />}
                        tooltipTitle="Add Gallery Item"
                        onClick={handleAddItem}
                    />
                </SpeedDial>

                {/* Dialog for adding/editing gallery item */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>{editItemNo !== null ? 'Edit Gallery Item' : 'Add New Gallery Item'}</DialogTitle>
                    <DialogContent>
                        {newItem.image && ( // Tampilkan gambar yang ada jika ada
                            <img src={newItem.image} alt="Preview" className="preview-image" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        <TextField
                            margin="dense"
                            label="Caption"
                            fullWidth
                            variant="outlined"
                            value={newItem.caption}
                            onChange={(e) => setNewItem({ ...newItem, caption: e.target.value })}
                        />
                        <div>
                            <label>Kategori:</label>
                            <select
                                value={newItem.category}
                                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                            >
                                <option value="">Pilih Kategori</option>
                                <option value="Day">Day</option>
                                <option value="Event">Event</option>
                                <option value="Venue">Venue</option>
                            </select>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button onClick={handleSaveItem}>{editItemNo !== null ? 'Update' : 'Save'}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default GalleryManagementPage;
