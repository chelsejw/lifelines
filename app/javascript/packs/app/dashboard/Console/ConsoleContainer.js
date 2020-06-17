import React, { useState, useEffect } from 'react'
import axios from "axios";
import Request from './Request'
const token = document.querySelector("[name=csrf-token]").content;
axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

const ConsoleContainer = (props) => {

    const [requests, setRequests] = useState([])

    const approveRequest = (id) => {

        axios.get(`/api/v1/verifications/${id}/approve`)
        .then(res => {
            console.log(res.data)
            fetchRequests();
        })
        .catch(err => {
            console.log(`ERRRRROR`, err);
        })
    }
    const rejectRequest = (id) => {
        axios
          .get(`/api/v1/verifications/${id}/reject`)
          .then((res) => {
            console.log(res.data);
             fetchRequests();
          })
          .catch((err) => {
            console.log(`ERRRRROR`, err);
          });
    }
    const fetchRequests = ()=> {
        axios.get('/api/v1/verifications')
        .then(res => {
            setRequests(res.data)
        })
        .catch(err => {
            console.log(`ERRRRROR`, err);
        })
    }

    useEffect(()=> {
        fetchRequests();
    }, [])

    const requestElements = requests.map(request=> {
        return <Request approve={approveRequest} reject={rejectRequest} request={request}/>
    })
    

    return (
      <div>
        <h2 className="mb-4">Your Requests</h2>

        {requests.length !== 0 ? (
          requestElements
        ) : (
          <div>
              <h4 className="text-secondary">
                You do not currently have any requests to authorize.{" "}
              </h4>
          </div>
        )}
      </div>
    );
}

export default ConsoleContainer