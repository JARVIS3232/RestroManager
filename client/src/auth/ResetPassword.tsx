import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [isLoading, setisLoading] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form className="flex flex-col gap-5 md:border md:p-8 w-full max-w-md rounded-lg mx-4">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="font-extraboldbold text-2xl">Reset Password</h1>
          <p className="text-sm text-gray-600">
            Enter your new password to reset old one
          </p>
          <div className="relative">
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="pl-10 focus-visible:ring-1 focus-visible:border-0"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 bg-orange hover:bg-hoverOrange"
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Changing ...
              </div>
            ) : (
              "Change Password"
            )}
          </Button>
          <span>
            Back to{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
