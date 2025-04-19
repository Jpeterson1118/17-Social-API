import { Schema, model, Document } from 'mongoose';
import parseDate from '../utils/parseDate';
import reaction from './reaction';


interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: typeof reaction[];
};

const ThoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: parseDate
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reaction]
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

ThoughtSchema
    .virtual('reactioCount')
    .get(function () { 
        this.reactions.length
    });


const Thought = model('thought', ThoughtSchema);

export default Thought;