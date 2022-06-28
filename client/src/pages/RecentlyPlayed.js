import { useState, useEffect } from 'react';
import { getRecentTracks, getTopTracks } from '../spotify';
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

const RecentlyPlayed = () => {
    const [recentlyPlayed, setRecentlyPlayed] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getRecentTracks();
            setRecentlyPlayed(data);
        };

        catchErrors(fetchData());
    }, []);


    return (
        <div>
            <div className='top-header'>
                <h2>recently played</h2>
            </div>

            {recentlyPlayed && recentlyPlayed.items &&
                (<div className='tracks'>
                    {recentlyPlayed.items.map(trackObj =>
                        <div className='track'>
                            <img className="album-art" src={trackObj.track.album.images[0].url} alt={trackObj.track.name} />
                            <div className="track-details">
                                <h4>{trackObj.track.name}</h4>
                                <div className='small-details'>
                                    <p className='album-details'>{getAllArtists(trackObj.track.artists)}</p>
                                    <p className='album-details albumname'>•</p>
                                    <p className='album-details albumname'>{trackObj.track.album.name}</p>
                                    <p className='album-details'>•</p>
                                    <p className="album-details">{getTrackDuration(trackObj.track.duration_ms)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>)}
        </div>
    );
};

export default RecentlyPlayed;