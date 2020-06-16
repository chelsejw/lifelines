import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link, useLocation} from 'react-router-dom'
const UserProfile = (props) => {
    let location = useLocation();
    let userId = location.pathname.slice(7)
    const [user, setUser] = useState({
        user: {},
        profile: {
            display_name: "",
            img_url:"",
            bio: "",
            account_type: "",
            address: ""
        }
    })


    useEffect(()=> {
        axios
          .get(`/api/v1/users/${userId}`)
          .then((res) => setUser(res.data))
          .catch((err) => console.log(err));
    }, [location])

    return (
      <div className="container">
        <div className="row">
          <h3>{user.profile.display_name}</h3>
          <div>
              <img className="img-fluid" src={user.profile.img_url}/>
          </div>
          <p>{user.profile.bio}</p>
          <p>
            {user.profile.account_type == "clinic" && user.profile.address}
          </p>
        </div>
      </div>
    );

}

export default UserProfile