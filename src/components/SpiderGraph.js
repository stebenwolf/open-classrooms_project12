import React, {useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis,/*  PolarRadiusAxis, */ ResponsiveContainer } from 'recharts';

import GetData from '../services/services';
import PropTypes from "prop-types";

import '../styles/SpiderGraph.css';

/**
 * Generates the Performance graph.
 * @param {Object} id - The  ID of the user.
 */
function SpiderGraph({id}) {

    const [user, setUserPerf] = useState(null);

    useEffect(() => {
        const fetchPerfData = async () => {
            const user = await GetData("GetPerfData", id);
            setUserPerf(user);
        }
        fetchPerfData();
    }, [id])

    if (user === null) {
        return <p>Loading Perf Data graph...</p>
    }

    const perfData = user.data.data;
    for(let i=0; i<perfData.length; i++) {
        perfData[i].kind = user.data.kind[i+1].charAt(0).toUpperCase() + user.data.kind[i+1].slice(1);        
    } 

    return (
        <div className="graph spiderGraph" >
            <ResponsiveContainer width={258}>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={perfData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="kind" stroke="#ffffff" fontSize={12} tickLine={{ stroke: '#282D30' }}  />
                    
                    <Radar dataKey="value" stroke="#ffffff" fill="rgba(255, 1, 1, 0.7)" fillOpacity={0.7} strokeWidth={0} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

SpiderGraph.propTypes = {
    id: PropTypes.string,
    data: PropTypes.object,
};

export default SpiderGraph;