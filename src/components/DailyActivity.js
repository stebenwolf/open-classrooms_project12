import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/DailyActivity.css';

import GetData from '../services/services';
import PropTypes from 'prop-types';

/**
 * Returns a custom tooltip for the daily activity graph
 * @param {Object} param - an object made of the active item and the payload content 
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip--daily">
        <p className="label">{`${payload[0].value} kg`}</p>
        <p className="label">{`${payload[1].value} kCal`}</p>
      </div>
    );
  }

  return null;
};

const style = {
  color: 'black',
};

/**
 * Generate the Daily Activity graph.
 * @param {Object} id - The  ID of the user.
 */
function DailyActivity({id}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchDailyData = async () => {
        const user = await GetData("GetDailyActivity", id);
        setUser(user);
      }
      fetchDailyData();
    }, [id])
    
    if (user === null) {
      return <p>Loading Daily graph...</p>
    } 

    const dailyData = user.data.sessions;
    for (let i=0; i<dailyData.length; i++) {
      dailyData[i].day = i+1;
      dailyData[i]["Poids (kg)"] = dailyData[i].kilogram;
      dailyData[i]["Calories brûles (kCal)"] = dailyData[i].calories;
    }
      
      return (
        <div className='dailyActivity'>
          <ResponsiveContainer width='100%' height='100%'>
            

        <BarChart
          data={dailyData}
          margin={{
              top: 30,
              right: 3,
              left: 32,
              bottom: 20,
            }}
            barGap={8}
            >
            <text x={102} y={40} fill="black" textAnchor="middle" dominantBaseline="central">
              <tspan fontSize="15" fontWeight={500}>Activité quotidienne</tspan>
            </text>
            <Legend verticalAlign='top' align='right' iconType={'circle'} height={40} iconSize={8} wrapperStyle={style} />
            <CartesianGrid strokeDasharray="3" vertical={false}  />
            <XAxis stroke="#9B9EAC" dataKey="day" tickMargin={16} tick={{ fontSize: '14', fill: '#9B9EAC' }} tickLine={{ stroke: '#FBFBFB' }} />
            <YAxis yAxisId={"kilogram"} type='number' axisLine={false} stroke="#9B9EAC" orientation='right' dataKey="kilogram" tick={{ fontSize: '14', fill: '#9B9EAC' }} tickLine={false} domain={['dataMin - 2', 'dataMax + 1']} dx={15} />
            <YAxis orientation='left' yAxisId={"Calories brûles (kCal)"} hide={true} dataKey='calories' type="number" domain={['dataMin - 100', 'dataMax + 100']} />
            
            <Tooltip content={<CustomTooltip active={true} payload={[]} />} />
            
            <Bar yAxisId="kilogram"  dataKey="Poids (kg)" fill="#282D30" barSize={7} radius={[50, 50, 0, 0]} />
            <Bar yAxisId="Calories brûles (kCal)"  dataKey="Calories brûles (kCal)" fill="#E60000" barSize={7} radius={[50, 50, 0, 0]}  />
        </BarChart>
          </ResponsiveContainer>
          </div>
    );
}

DailyActivity.propTypes = {
  id: PropTypes.string,
  data: PropTypes.object,
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
}

export default DailyActivity;