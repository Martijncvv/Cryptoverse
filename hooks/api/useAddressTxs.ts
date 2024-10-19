import axios from "axios";
import {
  NETWORKS,
  TEST_1155_CONTRACT_ADDRESS,
} from "@/assets/constants/Constants";
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

  const networkConfig = NETWORKS["baseSepolia"];

  if (!networkDetails) {
    console.error("fetchAddressTxs-Network not found: ", networkId);
    throw new Error("fetchAddressTxs-Network not found");
  }

  const { data } = await axios.get(
    `https://${networkConfig.domain}/api?module=account&action=txlist&address=${TEST_1155_CONTRACT_ADDRESS}&page=1&offset=30&startblock=0&endblock=99999999&sort=desc&apikey=${networkConfig.apikey}`,
  );

  return data;
};

const useAddressTxs = (address: string, networkId: string, page: number = 1) =>
  useQuery({
    queryKey: ["addressTxs", address, page],
    queryFn: () => fetchAddressTxs(address, networkId, page),
    keepPreviousData: true,
  });

export default useAddressTxs;
