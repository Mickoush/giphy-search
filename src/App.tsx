import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import useGiphyController from './components/GiphyController';
import Grid, { GridCell } from './components/Grid';
import LoadingIndicator from './components/LoadingIndicatior';

function App() {
    const [query, setQuery] = useState('');

    const giphyController = useGiphyController();

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value);
    };

    useEffect(() => {
        if (query) {
            const searchInputChanged = setTimeout(() => {
                giphyController.onSearch(query);
            }, 300);
            return () => clearTimeout(searchInputChanged);
        }
    }, [query]);

    const imageType = 'fixed_height';
    const cells: GridCell[] = giphyController.data.map((image) => (
        {
            id: image.id,
            src: image.images[imageType].url,
            alt: image.altText ?? image.title,
            height: +image.images[imageType].height,
            width: +image.images[imageType].width,
        }
    ))

    return (
        <div className="App">
            <SearchBox
                onChange={handleChange}
                placeholder='What would you like to search?'
            />
            {giphyController.data.length > 0 && !giphyController.isLoading &&
                <Grid
                    //data={giphyController.data}
                    cells={cells}
                    currentPage={giphyController.currentPage}
                    totalPages={giphyController.totalPages}
                    setPage={giphyController.setPage}
                />
            }
            {giphyController.isLoading &&
                <LoadingIndicator />
            }
        </div>
    );
}

export default App;
