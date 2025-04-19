import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
};

const userSchema = new Schema<IUser>(
    {
        username: { 
            type: String, 
            unique: true, 
            required: true, 
            trim: true 
        },
        email: { 
            type: String, 
            unique: true, 
            required: true, 
            validate: {
                validator: function(v) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(v);
                },
                message: 'Please enter a valid email'
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            },
       ],
       friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
       ]
    }, 
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length
    });

const User = model('user', userSchema);

export default User;