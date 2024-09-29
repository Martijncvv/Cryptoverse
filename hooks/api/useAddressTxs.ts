import axios from "axios";
import { SHARED_API_KEY_ETHERSCAN } from "@/assets/constants/Constants";
import { useQuery } from "@tanstack/react-query";
import { getNetworkDetails } from "@/utils/getNetworkDetails";

interface TxResponse {
  result: any[];
  status: string;
  message: string;
}

const fetchAddressTxs = async (
  address: string,
  networkId: string,
  page: number,
): Promise<TxResponse> => {
  console.log("fetchAddressTxs: ", address, page);

  const networkDetails = getNetworkDetails(networkId);

  if (!networkDetails) {
    console.error("fetchAddressTxs-Network not found: ", networkId);
    throw new Error("fetchAddressTxs-Network not found");
  }

  const { data } = await axios.get(
    `https://${networkDetails.domain}/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=15&sort=desc&apikey=${SHARED_API_KEY_ETHERSCAN}`,
  );
  console.log("data123: ", data);
  return data;
};

const useAddressTxs = (address: string, networkId: string, page: number = 1) =>
  useQuery({
    queryKey: ["addressTxs", address, page],
    queryFn: () => fetchAddressTxs(address, networkId, page),
    keepPreviousData: true,
  });

export default useAddressTxs;
