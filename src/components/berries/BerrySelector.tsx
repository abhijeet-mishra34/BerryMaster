import { useState } from "react";

import { berryDatabase } from "../../data/berryDatabase";

import { Berry } from "../../types/Berry";

import BerryCard from "./BerryCard";


interface BerrySelectorProps {

  onSelectBerry?: (berry: Berry) => void;

}


export default function BerrySelector({
  onSelectBerry
}: BerrySelectorProps) {


  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");



  const categories = [
    "All",
    "Status",
    "Healing",
    "PP Recovery",
    "Flavor",
    "EV",
    "Type Resist",
    "Special"
  ];



  const filteredBerries =
    berryDatabase.filter((berry)=>{


      const matchesSearch =
        berry.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );



      const matchesCategory =
        category === "All" ||
        berry.category === category;



      return matchesSearch && matchesCategory;


    });





  return (

    <div className="space-y-6">


      {/* Search */}

      <input

        type="text"

        placeholder="Search berry..."

        value={search}

        onChange={(e)=>
          setSearch(e.target.value)
        }

        className="
          w-full
          border
          rounded-lg
          px-4
          py-2
        "

      />




      {/* Category Filter */}

      <div className="
        flex
        gap-2
        flex-wrap
      ">


        {
          categories.map((item)=>(


            <button

              key={item}

              onClick={()=>
                setCategory(item)
              }

              className={`
                px-3
                py-1
                rounded-full
                border

                ${
                  category === item
                  ?
                  "bg-green-600 text-white"
                  :
                  "bg-white"
                }

              `}

            >

              {item}

            </button>


          ))
        }


      </div>





      {/* Berry Grid */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-5
      ">


        {
          filteredBerries.map((berry)=>(


            <BerryCard

              key={berry.id}

              berry={berry}

              onSelect={onSelectBerry}

            />


          ))
        }


      </div>


    </div>

  );

}