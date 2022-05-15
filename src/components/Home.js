import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import '../styles/Home.css'

import GetData from '../services/services'
import PropTypes from 'prop-types';

/**
 * Returns a list item with some user infos.
 * @param {Object} id - The  ID of the user.
 */
function UserItem({id}) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await GetData("GetUser", id);
            setUser(user);
        }
        fetchUser();
    }, [id])

    if (user === null) {
        return <p>Loading data...</p>
    }

    const userInfos = user.data.userInfos;

    return (
        <li>
        <Link to={`./user/${user.data.id}`}>
            {userInfos.firstName} {userInfos.lastName} (ID #{user.data.id})
        </Link>
        </li>
    );    
}

/**
 * Returns the Default Home Page, including a UserItem
 */
function Home() {

    const ids = [12, 18];
    
    return (
        <div className="Home">
            <h1>Default Home Page</h1>
            <p>Quel profil utilisateur souhaitez-vous consulter ?</p>
            <ul>
                {ids.map(item => <UserItem key={`${item}`} id={item.toString()}></UserItem>)}
            </ul>
        </div>
    )
}

UserItem.propTypes = {
    id: PropTypes.string,
    data: PropTypes.object,
};

export default Home;
