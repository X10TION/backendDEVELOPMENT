const Post  = require('../model/resourceSchema')
const slugify = require('slugify')

exports.create = (req, res) =>{
//    console.log(req.body)
    const { title, description, department, school, category, user, name,comment} = req.body
    const slug = slugify(title)
    // validate 
    switch(true){
        case !title:
            return res.status(400).json({
                msg:"Invalied request please check the form title"
            })
            break;
        case !department:
            return res.status(400).json({
                msg:"Select the department for user to view your resource quickly"
            })
            break;
        case !category:
            return res.status(400).json({
                msg:"Select the category for user to view your resources quickly"
            })
    }
    if(req.file){
        Post.attach = req.file.path
    }
   Post.create({
    title, 
    description,
     department, 
     school, 
     category, 
     user, 
     name,
     comment,
     slug
   },(err, post) =>{
    if(err){
        console.log(err)
        res.status(400).json({
            errors: "Dublicate field try another title"
        })
    }
    res.json(post)
   })
}
// get all resource 
exports.views = (req, res) =>{
    Post.find({}).limit(20).sort({createAt: -1}).exec((err, posts) =>{
        if(err) console.log(err);
        res.json(posts)
    })
}

// get single resource 
exports.view = (req, res) =>{
    const { slug } = req.params
    console.log(req.params.slug)
    Post.findOne({slug})
      .exec((err, posts) =>{
        if(err) console.log(err);
        res.json(posts)
    })
}
// update resource
exports.update = (req, res) =>{
    const { slug } = req.params;
    const { title, description, department, school, category,attach} = req.body;
    Post.findOneAndUpdate({slug}, { title, description, department, school, category, attach},{new: true}).exec((err,post) => {
        if(err) console.log(err)
        res.json(post)
    })
}

// remove resource
// get single resource 
exports.remove = (req, res) =>{
    const { slug } = req.params
    console.log(req.params.slug)
    Post.findOneAndRemove({slug})
      .exec((err, posts) =>{
        if(err) console.log(err);
        res.json({
            msg: "Oop! resource has been move to the trash!!"
        })
    })
}