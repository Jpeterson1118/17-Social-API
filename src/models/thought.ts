import { Schema, Types, model, Document, ObjectId } from 'mongoose';
import parseDate from '../utils/parseDate.js';

interface IReaction extends Document {
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
    createdAt: {
        Type: Date,
        get: any,
    };
};

interface IThought extends Document {
    thoughtText: string;
    createdAt: {
        type: Date,
        get: any
    }
    username: string;
    reactions: typeof reactionSchema[];
};


const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: parseDate
        }
    },
    {
        toJSON: {
            getters: true
        },
        toObject: {
            getters: true
        }
    }
);


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
            get: parseDate,
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        toObject: {
            getters: true,
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