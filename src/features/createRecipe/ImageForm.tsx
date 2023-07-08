import { useState, useRef, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import { FormikErrors } from 'formik';
import { Typography } from '@mui/material';

import { useUploadFileMutation } from '../../services/recipes';

const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  minHeight: '200px',
  background: theme.palette.grey[100],
  border: `2px dashed ${blue[200]}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',

  '&.active': {
    border: `2px dashed ${red[400]}`,
  },
}));

const StyledImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  aspectRatio: '1',
});

const acceptedFiletypes = ['image/jpeg', 'image/jpg', 'image/png'];

interface ImageFormProps {
  setFieldValue: (field: string, value: string) => void;
  error: FormikErrors<string> | undefined;
  imageId?: string;
}

function ImageForm({ error, setFieldValue, imageId }: ImageFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadFile, { isLoading }] = useUploadFileMutation();

  const dropAreaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      uploadFile(formData)
        .unwrap()
        .then((data) => {
          setFieldValue('imageId', data.id);
          if (selectedFile && imageRef.current) {
            imageRef.current.src = URL.createObjectURL(selectedFile);
          }
        });
    },
    [uploadFile, setFieldValue, selectedFile]
  );

  useEffect(() => {
    if (selectedFile && imageRef.current) {
      handleUpload(selectedFile);
    }
  }, [selectedFile, handleUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.add('active');
    }
  };

  const handleDragLeave = () => {
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('active');
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (isLoading) return;
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('active');
    }
    const files = Array.from(event.dataTransfer.files);
    if (acceptedFiletypes.includes(files[0].type)) {
      setSelectedFile(files[0]);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading) return;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setSelectedFile(event.currentTarget.files[0]);
    }
  };

  const handleAreaClick = () => {
    if (isLoading) return;
    inputRef.current?.click();
  };

  const renderImage = () => {
    if (selectedFile) {
      if (isLoading) {
        return <p>Uploading...</p>;
      }
      return <StyledImage ref={imageRef} src="#" alt="Uploaded image" />;
    }

    if (imageId) {
      return <StyledImage src={`/api/files/${imageId}`} alt="Uploaded image" />;
    }

    return <p>Drag and Drop image or Click Here</p>;
  };

  return (
    <Wrapper
      ref={dropAreaRef}
      onClick={handleAreaClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={acceptedFiletypes.join(',')}
        ref={inputRef}
        onChange={handleInputChange}
        hidden
      />
      {renderImage()}
      {error && <Typography>{error}</Typography>}
    </Wrapper>
  );
}

export default ImageForm;
