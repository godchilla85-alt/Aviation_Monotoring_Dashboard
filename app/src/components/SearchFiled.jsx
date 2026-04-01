import {SearchField} from "@heroui/react";

export default function SearchFieldItem(){
    return(
        <div>
            <SearchField name="search">
      <SearchField.Group className='rounded-4xl'>
        <SearchField.SearchIcon />
        <SearchField.Input className="w-70" placeholder="Search..." />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
        </div>
    )
}
