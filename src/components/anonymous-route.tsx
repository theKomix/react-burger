import { Navigate } from 'react-router';
import {useAppSelector} from "../hooks";
import {selectStatus, selectUser} from "../services/user/user-slice";

type ProtectedRouteProps = {
    outlet: JSX.Element;
};

export default function AnonymousRoute({outlet}: ProtectedRouteProps) {
    const user = useAppSelector(selectUser);
    const status = useAppSelector(selectStatus);

    if(status === "loading"){
        return null;
    }
    if(!user) {
        return outlet;
    }
    return <Navigate to="/" replace={true} />
};