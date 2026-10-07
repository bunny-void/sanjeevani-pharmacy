import { useState, useRef } from 'react';
import { UploadCloud, File, X, CheckCircle2, ShieldCheck, Clock, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Prescription() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError('');

    if (!selectedFile) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a valid format (JPG, JPEG, PNG, PDF)');
      return;
    }

    if (selectedFile.size > 15 * 1024 * 1024) {
      setError('File size must be less than 15MB');
      return;
    }

    setFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setError('');
    const droppedFile = e.dataTransfer.files?.[0];
    
    if (!droppedFile) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(droppedFile.type)) {
      setError('Please upload a valid format (JPG, JPEG, PNG, PDF)');
      return;
    }

    if (droppedFile.size > 15 * 1024 * 1024) {
      setError('File size must be less than 15MB');
      return;
    }

    setFile(droppedFile);
  };

  const handleSubmit = () => {
    if (!file) return;
    // Simulate upload
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Prescription Uploaded!</h1>
        <p className="text-gray-600 mb-8 max-w-md">Your prescription has been successfully submitted. Our pharmacist will review it and process your order shortly.</p>
        <Button onClick={() => { setIsSuccess(false); setFile(null); }}>Upload Another</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Prescription</h1>
        <p className="text-gray-600 mb-8">Please upload a valid doctor's prescription for Rx medicines.</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${file ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 bg-white'}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {!file ? (
                <>
                  <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Drag and drop your file here</h3>
                  <p className="text-sm text-gray-500 mb-4">or click to browse from your device</p>
                  <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                    Browse Files
                  </Button>
                  <p className="text-xs text-gray-400 mt-4">Supported formats: JPG, PNG, PDF (Max 15MB)</p>
                </>
              ) : (
                <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-primary-200">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-primary-100 p-2 rounded text-primary-600">
                      <File className="w-6 h-6" />
                    </div>
                    <div className="text-left overflow-hidden">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setFile(null)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </div>
            
            {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

            <Button 
              className="w-full py-6 text-lg" 
              disabled={!file}
              onClick={handleSubmit}
            >
              Submit Prescription
            </Button>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">How it works?</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-sm border border-gray-100">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">1. Upload Valid Rx</h4>
                  <p className="text-sm text-gray-600">Upload a clear photo or PDF of a valid prescription.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-sm border border-gray-100">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">2. Pharmacist Review</h4>
                  <p className="text-sm text-gray-600">Our certified pharmacists will verify your prescription.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-sm border border-gray-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">3. Quick Delivery</h4>
                  <p className="text-sm text-gray-600">Once verified, your medicines will be dispatched immediately.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
