import { useParams } from "react-router-dom";

import React, {useState, useEffect} from 'react';

import DailyActivity from "./DailyActivity";
import AverageSession from "./AverageSession";
import SpiderGraph from "./SpiderGraph";
import Score from "./Score";
import Totals from "./Totals";
import GetData from "../services/services";

import '../styles/Profil.css';
import PropTypes from 'prop-types';

/**
 * Returns the Profil Page of a user.
 * Retrieves the user's id from the URL and returns all the graphs related to this user.
 */
function Profil() {

    let userParams = useParams();
    let id = userParams.id;

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
        <div className="userProfile">
            <h1 className="welcomeTitle">Bienvenue <span className="userName">{userInfos.firstName}</span></h1>

            <p className="welcomeMessage">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
            
            <div className="graphs">
                <div className="mainGraphs">
                    <div className="topGraph">
                        <DailyActivity id={id} />
                    </div>
                    <div className="secondaryGraphs">
                        <AverageSession id={id}/>
                        <SpiderGraph id={id} />
                        <Score id={id} />
                    </div>
                </div>
                <div className="sideGraph">
                    <Totals id={id} />
                </div>
            </div>
        </div>
    )
}

Profil.propTypes = {
    id: PropTypes.string,
    data: PropTypes.object,
};

export default Profil;