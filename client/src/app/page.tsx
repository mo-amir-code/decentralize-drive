"use client";
import Display from "@/components/Display";
import FileUpload from "@/components/FileUpload";
import { useUploadContext } from "@/contexts/UploadContext";

export default function Home() {
  const { account, contract, provider } = useUploadContext();

  return account && contract && provider ? (
    <main className="max-w-5xl w-full mx-auto p-4 space-y-2">
      <h1 className="text-white font-bold text-xl text-center">
        Decentralize Drive
      </h1>
      <h2 className="text-center">
        Account Address: {account ?? "No Account Connected"}
      </h2>
      <FileUpload contract={contract} account={account} provider={provider} />
      <Display contract={contract} account={account} />
    </main>
  ) : (
    <p className="text-center">Something Error Happened</p>
  );
}
