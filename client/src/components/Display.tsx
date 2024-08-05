import React, { useState } from "react";

const Display = ({ account, contract }: { contract: any; account: string }) => {
  const [data, setData] = useState<any>("");

  const getData = async () => {
    let dataArr;

    const element = document.getElementById(
      "address"
    ) as HTMLInputElement | null;
    const otherAddress = element?.value || null;
    if (otherAddress) {
      dataArr = await contract.display(otherAddress);
    } else {
      dataArr = await contract.display(account);
    }

    const isEmpty = Object.keys(dataArr).length === 0;

    if (!isEmpty) {
      const str = dataArr.toString();
      const str_arr = str.split(",");
      const images = str_arr?.map((img: string, i: number) => (
        <a href={`https://gateway.pinata.cloud/ipfs/${img.substring(6)}`} key={i} target="_blank">
          <img
            src={`https://gateway.pinata.cloud/ipfs/${img.substring(6)}`}
            className="w-[300px]"
            alt="new"
          />
        </a>
      ));
      setData(images);
    } else {
      alert("No Image To Display");
    }
  };

  return (
    <div className="flex justify-center">
      <div>
        <div className="flex flex-wrap gap-2">{data}</div>
        <div className="flex gap-2">
          <input
            id="address"
            type="text"
            placeholder="Enter Address"
            className="outline-none rounded-md text-black text-sm px-2 py-1"
          />
          <button
            onClick={getData}
            className="px-2 py-1 bg-blue-600 rounded-md"
          >
            Get Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Display;
