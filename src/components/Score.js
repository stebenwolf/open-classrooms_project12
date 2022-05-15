import React, {useState, useEffect} from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import GetData from '../services/services';
import PropTypes from 'prop-types';

import '../styles/Score.css';

const style = {
  top: '42%',
  right: '37%',
  transform: 'translate(37%, -42%)',
};

/**
 * A float number between 0 and 1
 * @typedef {(number)} Float{0..1}
 */
/**
 * Takes a floating number (ideally between 0 and 1) and returns a custom percentage for the score graph 
 * @param { Float } percentage - the initial score (ideally between 0 and 1 but would work with other numbers despite being then irrelevant).
 */
const endAngle = (percentage) => {
    return -(percentage/100)*360 +180
};

/**
 * Generate the Score graph.
 * @param {Object} id - The  ID of the user.
 */
function Score({id}) {
  
  const [user, setUserScore] = useState(null);

  useEffect(() => {
    const fetchScoreData = async () => {
        const user = await GetData("GetScoreData", id);
        setUserScore(user);
    }
    fetchScoreData();
  }, [id])

  if (user === null) {
    return <p>Loading Score...</p>
  }

  const score = user.data.todayScore;
  //const score = 0.5;
  
  const data = [ { name : <p className='scoreP'>{score*100}%<br /><span>de votre objectif</span></p>, todayScore: score*100, fill: '#ff0000'}]

  return (
    <div className='graph scoreGraph'>
      <h3 className='scoreTitle'>Score</h3>
      <ResponsiveContainer width={258}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="80%" barSize={15} data={data} startAngle={180} endAngle={endAngle(data[0].todayScore)}>
          <RadialBar            
            
            dataKey="todayScore"
            cornerRadius={5}

          />
          
          <Legend iconSize={0} layout="vertical" verticalAlign="middle" wrapperStyle={style} /> 
       
        </RadialBarChart>
      </ResponsiveContainer>
      </div>
    );
}

Score.propTypes = {
  id: PropTypes.string,
  data: PropTypes.object,
  style: PropTypes.object,
};

endAngle.propTypes = {
  percentage: PropTypes.number,
}
  
export default Score;
