import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})

userSchema.methods.encryptPassword = async(password: string) => {
    const salt = await bcrypt.genSalt(6)
    return bcrypt.hash(password, salt)
}

userSchema.methods.verifyPassword = async function(password : string){
    return await bcrypt.compare(password, this.password)
}

export default model('User', userSchema)