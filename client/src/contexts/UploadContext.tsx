"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Upload from "@/artifacts/contracts/Upload.sol/Upload.json";

interface UploadContextType {
    account: string | null,
    contract: string | null,
    provider: any,
    isModalOpen: boolean
}

const initialContextValue:UploadContextType = {
    account: null,
    contract: null,
    provider: null,
    isModalOpen: false
}


const UploadContext = createContext<UploadContextType>(initialContextValue);


const UploadContextProvider = ({children}:{children: ReactNode}) => {
    const [account, setAccount] = useState<string | null>(null)
    const [contract, setContract] = useState<any>(null)
    const [provider, setProvider] = useState<any>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)


    const loadProvider = async (provider:any) => {
        try {
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);

            let contractAddress = process.env.NEXT_PUBLIC_CONTARCT_ADDRESS;

            if(!contractAddress){
                console.error("Contract Address Not Found");
                return;
            }

            const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
            setContract(contract);

            
        } catch (error:any) {
            console.error(error);
        }
    }


    useEffect(() => {
        const provider = new ethers.BrowserProvider(window.ethereum);

        if(provider){
            setProvider(provider);
            loadProvider(provider);
        }else{
            alert("Metamask is not installed");
        }
    }, []);

    return (
        <UploadContext.Provider value={{
            account,
            contract,
            provider,
            isModalOpen
        }} >
            {children}
        </UploadContext.Provider>
    )
}

export const useUploadContext = () => useContext(UploadContext);

export default UploadContextProvider;