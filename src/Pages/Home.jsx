import React from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Pages/Home.css'
import { Modal } from 'react-bootstrap';
import { MessageSquarePlus } from 'lucide-react';

const Home = () => {
  const [post, setPosts] = useState([]);
  const[showAddComment,setShowAddComment]=useState(false)
  const[comments,setComments]=useState('')
  const [activePostId, setActivePostId] = useState(null); 
  const [sharePostId, setSharePostId] = useState(null);
  const [likedPosts, setLikedPosts] = useState(() => {
  const storedLikes = localStorage.getItem('likedPosts');
  return storedLikes ? JSON.parse(storedLikes) : [];
  });
  const [commentPosts, setcommentPosts] = useState(() => {
  const storedcomment = localStorage.getItem('commentPosts');
  return storedcomment ? JSON.parse(storedcomment) : [];
  });
  const [followposts, setfollowPosts] = useState(() => {
  const storedfollow = localStorage.getItem('followPosts');
  return storedfollow ? JSON.parse(storedfollow) : [];
  });
  
      const fetchPost= ()=>{
      axios.get("https://reactecomapi.onrender.com/post/allpost").then((response)=>{
      console.log(response.data)
      setPosts(response.data)
      }).catch((error)=>{
      console.log(error)
      })
    }
      useEffect(() => {
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      }, [likedPosts]);

      useEffect(() => {
      localStorage.setItem('followPosts', JSON.stringify(followposts));
      }, [followposts]);

      const clicklike=(postId)=>{   
      setLikedPosts((prev) =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]);
      const userId=localStorage.getItem("userId")
      axios.put(`https://reactecomapi.onrender.com/post/like/${postId}`,{userId}).then((response)=>{
      console.log(response)
      const updatedPosts = post.map((p) => {
        if (p._id === postId) {
          const alreadyLiked = p.likes.includes(userId);
          const updatedLikes = alreadyLiked ? p.likes.filter((id) => id !== userId) : [...p.likes, userId]; 
          return {...p,likes: updatedLikes,};
        }
        return p;
        });
        setPosts(updatedPosts);
        }).catch((error)=>{
          console.log(error)
        })
    }

      const handlechange=(postId,e)=>{
      setComments({...comments,[postId]:e.target.value });
      setActivePostId(postId);
    };
      useEffect(() => {
      localStorage.setItem('commentPosts', JSON.stringify(commentPosts));
      }, [commentPosts]);

       const comment=(postId)=>{
       const username=localStorage.getItem("username")
       setcommentPosts((prev) =>
       prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]);
       const id=localStorage.getItem("userId")
       const text=comments[postId]
       axios.post(`https://reactecomapi.onrender.com/post/comment/${postId}`,{id,text,username}).then((response)=>{
       console.log(response)
       setShowAddComment(false) 
       setActivePostId(null)
        }).catch((error)=>{
          console.log(error)
        })
    }
        useEffect(()=>{
        fetchPost()
      },[]) 

       const followUser=(id)=>{
       setfollowPosts((prev) =>
       prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]);
       const currentUserId=localStorage.getItem("userId")
       axios.put(`https://reactecomapi.onrender.com/post/user/${id}/follow`,{ currentUserId}).then((response)=>{
       console.log(response)
       }).catch((error)=>{
          console.log(error)
       })
       axios.put(`https://reactecomapi.onrender.com/post/user/${id}/unfollow`,{currentUserId}).then((response)=>{
       console.log(response)
       }).catch((error)=>{
       console.log(error)
       })
    } 

      const deletecmt=(postId,commentId)=>{
      const userId = localStorage.getItem("userId");
        console.log("UserId:", userId);
        console.log("postId:", postId);
        console.log("commentId:", commentId);
      axios.delete(`https://reactecomapi.onrender.com/post/ourcomment/${postId}/${commentId}`,{data:{userId}}).then((response)=>{
        console.log(response)
      //   const updatedPosts = post.map((post) => {
      //   if (post._id === postId) {
      //     const updatedComments = post.comments.filter((comment) => comment._id !== commentId);
      //     return {...post,comments: updatedComments,};
      //   }
      //   return post;
      // });
      // setPosts(updatedPosts);         
      setShowAddComment(null); 
      }).catch((error)=>{
        console.log(error)
      })
    }
       
  return (
    <>
      <Navbar  />
      <div className="container-fluid ">
        <div className="row"  style={{backgroundColor:' rgb(193, 190, 255)'}}>
          <Sidebar  />
          <div className="col-md-8 margin">
      {post.map((items,index)=>(
        <div>
          <div key={items._id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2 ">
                  {items.userId?.profilePic ? (
                  <img src={items.userId.profilePic} className="rounded-circle me-2" style={{ width: '40px', height: '40px', objectFit: 'cover' }} alt="Profile"/>
                ) : (
                  <div className="bg-secondary text-white rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', fontWeight: 'bold', fontSize: '1rem' }}>
                    {items.userId?.username?.charAt(0).toUpperCase()}
                  </div>
                )}
                <strong>{items.userId.username}</strong>{<br></br>}
                <button className="flow-button mt-2"  onClick={()=>followUser(items.userId._id)}> {followposts.includes(items.userId._id) ? "following" : "follow"}</button>
                {new Date(items.updatedAt).toLocaleString()}
                </div>
                  <p className="card-text"> {items.text=="undefined"?"":items.text}</p>
                  {items.image && items.image.length > 0 && (
                    <img src={items.image} alt="Post" className="img-fluid rounded" style={{width:'200px',height:'150px'}}/>
                  )}{<br></br>}
                 <div className="d-flex gap-3 mt-3">
                  <button className="btn btn-sm btn-outline-primary" onClick={()=>clicklike(items._id)}  style={{ maxHeight: '45px', maxWidth: '100px' }}>{items.likes.length>0 && items.likes.length} {likedPosts.includes(items._id) ? "❤️Liked" : "❤️ Like"}</button>
                  <button className="btn btn-sm btn-outline-secondary"  onClick={()=>setShowAddComment(index)} style={{ maxHeight: '45px', maxWidth: '140px' }} >{items.comments?.length || 0}💬 {commentPosts.includes(items._id) ? "comment" : "comment"}</button>
                  {showAddComment === index&& (
                    <div key={index}>
                    {activePostId === items._id }
                    <input type='text' value={comments[items._id] || ""} placeholder="Write comment..." onChange={(e) => handlechange(items._id, e)}/>
                   <>
                    <button className="btn"  onClick={()=>comment(items._id)} ><MessageSquarePlus size={20}/></button>
                   </>
                   {items.comments && items.comments.length > 0 && (
                    <div className="card mt-3">
                      <div className="card-header">
                        <strong>{items.comments.length >0 &&items.comments.length} 💬Comments</strong>
                      </div>
                      <div className="card-body p-2">
                        {items.comments.map((comment, index) => (
                          <div key={comment._id || index} className="border-bottom mb-2 pb-1" style={{ fontSize: '0.9rem' }}>
                            <button onClick={() => deletecmt(items._id, comment._id)} style={{color: 'red'}}><MdDelete size={20} /></button>
                            {comment.username}: {comment.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                   </div>
                  )}
                <button className="btn btn-sm btn-outline-success" style={{ maxHeight: '45px', maxWidth: '100px' }} onClick={() => setSharePostId(items._id)}>🔄 Share</button>
               {sharePostId === items._id && (
                <div className="modal show " show={sharePostId === post.id} style={{ display: 'block', position: 'initial',marginLeft:'70px',width:'170px' }}>
                <Modal.Dialog >
                  <Modal.Body >
                    <div style={{ display: 'flex', flexDirection: 'row',gap:'20px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#25D366" className="bi bi-whatsapp" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#E1306C" className="bi bi-instagram" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#3b5998" className="bi bi-facebook" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                    </svg>
                    </div>
                  </Modal.Body>
                </Modal.Dialog>
              </div>
              )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
    </>
  );
};
export default Home;
