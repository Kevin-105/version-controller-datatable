
import { URL } from "./Constants";
import axios from "axios";

export const getVersions = async (PARAM, next) => {
    const { KEYWORD, SIZE, FROM } = PARAM;
    const {data} = await axios.get(`${URL}/search?text=${KEYWORD || 'react-table'}&size=${SIZE || 10}&from=${FROM || 0}`);
    return next(data)
}