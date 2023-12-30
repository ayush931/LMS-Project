import { model, Schema } from "mongoose";

const courseSchema = new Schema ({
    title: {
        type: String,
        require: [true, 'Title is required'],
        minLength: [8, 'Title must be atleast 8 characters'],
        maxLength: [59, 'Title should be less than 60 characters'],
        trim: true
    },
    description: {
        type: String,
        require: [true, 'Description is required'],
        minLength: [8, 'Description must be atleast 8 characters'],
        maxLength: [200, 'Description should be less than 200 characters']
    },
    category: {
        type: String,
        require: [true, 'Category is required']
    },
    thumbnail: {
        public_id: {
            type: String,
            require: true
        },
        secure_url: {
            type: String,
            require: true
        }
    },
    lectures: [
        {
            title: String,
            description: String,
            lecture: {
                public_id: {
                    type: String,
                    require: true
                },
                secure_url: {
                    type: String,
                    require: true
                }
            }
        }
    ], 
    numbersOfLectures: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

const Course = model('Course', courseSchema)

export default Course