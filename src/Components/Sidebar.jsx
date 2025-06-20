import React from 'react';

const Sidebar = () => (
  <div className="col-md-3 mb-4">
    <div className="list-group shadow-sm">
      <a href="/home" className="list-group-item list-group-item-action active mt-3">🏠 Home</a>
      <a href="/explore" className="list-group-item list-group-item-action">🔍 Explore</a>
      <a href="#" className="list-group-item list-group-item-action">💬 Messages</a>
      <a href="/sidebarprofile" className="list-group-item list-group-item-action">👤 Profile</a>
    </div>
  </div>
);
export default Sidebar;
