"use client";

import { useFilterContext } from "@/app/actions/context/filterContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

function TaskSearch() {
    const { search, setSearch } = useFilterContext();

    return (
        <Popover>
            <PopoverTrigger>
                <Button className="py-5" variant="ghost" type="button">
                    <MagnifyingGlassIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="right" align="start" className="flex flex-col gap-2 w-60 ">
                <DropdownMenuLabel>Search</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button onClick={() => setSearch("")}>Reset</Button>
            </PopoverContent>
        </Popover>
    );
}

export default TaskSearch;
