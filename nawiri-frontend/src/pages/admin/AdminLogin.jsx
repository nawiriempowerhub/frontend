// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import { useAdminAuth } from '../../context/AdminAuthContext';
// import { Button } from '../../components/ui/Button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';

// const AdminLogin = () => {
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const { login } = useAdminAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     const result = await login(credentials);
    
//     if (result.success) {
//       navigate('/admin/dashboard');
//     } else {
//       setError(result.error || 'Login failed');
//     }
    
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
//             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Sign in to access the admin dashboard
//           </p>
//         </div>

//         <Card>
//           <CardContent className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-md p-4">
//                   <p className="text-red-600 text-sm">{error}</p>
//                 </div>
//               )}

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={credentials.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                   placeholder="Enter your email"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={credentials.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                   placeholder="Enter your password"
//                 />
//               </div>

//               <Button type="submit" disabled={loading} className="w-full">
//                 {loading ? 'Signing in...' : 'Sign In'}
//               </Button>

//               <div className="text-center">
//                 <p className="text-sm text-gray-600">
//                   Need to create an admin account?{' '}
//                   <Link to="/admin/register" className="font-medium text-primary hover:text-primary/80">
//                     Register here
//                   </Link>
//                 </p>
//               </div>

//               <div className="text-center">
//                 <p className="text-xs text-gray-500">
//                   Demo: Use any email and password to login
//                 </p>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

