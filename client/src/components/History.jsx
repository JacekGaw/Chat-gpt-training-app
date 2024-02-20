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
            <div className='flex flex-col min-w-56'>
                <header className='p-2'>
                    <h3 className='text-slate-300 font-[800] text-sm '>Conversations History: </h3>
                </header>
                <ul className='flex flex-col gap-2'>
                    {convHistoryList.map(convHistory => {
                        console.log(convHistory._id);
                        return <li key={convHistory._id} className={`w-full rounded-lg  bg-black bg-opacity-20 border border-black  text-white`}><HistoryItem historyInfo={convHistory} /></li>
                    })}
                </ul>
            </div>
        </>
    )

}

export default History;