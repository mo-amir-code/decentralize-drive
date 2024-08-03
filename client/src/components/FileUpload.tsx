import axios from "axios";
import { FormEvent, useState } from "react";

const FileUpload = ({
  contract,
  account,
  provider,
}: {
  contract: any;
  account: string;
  provider: any;
}) => {
  const [file, setFile] = useState<any>(null);
  const [fileName, setFileName] = useState<string>("No Image Selected");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "POST",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
            pinata_secret_api_key:
              process.env.NEXT_PUBLIC_PINATA_API_SECRET_KEY,
            "Content-Type": "multipart/form-data",
          },
        });

        const imgHash = `ipfs://${resFile?.data?.ipfsHash}`;

        await contract.add(account, imgHash);
        alert("Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      }
    } catch (error: any) {
      console.error(error);
      alert("File Upload Error");
    }
  };

  const retrieveFile = (e: any) => {
    const data = e.target.files[0];
    
    setFile(data);
    setFileName(data?.name);
  };

  return (
    <div className="text-white">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 justify-center">
        <label
          htmlFor="upload-file"
          className="bg-blue-600 px-2 py-1 rounded-md"
        >
          Select File
        </label>
        <input
          className=" hidden"
          type="file"
          id="upload-file"
          name="data"
          onChange={retrieveFile}
        />
        <span>Image: {fileName}</span>
        <button disabled={!file} type="submit" className="bg-green-600 px-2 py-1 rounded-md">
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
