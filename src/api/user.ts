const URL = import.meta.env.VITE_BACKEND_BASE_URL;
import { useToast } from "@/context/toast";
import { useMutation } from "@tanstack/react-query";

type LoginT = {
  email: string;
  password: string;
};

export type LoginResponseT = {
  message: string;
};

export type ErrorResponseT = {
  message: string;
};

export const useLogin = () => {
  const { showToast } = useToast();
  const login = async (data: LoginT): Promise<LoginResponseT> => {
    const response = await fetch(`${URL}/admin/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    console.log(res);

    if (!response.ok) {
      const error: ErrorResponseT = {
        message: res.message || "Internal Server Error",
      };

      throw error;
    }

    return res as LoginResponseT;
  };

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      showToast(data.message, "success");
    },
    onError: (err) => {
      showToast(err.message, "error");
    },
  });
  return mutation;
};
