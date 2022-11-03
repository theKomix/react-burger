import { Navigate, useLocation } from 'react-router';
import {useAppSelector} from "../hooks";
import {selectUser} from "../services/user/user-slice";

type ProtectedRouteProps = {
    outlet: JSX.Element;
};

export default function ProtectedRoute({outlet}: ProtectedRouteProps) {
    const currentLocation = useLocation();
    const user = useAppSelector(selectUser);

    if(user) {
        return outlet;
    } else {
        return <Navigate to="/login" state={{from: currentLocation}} />;
    }
};