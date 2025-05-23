import { useLogin } from "@/api/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

function Login() {
  const { mutate, isPending } = useLogin();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    mutate(userInfo);
  };

  console.log(userInfo);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md px-4">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription className="text-gray-500">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                value={userInfo.email}
                type="email"
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={userInfo.password}
                onChange={handleChange}
                name="password"
              />
            </div>
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              onClick={handleSubmit}
              disabled={isPending}
            >
              Sign in
            </Button>
          </CardContent>
          <CardFooter className="text-center">
            <div className="w-full text-sm text-gray-500">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Sign up
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Login;
