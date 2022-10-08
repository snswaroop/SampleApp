import axios from "axios";

export default axios.create({
    baseURL: 'http://ec2-50-18-134-201.us-west-1.compute.amazonaws.com/MLACore/api',
});
