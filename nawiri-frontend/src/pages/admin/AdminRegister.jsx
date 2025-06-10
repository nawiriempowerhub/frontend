// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button } from '../../components/ui/Button';
// import { Card, CardContent } from '../../components/ui/Card';
// import AuthLayout from '../../components/auth/AuthLayout';
// import { Eye, EyeOff, Check, X, Shield } from 'lucide-react';

// const AdminRegister = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     department: '',
//     registrationCode: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();

//   const departmentOptions = [
//     'Executive Management',
//     'Program Management',
//     'Community Outreach',
//     'Finance & Administration',
//     'Media & Communications',
//     'Volunteer Coordination',
//     'Event Management',
//     'IT & Technology'
//   ];

//   const passwordRequirements = [
//     { test: (pwd) => pwd.length >= 8, text: 'At least 8 characters' },
//     { test: (pwd) => /[A-Z]/.test(pwd), text: 'One uppercase letter' },
//     { test: (pwd) => /[a-z]/.test(pwd), text: 'One lowercase letter' },
//     { test: (pwd) => /\d/.test(pwd), text: 'One number' },
//     { test: (pwd) => /[!@#$%^&*]/.test(pwd), text: 'One special character' }
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return false;
//     }

//     const passwordValid = passwordRequirements.every(req => req.test(formData.password));
//     if (!passwordValid) {
//       setError('Password does not meet security requirements');
//       return false;
//     }

//     if (!formData.registrationCode) {
//       setError('Registration code is required for admin access');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       // Mock admin registration for development
//       // In production, this would validate the registration code and create admin account
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Mock successful registration
//       const mockAdmin = {
//         id: Date.now(),
//         email: formData.email,
//         name: formData.name,
//         role: 'admin',
//         department: formData.department
//       };
      
//       const mockToken = 'mock-admin-token-' + Date.now();
      
//       localStorage.setItem('adminToken', mockToken);
//       localStorage.setItem('adminUser', JSON.stringify(mockAdmin));
      
//       // Redirect to admin dashboard
//       navigate('/admin/dashboard');
//     } catch (error) {
//       setError('Registration failed. Please try again.');
//     }
    
//     setLoading(false);
//   };

//   return (
//     <AuthLayout 
//       title="Admin Registration" 
//       subtitle="Create your administrator account"
//     >
//       <Card>
//         <CardContent className="p-6">
//           <div className="flex items-center justify-center mb-6">
//             <div className="flex items-center space-x-2 text-orange-600">
//               <Shield className="h-5 w-5" />
//               <span className="text-sm font-medium">Secure Admin Access</span>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-md p-4">
//                 <p className="text-red-600 text-sm">{error}</p>
//               </div>
//             )}

//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name *
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 placeholder="Enter your full name"
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Official Email Address *
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 placeholder="Enter your official email"
//               />
//             </div>

//             <div>
//               <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
//                 Department/Role *
//               </label>
//               <select
//                 id="department"
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               >
//                 <option value="">Select your department</option>
//                 {departmentOptions.map((dept) => (
//                   <option key={dept} value={dept}>{dept}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label htmlFor="registrationCode" className="block text-sm font-medium text-gray-700 mb-2">
//                 Registration Code *
//               </label>
//               <input
//                 type="text"
//                 id="registrationCode"
//                 name="registrationCode"
//                 value={formData.registrationCode}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 placeholder="Enter admin registration code"
//               />
//               <p className="mt-1 text-xs text-gray-500">
//                 Contact your system administrator for the registration code
//               </p>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 Password *
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                   placeholder="Create a secure password"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4 text-gray-400" />
//                   ) : (
//                     <Eye className="h-4 w-4 text-gray-400" />
//                   )}
//                 </button>
//               </div>
              
//               {formData.password && (
//                 <div className="mt-2 space-y-1">
//                   {passwordRequirements.map((req, index) => (
//                     <div key={index} className="flex items-center text-xs">
//                       {req.test(formData.password) ? (
//                         <Check className="h-3 w-3 text-green-500 mr-1" />
//                       ) : (
//                         <X className="h-3 w-3 text-red-500 mr-1" />
//                       )}
//                       <span className={req.test(formData.password) ? 'text-green-600' : 'text-red-600'}>
//                         {req.text}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                 Confirm Password *
//               </label>
//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                   placeholder="Confirm your password"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="h-4 w-4 text-gray-400" />
//                   ) : (
//                     <Eye className="h-4 w-4 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//               {formData.confirmPassword && formData.password !== formData.confirmPassword && (
//                 <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
//               )}
//             </div>

//             <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
//               <div className="flex">
//                 <Shield className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
//                 <div>
//                   <h4 className="text-sm font-medium text-yellow-800">Security Notice</h4>
//                   <p className="text-xs text-yellow-700 mt-1">
//                     Admin accounts have elevated privileges. Your registration will be reviewed before activation.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center">
//               <input
//                 id="adminTerms"
//                 name="adminTerms"
//                 type="checkbox"
//                 required
//                 className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
//               />
//               <label htmlFor="adminTerms" className="ml-2 block text-sm text-gray-900">
//                 I agree to the{' '}
//                 <Link to="/admin-terms" className="text-primary hover:text-primary/80">
//                   Administrator Terms
//                 </Link>{' '}
//                 and{' '}
//                 <Link to="/admin-policy" className="text-primary hover:text-primary/80">
//                   Security Policy
//                 </Link>
//               </label>
//             </div>

//             <Button type="submit" disabled={loading} className="w-full">
//               {loading ? 'Creating Admin Account...' : 'Create Admin Account'}
//             </Button>

//             <div className="text-center">
//               <p className="text-sm text-gray-600">
//                 Already have an admin account?{' '}
//                 <Link to="/admin/login" className="font-medium text-primary hover:text-primary/80">
//                   Sign in here
//                 </Link>
//               </p>
//             </div>

//             <div className="text-center">
//               <p className="text-xs text-gray-500">
//                 Demo: Use any registration code to create admin account
//               </p>
//             </div>
//           </form>
//         </CardContent>
//       </Card>

//       <div className="text-center">
//         <Link to="/admin/login" className="text-sm text-gray-600 hover:text-gray-900">
//           ← Back to admin login
//         </Link>
//       </div>
//     </AuthLayout>
//   );
// };

// export default AdminRegister;

