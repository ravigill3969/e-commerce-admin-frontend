import { useQuery } from "@tanstack/react-query";

const URL = import.meta.env.VITE_BACKEND_BASE_URL;

type ErrorResponseT = {
  message: string;
};

export interface Product {
  _id: string;
  productName: string;
  sellerID: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand: string;
  description: string;
  photoURLs: string[];
  isActive: boolean;
  createdAt: string; // or Date if you're parsing
  updatedAt: string; // or Date if you're parsing
  __v: number;
}

export interface InactiveProductsResponse {
  message: string;
  count: number;
  products: Product[];
}


export const useGetInactiveProducts = () => {
  const getInActiveProducts = async ():Promise<InactiveProductsResponse> => {
    const response = await fetch(`${URL}/admin/product/get-inAct-product`, {
      credentials: "include",
      method: "GET",
    });

    const res = await response.json();

    if (!response.ok) {
      const error: ErrorResponseT = {
        message: res.message || "Internal Server Error",
      };

      throw error;
    }

    console.log(res);
    return res;
  };

  const query = useQuery({
    queryKey: ["getInActiveProducts"],
    queryFn: getInActiveProducts,
  });

  return query;
};
