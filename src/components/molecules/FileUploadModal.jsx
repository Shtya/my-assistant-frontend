import { useState, useEffect } from 'react';
import { FiUpload, FiFile, FiX, FiTrash2 } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import Modal from './Modal';
import { toast } from 'react-hot-toast';
import { api, baseUrl } from '@/helper/api';

const FileUploadModal = ({
  show,
  onClose,
  onSelect,
  onUploadSuccess,
  maxSizeMB = 5,
  allowedFileTypes = [],
  title = 'Select File',
  uploadText = 'Upload',
  allowMultiple = true,
}) => {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [userAssets, setUserAssets] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState({});

  // Fetch existing assets when modal opens
  useEffect(() => {
    if (show) {
      fetchAssets();
    }
  }, [show]);

  const fetchAssets = async () => {
    try {
      const response = await api.get('/assets');
      setUserAssets(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch files');
      console.error('Fetch error:', error);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Create preview URLs for images
    const newPreviewUrls = {};
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        newPreviewUrls[file.name] = URL.createObjectURL(file);
      }
    });
    setPreviewUrls(newPreviewUrls);
    
    setSelectedFiles(files);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleDeleteAsset = async (assetId) => {
    if (deleting) return;
    
    try {
      setDeleting(true);
      await api.delete(`/assets/${assetId}`);
      setUserAssets(prev => prev.filter(asset => asset.id !== assetId));
      toast.success('File deleted successfully');
    } catch (error) {
      toast.error('Failed to delete file');
      console.error('Delete error:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    // Validate all files first
    for (const file of selectedFiles) {
      if (allowedFileTypes.length > 0 && !allowedFileTypes.includes(file.type)) {
        toast.error(`File ${file.name} has invalid type. Only ${allowedFileTypes.join(', ')} are allowed`);
        return;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`File ${file.name} exceeds ${maxSizeMB}MB limit`);
        return;
      }
    }

    try {
      setUploading(true);
      const formData = new FormData();

      if (selectedFiles.length === 1) {
        // Single file upload
        formData.append('file', selectedFiles[0]);
        const response = await api.post('/assets', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setUserAssets(prev => [ response.data , ...prev]);
        if (onUploadSuccess) onUploadSuccess(response.data);
        toast.success('File uploaded successfully');
      } else {
        // Bulk upload
        selectedFiles.forEach(file => formData.append('files', file));
        const response = await api.post('/assets/bulk', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setUserAssets(prev => [...response.data.assets , ...prev]);
        if (onUploadSuccess) onUploadSuccess(response.data.assets);
        toast.success(`${response.data.assets.length} files uploaded successfully`);
      }

      // Clean up preview URLs
      Object.values(previewUrls).forEach(url => URL.revokeObjectURL(url));
      setPreviewUrls({});
      setSelectedFiles([]);
    } catch (error) {
      toast.error(`Failed to upload ${selectedFiles.length > 1 ? 'files' : 'file'}`);
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const selectAsset = (url) => {
    if (onSelect) onSelect(url);
    onClose();
  };

  return (
    <Modal title={title} show={show} onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            {selectedFiles.length > 0 ? 'Selected Files' : 'Your Files'}
          </h3>

          {selectedFiles.length > 0 ? (
            <div className="space-y-4">
              <div className="max-h-60 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      {file.type.startsWith('image/') ? (
                        <img 
                          src={previewUrls[file.name]} 
                          alt="Preview" 
                          className="h-10 w-10 object-cover rounded"
                        />
                      ) : (
                        <FiFile className="text-gray-500" />
                      )}
                      <span className="text-sm truncate max-w-xs">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)}MB
                      </span>
                    </div>
                    <button 
                      onClick={() => handleRemoveFile(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {uploading ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Uploading...
                  </span>
                ) : (
                  `Upload ${selectedFiles.length} File${selectedFiles.length > 1 ? 's' : ''}`
                )}
              </button>
            </div>
          ) : (
            <>
              <div className="grid  grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 max-h-60 min-h-[300px] overflow-y-auto rounded-lg p-2 bg-gray-50 border border-gray-200">
                <label className="hover:scale-[.98] flex flex-col items-center justify-center text-center p-2 max-md:h-[90px] h-[130px] w-full border-2 border-dashed border-indigo-300 rounded-lg bg-indigo-50 hover:bg-indigo-100 cursor-pointer transition duration-300 relative">
                  <input 
                    type="file" 
                    className="sr-only" 
                    onChange={handleFileChange} 
                    disabled={uploading} 
                    accept={allowedFileTypes.join(',')} 
                    multiple={allowMultiple} 
                  />
                  <FiUpload className="h-6 w-6 text-indigo-400" />
                  <span className="mt-1 text-xs text-indigo-600">{uploadText}</span>
                </label>

                {userAssets.map(asset => (
                  <div key={asset.id} className="group relative">
                    <button
                      onClick={() => selectAsset(asset.url)}
                      className="cursor-pointer hover:scale-[.98] duration-300 max-md:h-[90px] h-[130px] w-full shadow-inner rounded-lg border border-gray-200 hover:border-indigo-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 bg-white"
                    >
                      {asset.mimeType.startsWith('image/') ? (
                        <img 
                          src={baseUrl + asset.url} 
                          alt={asset.filename} 
                          className="h-[80px] max-md:h-[50px] mx-auto w-[100px] object-contain" 
                        />
                      ) : (
                        <div className="h-[80px] w-[100px] p-2 flex items-center justify-center bg-gray-100 rounded-md">
                          <FiFile className="h-full w-full text-gray-400" />
                        </div>
                      )}
                      <p className="mt-2 text-xs text-gray-600 text-center truncate">{asset.filename}</p>
                    </button>
                    <button
                      onClick={() => handleDeleteAsset(asset.id)}
                      disabled={deleting}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      title="Delete file"
                    >
                      <FiTrash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FileUploadModal;