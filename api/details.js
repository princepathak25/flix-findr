import {tmdbFetch} from "./config.js";
export default async function handler(req,res){
    try{
        const movieId=req.query.id;
        const data=await tmdbFetch(`/movie/${movieId}`);
        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({
            error:error.message
        });
    }
} 