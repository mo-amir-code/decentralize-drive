"use client";
import Display from "@/components/Display";
import FileUpload from "@/components/FileUpload";
import Modal from "@/components/Modal";
import { useUploadContext } from "@/contexts/UploadContext";
import { useState } from "react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const { account, contract, provider } = useUploadContext();

  return account && contract && provider ? (
    <>
      {!modalOpen ? (<button className="share" onClick={()=> setModalOpen(true)} >share</button>) :  <Modal setModalOpen={setModalOpen} contract={contract} />}
      <main className="max-w-5xl space-y-4 w-full mx-auto p-4">
        <h1 className="text-white font-bold text-xl text-center">
          Decentralize Drive
        </h1>
        <h2 className="text-center">
          Account Address: {account ?? "No Account Connected"}
        </h2>
        <FileUpload contract={contract} account={account} provider={provider} />
        <Display contract={contract} account={account} />
      </main>
    </>
  ) : (
    <p className="text-center">Something Error Happened</p>
  );
}
