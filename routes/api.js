const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/videoplayer';
const Video = require('../models/video');

mongoose.connect(db, {
    useNewUrlParser: true
}, err => {
    if (err) {
        throw err;
    } else {
        console.log('Successfully connected to database');

    }
});

// get all Videos HTTP GET
router.route('/videos').get((req,res, next)=>{
    Video.find((err,videos)=>{
        if(err){
            return next(err);
        }else{
            res.json(videos)
        }
    })
})
// get single video HTTP GET-BY-ID

router.route('/videos/:id').get((req, res, next) => {
    console.log('get request for one video');
   Video.findById(req.params.id, (err,video)=>{
       if(err){
        return next(err);
       }else{
           res.json(video)
       }
   })
});

// Create a new video HTTP POST

router.route('/videos').post((req, res, next) => {
    console.log('Posting a Video');
   Video.create(req.body, (err,data)=>{
    if (err) {
        return next(err)
    } else {
        res.json(data);
    }
   })
});

// update current video HTTP PUT
router.route('/videos/:id').put((req, res, next) => {
    console.log('update a video');

    Video.findByIdAndUpdate(req.params.id, 
        {$set: req.body},
        (err,data)=>{
            if(err){
                return next(err);
            }else{
                res.json(data)
            }
        }
    )
});

// delete custom video HTTP DELETE
router.delete('/videos/:id', (req, res, next) => {
    console.log('delete a video');
    Video.findOneAndDelete(req.params.id, (err, deletedVideo)=>{
        if (err) {
            return next(err);
        }else{
            res.status(200).json({
                msg: deletedVideo
            })
        }
    })
    
})

module.exports = router