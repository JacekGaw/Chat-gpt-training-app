import React, {useEffect, useState} from 'react';
import HistoryItem from './HistoryItem';

const History = () => {
    const [convHistoryList, setConvHistoryList] = useState([]);

    useEffect(() => {
        async function getHistory() {
            try {
                const response = await fetch("http://localhost:3000/history");
                if(!response.ok) {
                    throw new Error(response.message);
                }
                const dataJSON = await response.json();
                const data = JSON.parse(dataJSON);
                setConvHistoryList(data);
            } catch (error) { console.log(error); }
        }
        getHistory();
    }, [])

    return (
        <>
            <div>
                <header>
                    <h3 className='text-slate-300 font-[800] text-sm border-b border-b-slate-400 p-1'>Conversations History: </h3>
                </header>
                <ul>
                    {convHistoryList.map(convHistory => {
                        return <li key={convHistory._id}><HistoryItem historyInfo={convHistory} /></li>
                    })}
                </ul>
            </div>
        </>
    )

}

export default History;