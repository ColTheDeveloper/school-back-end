const singleModel = require('../../model/singleCatModel');

//UPLOADING SONGS TO THE BACKEND

const uploadSingle=async(req,res)=>{
    console.log(req.body);
    const {musicTitle, artist, music, cover, genre, artistId} = req.body;
    const checkTitle = await singleModel.findOne({musicTitle})
    const checkMusic = await singleModel.findOne({music})
    if(!musicTitle || !artist || !music || !cover || !genre || !artistId){
        return res.json({message: "All fields are required"})
    }else if (checkTitle || checkMusic) {
        return res.send({status:false, message:"This song already exists"}) 
    }else{
        const single = new singleModel({
            musicTitle,
            artist,
            artistId,
            music,
            cover,
            genre
        })
        console.log(single);
        try{
            await single.save();
            res.status(200).json({message: "Song uploaded successfully", single})
        }catch(err){
            res.status(500).json({message: err.message})
        }
    }
    
}

//Getting all songs from the backend

const getAllSongs = async(req,res)=>{
    try{
        const allSongs = await singleModel.find();
        res.status(200).json(allSongs.sort((a,b)=>-1))
    }catch(err){
        res.status(500).json({message: "Cannot get songs check connection"})
    }
}

// get a single song

const getASong=async(req,res)=>{
    const id=req.params.songId
    try {
        const track=await singleModel.findById(id);
        res.status(200).json(track);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}



module.exports = {uploadSingle,getAllSongs, getASong}