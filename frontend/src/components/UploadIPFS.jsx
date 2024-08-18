import { useState } from 'react';
import axios from 'axios';

export const useIPFS = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadToIPFS = async (file, folderName = '', fileName = 'File') => {
    setIsUploading(true);
    setError(null);

    try {
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      let formData = new FormData();
      formData.append('file', file);

      const metadata = JSON.stringify({
        name: fileName,
        keyvalues: {
          folder: folderName
        }
      });
      formData.append('pinataMetadata', metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append('pinataOptions', options);

      const res = await axios.post(url, formData, {
        headers: {
          'pinata_api_key': import.meta.env.VITE_APP_PINATA_API_KEY,
          'pinata_secret_api_key': import.meta.env.VITE_APP_PINATA_SECRET_API_KEY,
          "Content-Type": "multipart/form-data"
        },
      });

      return res.data;
    } catch (err) {
      setError('Failed to upload file to IPFS');
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const createAndUploadMetadata = async (imageIPFSUrl, name, description, folderName = '') => {
    try {
      const metadata = {
        name,
        description,
        image: imageIPFSUrl,
      };

      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
      const res = await axios.post(url, metadata, {
        headers: {
          'pinata_api_key': import.meta.env.VITE_APP_PINATA_API_KEY,
          'pinata_secret_api_key': import.meta.env.VITE_APP_PINATA_SECRET_API_KEY,
          "Content-Type": "application/json"
        },
        pinataMetadata: {
          name: 'metadata.json',
          keyvalues: {
            folder: folderName
          }
        }
      });

      return res.data;
    } catch (err) {
      setError('Failed to upload metadata to IPFS');
      throw err;
    }
  };

  const uploadImageAndMetadata = async (file, name, description, folderName = '') => {
    try {
      const imageUploadResult = await uploadToIPFS(file, folderName, name);
      const imageIPFSUrl = `ipfs://${imageUploadResult.IpfsHash}`;
      const metadataUploadResult = await createAndUploadMetadata(imageIPFSUrl, name, description, folderName);

      return {
        imageIpfsHash: imageUploadResult.IpfsHash,
        metadataIpfsHash: metadataUploadResult.IpfsHash
      };
    } catch (err) {
      throw err;
    }
  };


  const createFolder = async (folderName) => {
    try {
      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
      const folderMetadata = {
        name: folderName,
        keyvalues: {
          folder: folderName
        }
      };
  
      const res = await axios.post(url, folderMetadata, {
        headers: {
          'pinata_api_key': import.meta.env.VITE_APP_PINATA_API_KEY,
          'pinata_secret_api_key': import.meta.env.VITE_APP_PINATA_SECRET_API_KEY,
          "Content-Type": "application/json"
        },
      });
  
      return res.data.IpfsHash;
    } catch (err) {
      setError('Failed to create folder in IPFS');
      throw err;
    }
  };

  return { uploadToIPFS, createAndUploadMetadata, uploadImageAndMetadata, createFolder, isUploading, error };
};