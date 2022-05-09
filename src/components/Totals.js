import GetData from '../services/services';
import iconCalories from '../assets/calories-icon.svg';
import iconProteines from '../assets/protein-icon.svg';
import iconCarbs from '../assets/carbs-icon.svg';
import iconFat from '../assets/fat-icon.svg';

import '../styles/Totals.css';
import { useState, useEffect } from 'react';

function Totals({id}) {

    const [user, setUserTotals] = useState(null);

    useEffect(() => {
        const fetchTotalsData = async () => {
            const user = await GetData("GetTotalsData", id);
            setUserTotals(user);
        }
        fetchTotalsData();
      }, [id])

    if (user === null) {
        return <p>Loading Totals Data graph...</p>
    }

    const data = user.data.keyData;

    const calorieCount = data.calorieCount.toString().slice(0,1)+"."+data.calorieCount.toString().slice(1);
    const proteinCount = data.proteinCount;
    const carbohydrateCount = data.carbohydrateCount;
    const lipidCount = data.lipidCount;

    //const data = mockedData.USER_MAIN_DATA.filter(item => item.id === id);
    
    /* const calorieCount = data[0].keyData.calorieCount;
    const proteinCount = data[0].keyData.proteinCount;
    const carbohydrateCount = data[0].keyData.carbohydrateCount;
    const lipidCount = data[0].keyData.lipidCount; */

    return (
        <div className='totalsGraph'>
            <div className="total calories">
                <div className="totalIcon">
                    <img src={iconCalories} alt="calories"></img>
                </div>
                <div className='totalInfos'>
                    <span className="counter">{calorieCount} kCal</span>
                    <br />Calories
                </div>
            </div>
            <div className='total proteines'>
                <div className="totalIcon">
                    <img src={iconProteines} alt="calories"></img>
                </div>
                <div className='totalInfos'>
                    <span className="counter">{proteinCount}g</span>
                    <br />Protéines
                </div>
            </div>
            <div className='total glucides'>
                <div className="totalIcon">
                    <img src={iconCarbs} alt="calories"></img>
                </div>
                <div className='totalInfos'>
                    <span className="counter">{carbohydrateCount}g</span>
                    <br />Glucides
                </div>
            </div>
            <div className='total lipides'>
                <div className="totalIcon">
                    <img src={iconFat} alt="calories"></img>
                </div>
                <div className='totalInfos'>
                    <span className="counter">{lipidCount}g</span>
                    <br />Lipides
                </div>
            </div>

        </div>
    )
}

export default Totals;