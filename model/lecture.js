const mongoose = require('mongoose')
const { ObjectId} = mongoose.Schema

const lectureSchema = new mongoose.Schema({
    lecturename:{
        type:String
    },
    reg:{
        type: String
    },
    courseTitle:{
        type: String,
        unique: true,
        min: 7,
        max: 2000
    },
    lecturename:{
        type:String
    },
    reg:{
        type: String
    },
    slug:{
        type: String,
        unique: true,
        min: 7,
        max: 2000
    },
    courseCode:{
        type:String
    },
    school:{
        type:String,
        min:3,
        max:60
    },
    department:{
        type:String,
        min:4,
    },
    fixedlecturetime:{
        type: Date,
    },
    studentList:{
        student:{
            type:String,
        },
        department:{
            type:String
        },
        reg:{
            type:String
        },
    },

    classtype:{
        type: String,
        default: "public"
    },
    createSingleLecture:{
        title:{
            type:String
        },
        description:{
            type:String
        },
    },


},{
    timestamps: true
})

module.exports = mongoose.model('Lecture', lectureSchema)