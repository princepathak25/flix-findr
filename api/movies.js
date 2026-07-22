import {tmdbFetch} from "./config.js";
export default async function handler(req,res){
    try{
        const type=req.query.type;
        const endpoints={
            popular:"/movie/popular",
            top_rated:"/movie/top_rated",
            now_playing:"/movie/now_playing"
        };
        if(!endpoints[type]){
            return res.status(400).json({
                error:"Invalid movie type"
            });
        }
        const data=await tmdbFetch(
            endpoints[type]
        );
        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({
            error:error.message
        });
    }
}
