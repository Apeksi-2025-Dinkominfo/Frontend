'use client';
import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Sidebar from '../../components/sidebar'; // Adjust the import path as needed

interface GalleryItem {
  no: number;
  image: string;
  category: string;
}

const GalleryManagementPage: React.FC = () => {
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newItems, setNewItems] = useState<Omit<GalleryItem, 'no'>[]>([]); // Multiple new items
  const [nextNo, setNextNo] = useState(1);
  const [editItemNo, setEditItemNo] = useState<number | null>(null);
  const [activeButton, setActiveButton] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('');

  const handleDelete = (no: number) => {
    setGalleryItems(galleryItems.filter((item) => item.no !== no));
    console.log(`Deleted gallery item with No: ${no}`);
  };

  const handleAddItem = () => {
    setOpenDialog(true);
    setEditItemNo(null);
    setNewItems([]); // Reset newItems for multiple uploads
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
        const fileArray: Omit<GalleryItem, 'no'>[] = [];
        let filesProcessed = 0; // To track how many files have been processed

        Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                fileArray.push({ image: reader.result as string, category: activeCategory });

                // Only update state when all files are processed
                filesProcessed++;
                if (filesProcessed === files.length) {
                    setNewItems((prevItems) => [...prevItems, ...fileArray]); // Update state after all files are read
                }
            };
            reader.readAsDataURL(file);
        });
    }
};


  const handleSaveItem = () => {
    let updatedNo = nextNo; // Gunakan let agar bisa diubah
    const updatedItems = newItems.map((item) => ({
      no: updatedNo++, // Increment setelah assign
      ...item,
    }));
    setGalleryItems([...galleryItems, ...updatedItems]);
    setNextNo(updatedNo); // Update the next number secara global
    setOpenDialog(false);
  };

  const handleEdit = (item: GalleryItem) => {
    setNewItems([{ image: item.image, category: item.category }]);
    setEditItemNo(item.no);
    setOpenDialog(true);
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeButton={activeButton} onButtonClick={setActiveButton} />
      <div className="flex-1 p-4 overflow-auto ml-16">
        {' '}
        {/* Ensure margin-left matches the sidebar width */}
        <h1 className="text-2xl font-bold mb-4">Gallery</h1>
        {/* Category Buttons */}
        <div className="flex space-x-2 mb-4 justify-center">
          {' '}
          {/* Center align the buttons */}
          <button
            className={`p-2 rounded ${
              activeCategory === 'Day'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setActiveCategory('Day')}
          >
            Day
          </button>
          <button
            className={`p-2 rounded ${
              activeCategory === 'Event'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setActiveCategory('Event')}
          >
            Event
          </button>
          <button
            className={`p-2 rounded ${
              activeCategory === 'Venue'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setActiveCategory('Venue')}
          >
            Venue
          </button>
        </div>
        {/* Gallery by Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems
            .filter((item) => item.category === activeCategory)
            .map((item) => (
              <div key={item.no} className="border rounded p-2 mb-4">
                {' '}
                {/* Reduce padding for smaller size */}
                <img
                  src={item.image}
                  alt={`Gallery ${item.no}`}
                  className="w-full h-auto rounded mb-2 object-cover"
                  style={{ height: '150px' }}
                />
                <div className="flex justify-between mt-2">
                  <button
                    className="bg-blue-500 text-white p-1 rounded text-xs"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-1 rounded text-xs"
                    onClick={() => handleDelete(item.no)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
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
          <DialogTitle>
            {editItemNo !== null ? 'Edit Gallery Item' : 'Add New Gallery Item'}
          </DialogTitle>
          <DialogContent>
            {/* Pilih kategori untuk semua gambar */}
            <div className="mt-2">
              <label className="block">Category for All:</label>
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)} // Pilih satu kategori untuk semua gambar
                className="block w-full border rounded p-1"
              >
                <option value="">Select Category</option>
                <option value="Day">Day</option>
                <option value="Event">Event</option>
                <option value="Venue">Venue</option>
              </select>
            </div>

            {newItems.map((item, index) => (
              <div key={index} className="mb-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt="Preview"
                    className="w-full h-auto mb-2 object-cover"
                    style={{ height: '150px' }}
                  />
                )}
              </div>
            ))}

            <input
              type="file"
              accept="image/*"
              multiple // Allow multiple file selection
              onChange={handleImageUpload}
              className="mb-2"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveItem}>
              {editItemNo !== null ? 'Update' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default GalleryManagementPage;