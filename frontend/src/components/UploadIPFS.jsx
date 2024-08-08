import { useState } from 'react';
import axios from 'axios';

export const useIPFS = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadToIPFS = async (file, name = 'File') => {
    setIsUploading(true);
    setError(null);

    try {
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      let formData = new FormData();
      formData.append('file', file);

      const metadata = JSON.stringify({
        name: name,
      });
      formData.append('pinataMetadata', metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append('pinataOptions', options);

      const res = await axios.post(url, formData, {
        headers: {
          'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY,
          'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
          "Content-Type": "multipart/form-data"
        },
      });

      return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
    } catch (err) {
      setError('Failed to upload file to IPFS');
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const createAndUploadMetadata = async (imageIPFSUrl, name, description) => {
    try {
      const metadata = {
        name,
        description,
        image: imageIPFSUrl,
      };

      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
      const res = await axios.post(url, metadata, {
        headers: {
          'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY,
          'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
          "Content-Type": "application/json"
        },
      });

      return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
    } catch (err) {
      setError('Failed to upload metadata to IPFS');
      throw err;
    }
  };

  const uploadImageAndMetadata = async (file, name, description) => {
    try {
      const imageIPFSUrl = await uploadToIPFS(file, name);
      const metadataIPFSUrl = await createAndUploadMetadata(imageIPFSUrl, name, description);

      // Now you can use metadataIPFSUrl as a parameter in your Solidity mint function.
      return metadataIPFSUrl;
    } catch (err) {
      throw err;
    }
  };

  return { uploadImageAndMetadata, isUploading, error };
};
 