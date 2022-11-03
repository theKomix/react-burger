import { Navigate, useLocation } from 'react-router';
import { useAppSelector } from "../hooks";
import { selectStatus, selectUser } from "../services/user/user-slice";

type ProtectedRouteProps = {
    outlet: JSX.Element;
    anonymous?: boolean;
};

export default function ProtectedRoute({outlet, anonymous = false}: ProtectedRouteProps) {
    const location = useLocation();
    const user = useAppSelector(selectUser);
    const status = useAppSelector(selectStatus);

    const from = location.state?.from || '/';

    if(status === "loading"){
        return null;
    }
    if (anonymous && user) {
        return <Navigate to={ from } />;
    }
    if(!anonymous && !user) {
        return <Navigate to="/login" state={{from: location}} />;
    }
    return outlet;
};