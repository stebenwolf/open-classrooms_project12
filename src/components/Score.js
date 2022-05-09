import React, {useState, useEffect} from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import GetData from '../services/services';

import '../styles/Score.css';

const style = {
  top: '42%',
  right: '37%',
  transform: 'translate(37%, -42%)',
};

const endAngle = (percentage) => {
    return -(percentage/100)*360 +180
};

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

  
export default Score;
