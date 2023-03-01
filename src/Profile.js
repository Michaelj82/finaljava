import React from "react";
import { receiveData } from "./firebase";
export default function Profile(){
    const {currentUser, logout} = useAuth()
    const [info, setInfo] = useState({
    })

    useEffect(() => {
        try{
            receiveData(currentUser.email, setInfo)
        }catch(error){
            console.log(error)
        }
    }, [])

    return(
        <div>
            
        </div>
    )
}