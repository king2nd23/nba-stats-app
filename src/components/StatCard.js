function StatCard ({data}) {
    console.log('data', data);
    return (
        <div>
            <div className="card">
                <h1>{data.playerProfile.first_name} {data.playerProfile.last_name}</h1>
                <div className="img w-1/3">
                    <img src={data.playerImage} alt={`${data.playerProfile.first_name} ${data.playerProfile.last_name}`}/>
                </div>
                <div className="data w-2/3">
                    <ul>
                        <li>
                            <span>Team:</span> {data.playerProfile.team.full_name}
                        </li>
                        <li>
                            <span>Height:</span> {data.playerProfile.height_feet}' {data.playerProfile.height_inches}"
                        </li>
                        <li>
                            <span>Weight:</span> {data.playerProfile.weight_pounds}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default StatCard;