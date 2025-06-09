import React, { useState, useRef } from 'react';
import { Upload, FileType, AlertCircle, CheckCircle2 } from 'lucide-react';
import { read, utils } from 'xlsx';

interface FileUploaderProps {
  onFileProcessed: (fileName: string, columns: string[], data: any[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileProcessed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    setError(null);
    setUploadSuccess(false);
    
    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
      setError('Please upload an Excel file (.xlsx or .xls)');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Read the Excel file
      const data = await file.arrayBuffer();
      const workbook = read(data);
      
      // Get the first worksheet
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      
      // Convert worksheet to JSON
      const jsonData = utils.sheet_to_json(worksheet);
      
      // Extract column headers
      const headers = Object.keys(jsonData[0] || {});
      
      // Process successful
      setUploadSuccess(true);
      onFileProcessed(file.name, headers, jsonData);
    } catch (err) {
      setError('Failed to process the Excel file. Please try again.');
      console.error('Error processing Excel file:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
      
      {uploadSuccess && (
        <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <div className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <p className="text-sm text-green-700">File uploaded and processed successfully!</p>
          </div>
        </div>
      )}
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400'
        } transition-colors cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
          accept=".xlsx,.xls"
        />
        
        <div className="flex flex-col items-center">
          {isUploading ? (
            <div className="mb-3 w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin"></div>
          ) : (
            <div className="mb-3 p-3 rounded-full bg-blue-100 text-blue-600">
              <Upload className="h-6 w-6" />
            </div>
          )}
          
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            {isUploading ? 'Processing file...' : 'Upload Excel File'}
          </h3>
          
          <p className="mb-4 text-sm text-gray-500">
            {isUploading 
              ? 'Please wait while we process your data' 
              : 'Drag and drop your file here, or click to browse'}
          </p>
          
          <div className="flex items-center">
            <FileType className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">Supports .xlsx and .xls files</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;