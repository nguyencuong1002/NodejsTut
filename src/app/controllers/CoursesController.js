const Course = require('../models/Course');

require('dotenv').config();
const cloudinary = require('cloudinary');
require('../middlewares/cloudinary');

//import multiple Mongoose Object
const {multipleMongooseToObject, mongooseToObject} = require('../../utils/mongoose');
class CoursesController{

    // [GET] /courses/:slug
    show(req, res, next){
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', { course: mongooseToObject(course) })
            })
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next){
        res.render('courses/create');
    }

    // [POST] /courses/store
    async store(req, res, next){
        //const formData = {...req.body};
        //formData.thumbnail = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
        //const course = new Course(formData);
        // course.save()
        //     .then(() => res.redirect('/me/stored/courses'))
        //     .catch( error => {
                
        //     });
        const result =  await cloudinary.v2.uploader.upload(req.file.path);
        const course = new Course(req.body);
        course.thumbnail = result.secure_url;
        await course.save();

        res.redirect('/');
        
    }

    // [GET] /courses/:id/edit
    edit(req, res, next){
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', { 
                course: mongooseToObject(course)
            }))
            .catch(next);
    }

    //[PUT] /courses/:id
    update(req, res, next){
        Course.updateOne({_id: req.params.id}, req.body)
            .then( () => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE] /courses/:id
    delete(req, res, next){
        Course.delete({_id: req.params.id})
            .then( () => res.redirect('back'))
            .catch(next);
    }

     //[FORCE DELETE] /courses/:id/force
     forceDelete(req, res, next){
        Course.deleteOne({_id: req.params.id})
            .then( () => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next){
        Course.restore({_id: req.params.id})
            .then( () => res.redirect('back'))
            .catch(next);
    }

    //[POST] /courses/handle-form-action
    handleFormAction(req, res, next){
        switch(req.body.action){
            case 'delete':
                Course.delete({_id: { $in: req.body.courseIDs} })
                    .then( () => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message: "Action invalid!!"});
        };
    }
}

module.exports = new CoursesController();