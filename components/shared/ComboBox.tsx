"use client";

import * as React from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
}

export function Combobox({ filters }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="light-border-2 h-[70px] w-[200px] justify-between border-light-400 font-medium text-dark-300 dark:bg-dark-300 dark:text-light-850">
          <MapPin className="h-5 w-5 shrink-0 text-light-500 opacity-60" />
          {value || "Select Location"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="light-border-2 w-[200px] border-light-400 p-0 shadow dark:shadow-md dark:shadow-dark-400">
        <Command>
          <CommandGroup className="light-border-2 h-[280px] overflow-y-auto bg-light-900 text-dark-300 shadow dark:bg-dark-500 dark:text-light-800">
            {filters.map((framework) => (
              <CommandItem
                className="cursor-pointer py-2 font-semibold transition-all duration-75 hover:bg-light-800 dark:hover:bg-dark-400"
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  console.log(currentValue);
                  setOpen(false);
                }}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.value}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
