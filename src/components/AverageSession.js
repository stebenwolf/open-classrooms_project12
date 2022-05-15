import React, {useState, useEffect} from 'react';
import { LineChart, Line, XAxis, Tooltip } from 'recharts';
import '../styles/AverageSession.css';

import GetData from '../services/services';
import PropTypes from "prop-types";


/**
 * Returns a custom tooltip for the average session graph
 * @param {Object} param - an object made of the active item and the payload content 
 */
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip--average">
          <p className="label">{`${payload[0].value} min`}</p>
        </div>
      );
    }
  
    return null;
};

/**
 * Generate the Average Session graph.
 * @param {Object} id - The  ID of the user.
 */
function AverageSession({id}) {

    // on définit un state initial "null"
    const [user, setUserAverage] = useState(null);

    // on utilise le useEffect pour mettre à jour le state
    useEffect(() => {
        // on définit une fonction async qui va GET les données souhaitées
        const fetchAverageData = async () => {
            const user = await GetData("GetAverageSession", id);
            setUserAverage(user); // qui met à jour le user
        }
        fetchAverageData();
    }, [id])

    // tant que le user est "null" (état initial), on affiche un message d'erreur
    if (user === null) {
        return <p>Loading Average Session graph...</p>
    }

    // et sinon on peut afficher le graph
    const averageData = user.data.sessions;
    for(let i=0; i<averageData.length; i++) {
        switch(averageData[i].day) {
            case 1:
                averageData[i].day = "L";
                break;
            case 2:
                averageData[i].day = "M";
                break;
            case 3:
                averageData[i].day = "M";
                break;
            case 4:
                averageData[i].day = "J";
                break;
            case 5:
                averageData[i].day = "V";
                break;
            case 6:
                averageData[i].day = "S";
                break;
            case 7:
                averageData[i].day = "D";
                break;
            default:
                break;
        } 
    }
    
    return (
        <div className='graph averageSession' >
            
        <LineChart 
            width={258}
            height={263}
            data={averageData}
            margin={{
                top: 65,
                right: 15,
                left: 15,
                bottom: 35,
            }}
            >
            <text x={110} y={40} fill="rgba(255, 255, 255, 0.5)" textAnchor="middle" dominantBaseline="left">
              <tspan fontSize="15" >Durée moyenne des sessions</tspan>
            </text>
            <XAxis dataKey="day" stroke="white" axisLine={false} opacity={0.5} tickLine={{ stroke: 'red' }} tickMargin={25} />
            
            <Line type="natural" strokeWidth={3} r={0} dataKey="sessionLength" stroke="#ffffff" opacity={0.5} activeDot={{ stroke: 'red', strokeWidth: 3, r: 10 }} />
            <Tooltip cursor={{ stroke: 'white', strokeWidth: 0 }} viewBox={{ x: 0, y: 0, width: 50, height: 100 }} itemStyle={{width: 30, backgroundColor: 'blue'}} labelClassName='tooltip' content={<CustomTooltip active={true} payload={[]} />} />
        </LineChart>
            </div>
    );

}

AverageSession.propTypes = {
    id: PropTypes.string,
    data: PropTypes.object,
};

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
}

export default AverageSession;