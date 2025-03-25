import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const triggerFileInput = (id: string) => {
  const element = document.getElementById(id);
  if (element instanceof HTMLElement) {
    element.click();
  }
};

const Transfers = () => {
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file3, setFile3] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle transfer submission logic here
    console.log('Transfer submitted:', { amount, accountNumber, routingNumber, file1, file2, file3 });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Make a Transfer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input
            type="text"
            id="accountNumber"
            placeholder="Enter account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="routingNumber">Routing Number</Label>
          <Input
            type="text"
            id="routingNumber"
            placeholder="Enter routing number"
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Upload Documents</Label>
          <div className="flex space-x-4">
            <div>
              <Button variant="outline" onClick={() => triggerFileInput('fileInput1')}>
                Upload File 1
              </Button>
              <input
                type="file"
                id="fileInput1"
                className="hidden"
                onChange={(e) => handleFileChange(e, setFile1)}
              />
              {file1 && <p className="text-sm mt-1">File: {file1.name}</p>}
            </div>
            <div>
              <Button variant="outline" onClick={() => triggerFileInput('fileInput2')}>
                Upload File 2
              </Button>
              <input
                type="file"
                id="fileInput2"
                className="hidden"
                onChange={(e) => handleFileChange(e, setFile2)}
              />
              {file2 && <p className="text-sm mt-1">File: {file2.name}</p>}
            </div>
            <div>
              <Button variant="outline" onClick={() => triggerFileInput('fileInput3')}>
                Upload File 3
              </Button>
              <input
                type="file"
                id="fileInput3"
                className="hidden"
                onChange={(e) => handleFileChange(e, setFile3)}
              />
              {file3 && <p className="text-sm mt-1">File: {file3.name}</p>}
            </div>
          </div>
        </div>
        <Button type="submit">Submit Transfer</Button>
      </form>
    </div>
  );
};

export default Transfers;
