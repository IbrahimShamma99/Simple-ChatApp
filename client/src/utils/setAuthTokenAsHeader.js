import axios from "axios";

const setAuthTokenAsHeader = token => {
    if(token){
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    }else{
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthTokenAsHeader;