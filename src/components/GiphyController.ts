import axios from "axios"
import { useCallback, useEffect, useState } from "react";
import giphyApiUrl from "../services/api";
import { useSearchParams } from "react-router-dom";

interface GiphyImage {
    url: string;
    width: string;
    height: string;
    webp: string;
}

interface GiphyImages {
    [key: string]: GiphyImage
}

export interface GiphyModel {
    id: string;
    slug: string;
    url: string;
    title: string;
    altText?: string;
    images: GiphyImages;
}

const defaultLimit = 18;

const useGiphyController = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [input, setInput] = useState(searchParams.get('q') ?? '');
    const [offset, setOffset] = useState(Math.trunc(+(searchParams.get('offset') ?? 0)));
    const [limit, setLimit] = useState(Math.trunc(+(searchParams.get('limit') ?? defaultLimit)));
    const [totalCount, setTotalCount] = useState(0);
    const [data, setData] = useState(Array<GiphyModel>());
    const [isLoading, setLoading] = useState(false);

    const page = Math.trunc(offset / limit);
    const totalPages = Math.ceil(totalCount / defaultLimit);

    const setPage = (page: number) => {
        const newOffset = page * limit;
        setOffset(newOffset);
    }

    const parseGiphyImages = (items: any): GiphyImages => {
        let images: GiphyImages = {};
        for (let key in items) {
            if (Object.prototype.hasOwnProperty.call(items, key)) {
                let value = items[key];
                let image: GiphyImage = {
                    url: value.url,
                    width: value.width,
                    height: value.height,
                    webp: value.webp,
                }
                images[key] = image;
            }
        }
        return images;
    }

    const parseGiphyModel = (item: any): GiphyModel => {
        let model: GiphyModel = {
            id: item.id,
            slug: item.slug,
            url: item.url,
            title: item.title,
            altText: item.alt_text,
            images: parseGiphyImages(item.images),
        };
        return model;
    }

    const handleResponse = (responseData: any) => {
        let data: Array<any> = responseData.data;

        data.map(item => {
            return parseGiphyModel(item);
        });

        window.scrollTo(0, 0);
        setData(data);
        setTotalCount(responseData.pagination.total_count);
        setLoading(false);
    }

    const getData = useCallback(async (query: string) => {
        setLoading(true);
        console.log(`QUERY: ${query}, OFFSET: ${offset}, PAGE: ${page}`);
        axios.get(giphyApiUrl(query, limit, offset))
            .then(response => {
                if (response.status === 200) {
                    handleResponse(response.data);
                } else {
                    setLoading(false);
                    console.log("ERROR: Failed to fetch data from Giphy API.");
                }
            })
    }, [setLoading, handleResponse]);

    const onSearch = (input: string) => {
        setInput(input);
        setPage(0);
    }

    useEffect(() => {
        if (input) {
            setSearchParams({ q: input, offset: offset.toString(), limit: limit.toString() });
            getData(input);
        }
    }, [offset, input])

    return {
        input: input,
        onSearch: onSearch,
        isLoading: isLoading,
        setLoading: setLoading,
        data: data,
        currentPage: page,
        totalPages: totalPages,
        setPage: setPage,
    }
}

export default useGiphyController;