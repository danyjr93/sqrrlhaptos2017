import axios from 'axios';

class Api {
    constructor() {
      this.baseUrl =  "http://107.170.210.182:3000/api";
      this.instance = axios.create({
        baseURL: "http://107.170.210.182:3000/api",
        timeout: 360000
      });
    }

    getLocations(){
      return this.instance.get("locations");
    }
}

export default new Api();
