
import { URL, DEFAULT_PAGE_SIZE, DEFAULT_KEYWORD } from "./Constants";
import axios from "axios";

export const getVersions = async (PARAM, next) => {
    const { KEYWORD, SIZE, FROM } = PARAM;
    const {data} = await axios.get(`${URL}/search?text=${KEYWORD || DEFAULT_KEYWORD}&size=${SIZE || DEFAULT_PAGE_SIZE}&from=${FROM || 0}`);
    return next(data)
}