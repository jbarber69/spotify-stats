import { useState, useEffect } from 'react';
import { getTopArtists } from '../spotify';
import { catchErrors } from '../utils';

const TopArtists = () => {
    const [topArtists, setTopArtists] = useState(null);
    const [activeRange, setActiveRange] = useState('short');

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getTopArtists(`${activeRange}_term`);
            // const { next } = await get
            setTopArtists(data);
        };

        catchErrors(fetchData());
    }, [activeRange]);

    return (
        <div>
            <div className='top-header'>
                <h2>top artists</h2>
                <table>
                    <th><p className='nav-text' onClick={() => setActiveRange('short')}>last 4 weeks</p></th>
                    <th><p className='nav-text' onClick={() => setActiveRange('medium')}>last 6 months</p></th>
                    <th><p className='nav-text' onClick={() => setActiveRange('long')}>all time</p></th>
                </table>
            </div>

            {topArtists && topArtists.items &&
                (<div className='artists'>
                    {topArtists.items.map(artist =>
                        <div className='artist'>
                        <a href={artist.external_urls.spotify} target="_blank" rel='noreferrer'>
                            <img className='artist-image' src={artist.images[0].url} alt={artist.name} />
                            <h3 className='artist-name'>{artist.name}</h3>
                            </a>
                        </div>
                    )}
                </div>)}
        </div>
    );
};

export default TopArtists;