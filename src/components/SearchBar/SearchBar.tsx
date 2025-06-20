import React, {useState} from 'react';
import {TextField} from '@mui/material';
import {useDispatch} from 'react-redux';
import {setSearchQuery} from "../../store/slices/TodoSlice";

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const dispatch = useDispatch();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        dispatch(setSearchQuery(newSearchTerm));
    };

    return (
        <TextField
            variant="outlined"
            placeholder="Search for todos by title or description..."
            value={searchTerm}
            onChange={handleSearch}
            sx={{
                width: '90%',
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                }
            }}
        />
    );
};

export default SearchBar;