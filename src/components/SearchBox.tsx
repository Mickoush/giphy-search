interface SearchBoxProps {
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchBox = (props: SearchBoxProps) => {
    const { placeholder, onChange } = props;

    return (
        <div>
            <input
                className="search_box"
                onChange={onChange}
                placeholder={placeholder}
                type="search"
            />
        </div>
    );
}

export default SearchBox;