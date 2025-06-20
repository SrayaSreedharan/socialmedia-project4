import React from 'react';
import '../Components/Explore.css';
import profile1 from '../images/story1.jpg';
import profile2 from '../images/story2.jpg';
import profile3 from '../images/story3.jpg';
import profile4 from '../images/story5.jpg';
import profile5 from '../images/story6.jpg';
import profile6 from '../images/story7.png';

const users = [
  { name: 'John Doe', img: profile1 },
  { name: 'Smith_123', img: profile2 },
  { name: 'Mari_21ya' },
  { name: 'Davis', img: profile4 },
  { name: 'Leon' },
  { name: 'Nina Patel', img: profile6 },
  { name: 'rahmath' , img: profile5}, 
  { name: 'Jishnu_k_k' } ,
  { name: 'Sreelakshmi', img: profile3 }, 
  { name: 'Daniel ', img: profile5 },
  { name: 'Avanthika_09' },
  { name: 'Ava Wilson', img: profile6 },
  { name: 'unnima_yas' },
  { name: 'Avaniii' },
];

const Explore = () => {
  return (
    <div className='sidebar-profile card shadow-sm p-3 mb-4 bg-white rounded '>
    <div className="explore-containers ">
    {users.map((user, index) => (
  <div className="explore-cards mt-6 " key={index}>
    <div className="explore-top">
      <div className="explore-img">
       {user.img ? (
                  <img src={user.img} className="rounded-circle me-2" />
                ) : (
                  <div className="bg-secondary text-white rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', fontWeight: 'bold', fontSize: '1rem' }}>
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
      </div>
      <div className="explore-info">
        <strong>{user.name}</strong>
      </div>
    </div>
    <button className="follow-btns">Follow</button>
  </div>
))}
</div>
</div>
  )
}
export default Explore;
