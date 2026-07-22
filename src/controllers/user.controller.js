import { asyncHandler } from '../utils/asynchandlar.js'
import ApiError from '../utils/apiError.js'
import  { User } from  "../models/user.model.js"
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler( async  (req, res) => {
    res.status(200).json({
        message  : "ok"
    })

    const { fullname , password , email , username,} = req.body

    console.log("email : ",  email);

    // if(fullname === ""){
    //      throw new apiError(400,"fullname is needed")
    // }

    if ( 
        [fullname, password, email , username ].some(()=>
            feild?.trim() === ""
        )
    ) {
        throw new apiError(404,)
    }

    const existedUser = User.findOne({
        $or: [{ username },{ email }]
    })

    // console.log(existedUser);

    if(existedUser){
        throw new apiError(409,"user email or username already exist")
    }
    

    const avatarLocalPath = res.files?.avatar[0]?.path;
    const coverImageLocalPath = res.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(404,"avater is require")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(404,"avater is require")
        
    } 

    const user = await User.create({
        fullname,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password ,
        username : username.toLowerCase() 
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken "
    )

    if (!createdUser) {
        throw new ApiError(500, " User is not Created ")
    }

    return res.status(201).json(
        new ApiResponse(201,createUser, " Users Registered SuccessFully ")
    )
})

export {registerUser}

