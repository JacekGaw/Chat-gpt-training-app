import React, {useState} from 'react';

const History = () => {
    const [convHistoryList, setConvHistoryList] = useState([]);

    return (
        <>
            <div>
                <header>
                    <h3 className='text-slate-300 font-[800] text-sm border-b border-b-slate-400 p-1'>Conversations History: </h3>
                </header>
                <ul>
                    {convHistoryList.map(convHistory => {
                        return <li>{convHistory}</li>
                    })}
                </ul>
            </div>
        </>
    )

}

export default History;