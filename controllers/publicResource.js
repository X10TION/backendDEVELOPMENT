const publicResource =  require('../model/public')
//////////////////// ???SINGLE??? ////////////////////////////
const created = async (req,res) =>{
    const {title, department, school, description, createdBy } = req.body
    const publicArea = new publicResource({
        title, 
        department,
        school,
        description,
        createdBy,
        
    })
    if(req.file){
        publicArea.attach = req.file.path
    }
    try{
        await publicArea.save()
    }catch(err){
        console.log(err)
    }
    return res.status(201).json({
        msg:"Congratulation.. Thank you for your contribution",
        publicArea
    })
}
/////////////////////////???? VIEW RESOURCE ?????///////////////////////////////////
const viewed = (req,res) =>{
    publicResource.find().limit(40).sort({createAt: 1}).exec((err, posts) =>{
        if(err) console.log(err);
        res.json(posts)
    })
}
//////////////////////??????SINGLE RESOURCE ?????/////////////////
const single = (req, res) => {
        const { id } = req.params
        console.log(req.params.id)
        publicResource.findOne({_id:id})
          .exec((err, publicResource) =>{
            if(err) console.log(err);
            res.json(publicResource)
})
}
///////////////////?????EDITED??????///////////////////////////////
const edited = (req, res) =>{
    const { id } = req.params;
    const { title, description, department, school} = req.body;
    publicResource.findOneAndUpdate({_id:id }, { title, description, department, school},{new: true})
    .exec((err,publicResource) => {
        if(err) console.log(err)
        res.json(publicResource)
    })
}
//////////////////?????? DELETED ???????/////////////////////////////////
const deleted = (req, res) => {
    const { id } = req.params
    // console.log(req.params._id)
    publicResource.findOneAndRemove({_id:id})
    .exec((err, publicResource) =>{
        if(err) console.log(err);
        res.json({
            msg: "Oop! resource has been move to the trash!!"
        })
    })
}
////////////////////?????FILTER ????????///////////////////////////////
const filtered = (req, res) => {
    const { department} = req.params
    publicResource.find({department})
          .exec((err, posts) =>{
            if(err) console.log(err);
            res.json(posts)
})
}
/////////////////////??????? EXPORTED ??????////////////////////////////////////
exports.created = created
exports.viewed = viewed
exports.filtered = filtered
exports.edited = edited
exports.deleted = deleted
exports.single = single