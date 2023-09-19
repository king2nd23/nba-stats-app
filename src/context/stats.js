import {createContext, useState} from 'react';
import axios from 'axios';

const StatsContext = createContext();

function Provider({children}){
    const [playerStats, setStats] = useState('');

    const searchStats = async (term) => { 
        let res = await axios.get('', {
            params: {
                search: term
            }
            
        })
        .then(res => setStats(res.data.data))
     }

     const data = {
        playerStats,
        searchStats
     }

     return(
        <StatsContext.Provider value={data}>
            {children}
        </StatsContext.Provider>
     )
}

export { Provider }
export default StatsContext;