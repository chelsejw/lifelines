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
      <div className="container w-75 mx-auto">
        <div className="py-4 text-center">
          <div>
            <img className="img-fluid" src={user.profile.img_url} />
          </div>

          <h3 className="mt-4">
            {user.profile.display_name}{" "}
            {user.profile.verified && (
              <i class="fas fa-user-check text-success"></i>
            )}
          </h3>
          <p>{user.profile.bio}</p>
          {user.profile.account_type == "clinic" && (
            <p>
              <i className="fas fa-clinic-medical mr-2 text-secondary"></i>{" "}
              {user.profile.address}
            </p>
          )}

        </div>
      </div>
    );

}

export default UserProfile