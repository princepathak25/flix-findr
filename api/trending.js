import {tmdbFetch} from "./config.js";
export default async function handler(req,res){
    try{
        const data = await tmdbFetch(
            "/trending/movie/week"
        );
        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({
            error:error.message
        });
    }
}