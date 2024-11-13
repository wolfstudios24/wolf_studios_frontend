
import React, { useState } from 'react';
import { Avatar, Box, IconButton, Typography, Stack } from '@mui/material';
import { Camera as CameraIcon, X as CrossIcon } from '@phosphor-icons/react';
import Image from 'next/image';

export default function ImageUploader({ value, onFileSelect, onDelete }) {
    const [previewUrl, setPreviewUrl] = useState(value || '');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
            onFileSelect(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewUrl('');
        if (onDelete) onDelete();
    };

    return (
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Image
                src={previewUrl || "/assets/default_avatar.png"}
                alt="Uploaded Image"
                width={200}
                height={200}
                style={{ objectFit: 'cover', borderRadius: "10px", border: "1px solid var(--mui-palette-divider)" }}
            />

            <Box
                component="label"
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: '8px',
                }}
            >

                <CameraIcon fontSize="small" color="var(--mui-palette-common-white)" />
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />

            </Box>
        </Box>
    );
}
