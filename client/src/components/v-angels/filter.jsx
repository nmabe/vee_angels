import React, { Fragment } from 'react'
import { angelFilterOptions } from "@/config";
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';


const AngelsFilter = ({filter, handleFilter}) =>  {
  return (
    <div className='bg-background shadowm-sm rounded-lg'>
      <div className="p-e border-b ">
        <h4 className="text-xl font-extrabold hidden">Filter results</h4>
      </div>
      <div className="p-4 overflow-auto hidden">
        
      {
        Object.keys(angelFilterOptions).map(item => (
            <Fragment>
                <div className='mb-6' >
                    <h4 className="text-base font-bold mt-2">{item}</h4>
                    <div className="grid gap-2 mt-2">
                        {
                            angelFilterOptions[item].map((filterItem, i) => 
                            <Label
                              key={i}
                              htmlFor={filterItem.id}
                              className='flex cursor-pointer items-center font-normal gap-2'
                              >
                              <Checkbox
                                id={filterItem.id}
                                className='cursor-pointer'
                                onCheckedChange={(e) => handleFilter(item, filterItem.id)}
                                checked={
                                  filter && Object.keys(filter).length > 0 &&
                                  filter[item] && filter[item].indexOf(filterItem.id) > -1
                                }
                                />
                                {filterItem.label}
                            </Label>)
                        }
                    </div>
                </div>
                <Separator/>
            </Fragment>
        ))
      }
      </div>
    </div>
  )
}

export default AngelsFilter;