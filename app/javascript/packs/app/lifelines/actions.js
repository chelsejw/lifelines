export function lifelinesFetchDataSuccess(data) {
    return {
        type: 'LIFELINES_FETCH_DATA_SUCCESS',
        data
    };
}

export function fetchLifelineData(appealId) {
    return (dispatch) => {
        console.log(`in fetch lifelines`)
        axios.get(`/api/v1/appeals/${appealId}/get-lifelines`)
            .then((response) => {
                console.log(`got response for lifelines`)
                console.log(response.data)
                dispatch(lifelinesFetchDataSuccess(response.data))
            })
            .catch((err) => {
                console.log(`Alamak got error`)
                console.log(err)
            });
    }
};

export function throwLifelineSuccess(data){
    return {
        type: 'THROW_LIFELINE_SUCCESS',
        data
    }
}

export function throwLifeline(user, appealOwner, appealId){
    return (dispatch)=>{
        const token = document.querySelector("[name=csrf-token]").content;
        axios.defaults.headers.common["X-CSRF-TOKEN"] = token;  
        axios
        .post(`/api/v1/appeals/${appealId}/throw-lifeline`)
        .then(res => {
            console.log(`response received`);
            dispatch(throwLifelineSuccess(res.data))
        })
        .then((res)=>{
            axios.post(`/conversations`, {
                conversation: {
                  lifeline_id: res.data.id,
                  user_ids: [user.id, appealOwner.id]
                }
            })
            .then((res)=>{
              console.log(`was there a response from post to convos`)
              console.log(`res,`, res.data)
            })
            .catch(err => {
              console.log(`error in post request`)
              console.log(err.response)
            })
        
          })
        .catch(err=>console.log(err.response))
    }
}