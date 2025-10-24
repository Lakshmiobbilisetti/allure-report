import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserEmail(parsedUser.email || "");
    } else {
      window.location.href = "/";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-rose-200">
      <Card className="w-[400px] bg-white border-none shadow-none p-6 rounded-2xl">
        <CardHeader className="p-0">
          <CardTitle className="text-center text-2xl font-semibold text-rose-600">
            Welcome to Dashboard
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-4 mt-4">
          <p className="text-lg text-gray-700">
            {userEmail
              ? `Logged in as ${userEmail}`
              : "You are successfully logged in!"}
          </p>

          <div className="flex justify-center">
            <Button
              onClick={handleLogout}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg"
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
