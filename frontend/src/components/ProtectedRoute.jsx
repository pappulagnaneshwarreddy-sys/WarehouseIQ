import {Navigate,Outlet} from 'react-router-dom';export default function ProtectedRoute(){return localStorage.getItem('warehouseiq_user')?<Outlet/>:<Navigate to='/login' replace/>}
