import React,{useEffect,useState,useRef} from 'react'
import { add_comment } from '../../api/addcomment'
import { getallcomment } from '../../api/getallcomments'

const Comment = (props) => {
   let user_id=3
   useEffect(() => {
    loadcomments()
   }, [])

   const inputRef = useRef(null);
 
 
  
   const [comments, setcomments] = useState([])
   const [tags, settags] = useState([])
   const loadcomments=async()=>{
      let data=await getallcomment(props.post_id)
      if (data.status===200){
      setcomments(data.data)
      }
      
   }
   
   const addcomment=async()=>{
    let data=await add_comment(inputRef.current.value,props.post_id,user_id)
    if (data.status===200){
        inputRef.current.value=""
        loadcomments()
    }
   }
       return (
   <div>
    <div className='h-20 overflow-y-auto'>{
      comments.map((element)=>{
        return <div className='px-2 mx-2' key={element[0]}>
           {element[3]}
        </div>
      })
    }</div>
    <div className='flex m-5 '>
      
        <input type="text" className='p-2 z-20 rounded' ref={inputRef} name='comment'  placeholder="Add a comment" />
        <button onClick={addcomment} className='p-2 mx-2'><i class="fa-solid fa-paper-plane"></i></button>
    </div></div>
  )
}

export default Comment