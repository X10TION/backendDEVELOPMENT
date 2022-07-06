const Lecture  = require('../model/lecture')
const slugify = require('slugify')

exports.createLecture = (req, res) =>{
//    console.log(req.body)
    const { courseTitle,lecturename, reg, courseCode, department,classtype,school, fixedlecturetime} = req.body
    const slug = slugify(courseCode)
    // validate 
    switch(true){
        case !courseTitle:
            return res.status(400).json({
                msg:"Invalied request please check the form title"
            })
            break;
        case !courseCode:
            return res.status(400).json({
                msg:"Select the course Code for student to connect to your class"
            })
            break;
        case !department:
            return res.status(400).json({
                msg:"Select the department for student to connect to your class"
            })
            break;
    }
    Lecture.create({
    courseTitle, 
    courseCode,
    department,
    school,
    classtype,
    lecturename,
    reg,
    fixedlecturetime, 
    slug
   },(err, post) =>{
    if(err){
        console.log(err)
        res.status(400).json({
            errors: "Dublicate Lecture title try another title "
        })
    }
    res.json(post)
   })
}
// get all resource 
exports.viewsLecture = (req, res) =>{
    Lecture.find({}).limit(50).sort({createAt: 1}).exec((err, posts) =>{
        if(err) console.log(err);
        res.json(posts)
    })
}

// get single resource 
exports.joinLecture = (req, res) => {
    const { slug } = req.params
    const { student, department, reg } = req.body
    
    Lecture.findOneAndUpdate({slug},{slug}).exec((err,post) => {
            if(err) console.log(err)
            res.json(post)
        })
    
}
// update resource
exports.updateLecture = (req, res) =>{
    const { slug } = req.params;
    const { name,department, reg} = req.body;
    Post.findOneAndUpdate({slug}, { name, department, reg},{new: true}).exec((err,post) => {
        if(err) console.log(err)
        res.json(post)
    })

}

// remove resource
// get single resource 
exports.removeLecture = (req, res) =>{
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