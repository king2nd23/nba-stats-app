import Search from './Search';
import StatCard from './StatCard';
import axios from 'axios';
import { useState } from 'react';

function StatCardDisplay () {
    let playerId;
    let cleanData = {
        seasonalStats: []
    };
    const [playerData, setData] = useState([])

    const getLastThreeYears = () => {
        const currentYear = new Date().getFullYear();
        const lastThreeYears = [];
      
        for (let i = 1; i <= 3; i++) {
          lastThreeYears.push(currentYear - i);
        }
      
        return lastThreeYears;
      }
            

    //get player profile
    const initStats = async (term) => { 
        const data = {}
        if(!term) return;
        await axios.get('https://www.balldontlie.io/api/v1/players', {
            params: {
                search: term
            }
        })
        .then(async (player) => { 
            // console.log('player.data.data', player.data.data);
            // new
            const lastThree = getLastThreeYears();
            let name = `${player?.data?.data[0]?.first_name} ${player?.data?.data[0]?.last_name}`;
            playerId = player.data.data[0].id;
            cleanData.playerProfile = player.data.data[0];
            cleanData.playerImage = await getEspnPlayerPhoto(name);
            await fetchStats(playerId, lastThree)
            






            //old
            setData([cleanData])
            console.log('playerData', playerData);
        })
        .then(async () => { 
            console.log('CLEAN DATA', cleanData);
         })

     }

     const getEspnData = async () => { 
        const res = await axios.get('https://sports.core.api.espn.com/v3/sports/basketball/nba/athletes?limit=1000000');
        return res.data.items;
      }
      
      const getEspnPlayerPhoto = async (name) => { 
        if(!name) return;
        const data = await getEspnData()
        let espnData = data.find((item) => { 
            return item.displayName.toLowerCase() === name.toLowerCase();
         }) 
         console.log(`https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${espnData.id}.png&w=350&h=254`);
         return `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${espnData.id}.png&w=350&h=254` ;
        }

     const fetchStats = async (playerId, seasonsArr) => { 
        if (!playerId || !seasonsArr.length) return;

        seasonsArr.forEach(async (s) => { 
            await axios.get(`https://www.balldontlie.io/api/v1/season_averages`,{
            params: {
                season: s,
                player_ids: [playerId]
            }
            })
            .then((res) => { 
                cleanData.seasonalStats.push(res.data.data[0]);
            })
            .catch((err) => { 
                console.error('error fetching data: ', err);
            })
        });        
    }

    const renderedCards = playerData.map((item, i) => { 
        return(
            <StatCard data={item} key={i}/>
        )
     })


    return (
        <div>
            <Search onSearch={initStats}/>
            {renderedCards}
        </div>
    )
}

export default StatCardDisplay;