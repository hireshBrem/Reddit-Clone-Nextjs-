'use server';

import { createClient, SupabaseClient} from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache';

export async function checkUserInDB(_email:string | null | undefined) {
    let userInDB = false
  
    const supabaseUrl = process.env.SUPABASE_URL || ""
    const supabaseKey = process.env.SUPABASE_ANON_KEY || ""

    let supabase = createClient(supabaseUrl, supabaseKey, {auth: {persistSession:false}})

    const {data:users, error} = await supabase
    .from("users")
    .select("*")
    .eq("email", _email)

    if(error) {
        return(error)
    }

    if(_email!=null && _email != undefined) {
        if(users?.length!=0) {
            userInDB=true
        }
    }
    return userInDB
}

export async function addUserToDB(email:string | null | undefined, name: string | null | undefined, photo:string | null | undefined){
    const supabaseUrl = process.env.SUPABASE_URL || ""
    const supabaseKey = process.env.SUPABASE_ANON_KEY || ""

    let supabase = createClient(supabaseUrl, supabaseKey, {auth: {persistSession:false}})

    let { data: users, error } = await supabase
    .from('users')
    .select('*')

    let inDB = await checkUserInDB(email)
    if(inDB===false) {
        const { data, error } = await supabase
        .from('users')
        .insert([
            {email: email, name: name, profile_photo: photo },
        ])
        if(error) {
            return(error)
        }
    }
    revalidatePath("/")
}

export async function getPosts() {
    const supabaseUrl = process.env.SUPABASE_URL || ""
    const supabaseKey = process.env.SUPABASE_ANON_KEY || ""

    let supabase = createClient(supabaseUrl, supabaseKey, {auth: {persistSession:false}})
    
    let { data: posts, error } = await supabase
    .from('posts')
    .select('*')

    if(error) {
        return(error)
    }
    revalidatePath("/")

    return(posts)
}

export async function getUserDetail(user_id:string | null, detail:string) {
    const supabaseUrl = process.env.SUPABASE_URL || ""
    const supabaseKey = process.env.SUPABASE_ANON_KEY || ""

    let supabase = createClient(supabaseUrl, supabaseKey, {auth: {persistSession:false}})
    
    let {data:users, error} = await supabase
    .from("users")
    .select(detail)
    .eq("user_id", user_id)

    if(error){
        return(error)
    }
    if(detail=="name" && users){
        let {name}:any = users[0]
        return(name)
    }
    if(detail=="email" && users){
        let {email}:any = users[0]
        return(email)
    }if(detail=="profile_photo" && users) {
        let {profile_photo}:any = users[0]
        return(profile_photo)
    }

}

export async function getPostDetail(post_id: string | null) {
    const supabaseUrl = process.env.SUPABASE_URL || ""
    const supabaseKey = process.env.SUPABASE_ANON_KEY || ""

    let supabase = createClient(supabaseUrl, supabaseKey, {auth: {persistSession:false}})
    
    let { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq("post_id", post_id)

    if(posts) {
        return(posts[0])
    }

    if(error) {
        return(error)
    }

}

export async function changeVotes(post_id:string| null, votes:number, _vote:string) {
    const supabaseUrl = process.env.SUPABASE_URL || ""
    const supabaseKey = process.env.SUPABASE_ANON_KEY || ""

    let supabase = createClient(supabaseUrl, supabaseKey, {auth: {persistSession:false}})

    if(_vote==="up"){
        votes += 1
                
        const { data, error } = await supabase
        .from('posts')
        .update({ post_votes: votes })
        .eq('post_id', post_id)
        .select()

    }if(_vote==="down"){
        votes -= 1 

        const { data, error } = await supabase
        .from('posts')
        .update({ post_votes: votes })
        .eq('post_id', post_id)
        .select()

    }
    revalidatePath("/")
} 

export async function getComments(post_id:string| null) {
    const supabaseUrl = process.env.SUPABASE_URL || ""
    const supabaseKey = process.env.SUPABASE_ANON_KEY || ""

    let supabase = createClient(supabaseUrl, supabaseKey, {auth: {persistSession:false}})

    let { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .eq("post_id", post_id)

    if(error){
        return(error)
    }
    revalidatePath("/")

    return(comments)
}

export async function addComment(post_id:string| null, content:string| null, email:string| null | undefined) {
    const supabaseUrl = process.env.SUPABASE_URL || ""
    const supabaseKey = process.env.SUPABASE_ANON_KEY || ""

    let supabase = createClient(supabaseUrl, supabaseKey, {auth: {persistSession:false}})
   
    let {data:users, error} = await supabase
    .from("users")
    .select("user_id")
    .eq("email", email)

    let user_id = ""

    if(users) {
        user_id = users[0].user_id
    }

    if(error) {
        return(error)
    }

    let date = new Date()

    _addComment(post_id, content, user_id, date)
    revalidatePath("/")
}

export async function _addComment(post_id:string| null, content:string| null, user_id:string| null | undefined, date: Date) {
    const supabaseUrl = process.env.SUPABASE_URL || ""
    const supabaseKey = process.env.SUPABASE_ANON_KEY || ""

    let supabase = createClient(supabaseUrl, supabaseKey, {auth: {persistSession:false}})

    let { data, error } = await supabase
    .from('comments')
    .insert([
    { post_id: post_id, content: content, date:date, user_id: user_id},
    ])
    .select()
    revalidatePath("/")
}

export async function addPost(action:string, title:string, txt_img: string, email:string | null | undefined) {
    const supabaseUrl = process.env.SUPABASE_URL || ""
    const supabaseKey = process.env.SUPABASE_ANON_KEY || ""

    let id = ""

    let supabase = createClient(supabaseUrl, supabaseKey, {auth: {persistSession:false}})
    
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq("email", email)
        
    if(error) {
        return(error)
    }
    if(data) {
        id = data[0].user_id
    }
    
    if(action==="text" && email!==null && email!==undefined) {
        let date = new Date()

        const { data, error } = await supabase
        .from('posts')
        .insert([
        { post_title: title, post_date: date, user_id: id, post_text: txt_img },
        ])
        .select()

    }
  
    revalidatePath("/")

}