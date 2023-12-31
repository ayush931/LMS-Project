import { Router } from "express";
import { addLectureToCourseById, createCourse, getAllCourses, getLecturesByCourseId, removeCourse, updateCourse } from "../controllers/course.controller.js";
import { authorizeSubscriber, authorizedRole, isLoggedIn } from "../middlewares/auth.middleware.js";
import uplaod from "../middlewares/multer.middleware.js";

const router = Router()

router.route('/')
    .get( getAllCourses)
    .post(
        isLoggedIn,
        authorizedRole('ADMIN'),
        uplaod.single('thumbnail'),
        createCourse
    )

router.route('/:id')
    .get(isLoggedIn, authorizeSubscriber, getLecturesByCourseId)
    .put(
        isLoggedIn,
        authorizedRole('ADMIN'),
        updateCourse
    )
    .delete(
        isLoggedIn,
        authorizedRole('ADMIN'),
        removeCourse
    )
    .post (
        isLoggedIn,
        authorizedRole('ADMIN'),
        uplaod.single('lecture'),
        addLectureToCourseById
    )

export default router