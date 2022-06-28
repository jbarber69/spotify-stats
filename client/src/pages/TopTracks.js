import axios from 'axios';
import { useState, useEffect } from 'react';
import { getTopTracks } from '../spotify';
import { catchErrors } from '../utils';


const getAllArtists = (artistList) => {

    let artists = []

    artistList.map(artist => {
        artists.push(artist.name)
    })

    return artists.join(', ')
}

const getTrackDuration = (trackLengthMS) => {
    const minutes = Math.floor(trackLengthMS / 60000);
    const seconds = Math.floor(((trackLengthMS % 60000) / 1000));
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const TopTracks = () => {
    const [topTracks, setTopTracks] = useState(null);
    const [activeRange, setActiveRange] = useState('short');

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getTopTracks(`${activeRange}_term`);
            // let { moreData } = {}
      

            setTopTracks(data);

        };

        catchErrors(fetchData());

    }, [activeRange]);


    // useEffect(() => {
    //     if(!topTracks){
    //         return
    //     }

    // })

    return (
        <div>
            <div className='top-header'>
                <h2>top tracks</h2>
                <table>
                    <th><p className='nav-text' onClick={() => setActiveRange('short')}>last 4 weeks</p></th>
                    <th><p className='nav-text' onClick={() => setActiveRange('medium')}>last 6 months</p></th>
                    <th><p className='nav-text' onClick={() => setActiveRange('long')}>all time</p></th>
                </table>
            </div>

            {topTracks && topTracks.items &&
                (<div className='tracks'>
                    {topTracks.items.map(track =>
                        <div className='track'>
                            <img className="album-art" src={track.album.images[0].url} alt={track.name} />
                            <div className="track-details">
                                <h4>{track.name}</h4>
                                <div className='small-details'>
                                    <p className='album-details'>{getAllArtists(track.artists)}</p>
                                    <p className='album-details albumname'>•</p>
                                    <p className='album-details albumname'>{track.album.name}</p>
                                    <p className='album-details'>•</p>
                                    <p className="album-details">{getTrackDuration(track.duration_ms)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>)}
        </div>
    );
};

export default TopTracks;