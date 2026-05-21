import React, { useState, useRef } from "react";
import { candidateApi } from "../services/candidateService";
import { Upload } from "lucide-react";

interface BulkUploadProps {
  onUploadComplete: () => void;
}

const BulkUpload: React.FC<BulkUploadProps> = ({ onUploadComplete }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (text: string): { name: string; role: string }[] => {
    const lines = text.trim().split("\n");
    const candidates: { name: string; role: string }[] = [];

    // Check if first line is a header
    const firstLine = lines[0].toLowerCase();
    const hasHeader = firstLine.includes("name") || firstLine.includes("role");
    const startIndex = hasHeader ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const [name, role] = line.split(",").map((item) => item.trim());
      if (name && role) {
        candidates.push({ name, role });
      }
    }

    return candidates;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");
    setSuccess("");

    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      setError("Please upload a CSV file");
      return;
    }

    setLoading(true);
    try {
      const text = await file.text();
      const candidates = parseCSV(text);

      if (candidates.length === 0) {
        setError("No valid candidates found in CSV file");
        setLoading(false);
        return;
      }

      await candidateApi.bulkUpload(candidates);
      setSuccess(`Successfully uploaded ${candidates.length} candidates`);
      onUploadComplete();

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setError("Failed to upload candidates. Please check your CSV format.");
      console.error("Error uploading candidates:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl">Bulk Upload Candidates</h2>
      <div className="text-center text-md p-3 rounded text-gray-500 font-normal">
        <p>Upload a CSV file with the following format:</p>
        <pre>
          name,role{"\n"}
          John Doe,Software Engineer{"\n"}
          Jane Smith,Product Manager
        </pre>
      </div>

      <div className="file-upload my-4 flex justify-center text-white border-lg bg-[#F94C04] hover:bg-[#F94C04]/80 border p-2 rounded-lg space-x-4 cursor-pointer w-1/2 mx-auto">
        <Upload />
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={loading}
          className="file-input cursor-pointer"
        />
      </div>
      {loading && <div>Uploading...</div>}

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default BulkUpload;
