import { useAppDispatch } from "@/hooks/redux";
import { searchTracksThunk } from "@/store/thunks/trackThunk";
import { Box, TextField } from "@mui/material";
import React, { useState } from "react";

type SearchProps = {
  param: 'tracks';
}

const searcherParams = {
  tracks: searchTracksThunk,
}

export const Search: React.FC<SearchProps> = ({param}) => {
  const [query, setQuery] = useState<string>("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();
  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(
        async () => await dispatch(searcherParams[param](e.target.value)),
        500
      )
    );
  };

  return (
    <Box p={3}>
      <TextField label="Search Track" fullWidth value={query} onChange={search} />
    </Box>
  );
};
