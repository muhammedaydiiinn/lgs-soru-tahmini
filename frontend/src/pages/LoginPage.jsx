import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, Brain } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the API call to login
    console.log('Login attempt:', formData);
    // For demo purposes, redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-full max-w-md">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="text-blue-600 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Hesabınıza Giriş Yapın</h1>
          <p className="text-gray-500 text-sm">
            LGS 2026 tahmin motoruna erişmek için giriş yapın.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Username/Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 block">
              E-posta veya Kullanıcı Adı
            </label>
            <input
              type="text"
              placeholder="ornek@email.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-600 placeholder:text-gray-400"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 block">
              Şifre
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Şifrenizi girin"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-600 placeholder:text-gray-400"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Şifremi unuttum?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm hover:shadow-md"
          >
            Giriş Yap
          </button>

          {/* Divider (Optional but looks nice) */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center text-sm text-gray-600">
            Hesabın yok mu?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
              Kayıt Ol
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

