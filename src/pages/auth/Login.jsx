import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@quiphr.com" && password === "12345678") {
      localStorage.setItem(
        "superadmin_auth",
        JSON.stringify({
          name: "Super Admin",
          email: "admin@quiphr.com",
        })
      );

      navigate("/clients", { replace: true });
    } else {
      setError("You have entered wrong password/email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">

        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-brand">
            Admin Login
          </h2>
          <p className="text-sm text-brand mt-1">
            Welcome back 👋 Please login to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className={`w-full rounded-lg border px-4 py-2.5 transition focus:outline-none focus:ring-2
                ${error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#1b6983]"
                }`}
            />

            {error && (
              <p className="text-red-500 text-xs mt-2">{error}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className={`w-full rounded-lg border px-4 py-2.5 pr-10 transition focus:outline-none focus:ring-2
                  ${error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#1b6983]"
                  }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={!email || !password}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200
              ${!email || !password
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#1b6983] text-white hover:bg-[#15596e] shadow-md hover:shadow-lg"
              }`}
          >
            Login Now
          </button>
        </form>
      </div>
    </div>
  );
}
