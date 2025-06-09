import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUploader } from '../components/file-upload';
import { AlertCircle, Check } from 'lucide-react';

const FileUpload: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileProcessed = (fileName: string, columns: string[], data: any[]) => {
    setFileName(fileName);
    setColumns(columns);
    setData(data);
  };

  const handleSaveFile = async () => {
    if (!fileName || columns.length === 0 || data.length === 0) {
      setError('No file data to save. Please upload a file first.');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Mock API call to save file data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful response with file ID
      const fileId = Math.random().toString(36).substring(2, 15);
      
      setUploadSuccess(true);
      
      // Navigate to analysis page after a short delay
      setTimeout(() => {
        navigate(`/analysis/${fileId}`);
      }, 1000);
    } catch (err) {
      setError('Failed to save file data. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Upload Excel File</h1>
        <p className="text-gray-600 mt-2">
          Upload your Excel file (.xls or .xlsx) to analyze and visualize your data
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {uploadSuccess && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <div className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <p className="text-sm text-green-700">
              File uploaded successfully! Redirecting to analysis page...
            </p>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <FileUploader onFileProcessed={handleFileProcessed} />
      </div>

      {fileName && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-medium text-gray-900 mb-4">File Preview</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              <span className="font-medium">File Name:</span> {fileName}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Rows:</span> {data.length}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Columns:</span> {columns.length}
            </p>
          </div>

          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column, index) => (
                    <th 
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.slice(0, 5).map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row[column]?.toString() || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            
            {data.length > 5 && (
              <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500">
                Showing 5 of {data.length} rows
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={handleSaveFile}
              disabled={isUploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Processing...
                </>
              ) : (
                'Continue to Analysis'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;