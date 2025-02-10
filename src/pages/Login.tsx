import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { authenticateUser, AuthState } from "@/lib/auth";
import { Label } from "@/components/ui/label";

interface LoginProps {
  setAuthState: (state: AuthState) => void;
}

const Login = ({ setAuthState }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const authState = authenticateUser(email, password);
      setAuthState(authState);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password Reset",
      description: "Please Reset Your Password in the RTB TVET Management Platform and come back here with your new credentials",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1d5fad] p-4">
      <Card className="w-full max-w-md animate-fadeIn">
        <CardHeader className="space-y-4 flex flex-col items-center justify-center">
          <img 
            src="https://tvetmanagement.rtb.gov.rw/assets/logo-e1ac7bbe.png" 
            alt="RTB Logo" 
            className="h-20 w-auto"
          />
          <h2 className="text-2xl font-bold text-[#1d5fad]">LOGIN</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#1d5fad] hover:bg-[#1d5fad]/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={handleForgotPassword}
              className="w-full text-sm text-[#1d5fad] hover:text-[#1d5fad]/90"
            >
              Forgot Password?
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;