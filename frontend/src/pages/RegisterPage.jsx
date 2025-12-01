import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register attempt:', formData);
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Hesap Oluşturun</h1>
          <p className="text-gray-500 text-sm">
            LGS 2026 tahminleriyle başarınızı garantileyin.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 block">
              Ad Soyad
            </label>
            <input
              type="text"
              placeholder="Ahmet Yılmaz"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-600 placeholder:text-gray-400"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 block">
              E-posta Adresi
            </label>
            <input
              type="email"
              placeholder="ornek@email.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-600 placeholder:text-gray-400"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 block">
              Şifre
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="En az 6 karakter"
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

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 py-2">
            <input 
              id="terms" 
              type="checkbox" 
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-500">
              <a href="#" className="text-blue-600 hover:underline">Kullanım Koşulları</a>'nı ve <a href="#" className="text-blue-600 hover:underline">Gizlilik Politikası</a>'nı okudum, kabul ediyorum.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm hover:shadow-md"
          >
            Kayıt Ol
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600 mt-6">
            Zaten hesabın var mı?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
              Giriş Yap
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

