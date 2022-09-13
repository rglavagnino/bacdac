import mongoose, * as moongoose from 'mongoose'

export const versionSchema = new mongoose.Schema({
    version : {
        type:String
       , required: true
    },
    descripcion: String,
    alias: String,
    numero: Number
}, {collection:'versiones'})

export interface Version extends moongoose.Document {

  version : string,
         descripcion:string,
         alias:string,
         numero:number 

}