import React, {useState, useEffect} from 'react';
import { LineChart, Line, XAxis, Tooltip } from 'recharts';
import '../styles/AverageSession.css';

import GetData from '../services/services';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip--average">
          <p className="label">{`${payload[0].value} min`}</p>
        </div>
      );
    }
  
    return null;
};

function AverageSession({id}) {

    const [user, setUserAverage] = useState(null);

    useEffect(() => {
        const fetchAverageData = async () => {
            const user = await GetData("GetAverageSession", id);
            setUserAverage(user);
        }
        fetchAverageData();
    }, [id])

    if (user === null) {
        return <p>Loading Average Session graph...</p>
    }

    const averageData = user.data.sessions;
    for(let i=0; i<averageData.length; i++) {
        switch(averageData[i].day) {
            case 1:
                averageData[i].day = "L";
                break;
            case 2:
                averageData[i].day = "Ma";
                break;
            case 3:
                averageData[i].day = "Me";
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
            <Tooltip cursor={{ stroke: 'white', strokeWidth: 0 }} viewBox={{ x: 0, y: 0, width: 50, height: 100 }} itemStyle={{width: 30, backgroundColor: 'blue'}} labelClassName='tooltip' content={<CustomTooltip active={""} payload={""} label={""} />} />
        </LineChart>
            </div>
    );

}

export default AverageSession;
