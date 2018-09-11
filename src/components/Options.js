import React from 'react';

const Options = (props) => {
    const { users } = props;
    return (
        users.map(function(user){
            return <option key={user.id}>{user.name}</option>
        })
    )
}

export default Options;