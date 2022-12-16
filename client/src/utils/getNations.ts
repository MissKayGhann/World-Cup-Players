import { NationInfo } from "../types/";
import constants from "./constants";

const getNations = async (nation?: string): Promise<NationInfo[]> => {
    const res = await fetch(`${constants.BASE_URL}teams/${nation ? nation : ""}/`);
    const data = await res.json();
    return data;
};

export default getNations;
