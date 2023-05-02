export interface GridCell {
    id: string
    src: string;
    alt: string;
    height: number;
    width: number;
}

interface GridProps {
    cells: Array<GridCell>;
    currentPage: number;
    totalPages: number;
    setPage(page: number): void;
}

const Grid = (props: GridProps) => {
    const { cells, currentPage, totalPages, setPage } = props;

    const hasPreviousPage = currentPage > 0;
    const hasNextPage = currentPage + 1 < totalPages;

    const previousPage = () => {
        if (hasPreviousPage) {
            console.log("PREVIOUS PAGE");
            setPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (hasNextPage) {
            console.log("NEXT PAGE");
            setPage(currentPage + 1);
        }
    }

    return (
        <div>
            <div className="grid">
                {cells.map((cell) => (
                    <div key={cell.id}>
                        <img
                            className="image"
                            src={cell.src}
                            alt={cell.alt}
                            height={cell.height}
                            width={cell.width}
                        />
                    </div>
                ))}
            </div>
            <div className="page_counter">
                Page {currentPage + 1} / {totalPages}
            </div>
            <div className="page_buttons">
                {hasPreviousPage &&
                    <button className="page_button" onClick={previousPage}>Previous</button>
                }
                {hasNextPage &&
                    <button className="page_button" onClick={nextPage}>Next</button>
                }
            </div>
        </div>
    )
}

export default Grid;