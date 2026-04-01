import { MdAirplaneTicket } from "react-icons/md";
import { SearchField } from "@heroui/react";

export default function Header({onSearch}){
    return(
        <div className="w-full h-10 flex items-center px-6 py-6 bg-white/10 backdrop-blur-md border-b border-white/20 justify-between">
        <div className="w-1/2 flex justify-items-start">
            <MdAirplaneTicket className="text-white text-4xl mr-2"></MdAirplaneTicket>
            <h3 className="text-white text-2xl font-bold mr-30">Air Traffic Dashboard</h3>
            </div>
            <div className="w-1/2 justify-items-end">
            <div className="flex items-center gap-4 w-96">
        <SearchField 
          aria-label="Search aircraft"
          placeholder="Search Callsign (e.g. DLH)..."
          className="w-full"
          onChange={(value) => onSearch(value)}
          onClear={() => onSearch("")}
        >
          <SearchField.Group className="bg-white/50 rounded-full">
            <SearchField.SearchIcon className="ml-2" />
            <SearchField.Input />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>
      </div>
        </div>
    )
}