import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivatePages = () => {
    const user = useSelector((state) => state?.user);

    if (user) {
        return <Outlet />;
    } else {
        return <Navigate to='/signin' replace />;
    }
}

export default PrivatePages;