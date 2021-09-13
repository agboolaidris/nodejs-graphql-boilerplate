import React from "react";
import { GrSearchAdvanced } from "react-icons/gr";
import { SearchWrap } from "./search.style";
interface Props {
  onFocus: () => any;
}
function Search({ onFocus }: Props) {
  return (
    <SearchWrap onClick={onFocus}>
      <GrSearchAdvanced />
      <input type="text" placeholder="search ..." className="inactive" />
    </SearchWrap>
  );
}

export default Search;
