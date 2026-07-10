import { Berry } from "../../types/Berry";


interface BerryCardProps {
  berry: Berry;
  onSelect?: (berry: Berry) => void;
}


export default function BerryCard({
  berry,
  onSelect
}: BerryCardProps) {


  return (

    <div className="
      bg-white
      rounded-xl
      shadow-md
      p-5
      border
      hover:shadow-lg
      transition
    ">


      {/* Header */}

      <div className="flex justify-between items-start">


        <div>

          <h2 className="
            text-xl
            font-bold
          ">
            {berry.name}
          </h2>


          <p className="
            text-sm
            text-gray-500
          ">
            {berry.category}
          </p>


        </div>



        {
          berry.featured && (

            <span className="
              bg-yellow-200
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold
            ">
              ⭐ Featured
            </span>

          )
        }


      </div>



      {/* Description */}

      {
        berry.description && (

          <p className="
            mt-3
            text-gray-700
          ">
            {berry.description}
          </p>

        )
      }



      {/* Growth Info */}

      <div className="
        mt-4
        space-y-2
        text-sm
      ">


        <p>
          🌱 Growth:
          <strong>
            {" "}
            {berry.growthTime} hrs
          </strong>
        </p>



        <p>
          🍓 Yield:
          <strong>
            {" "}
            {berry.minYield}-{berry.maxYield}
          </strong>
        </p>


      </div>




      {/* Recipe */}

      <div className="mt-4">


        <h3 className="font-semibold">
          Recipe
        </h3>


        {
          berry.recipes[0].ingredients.map(
            (ingredient,index)=>(
              
              <p
                key={index}
                className="text-sm"
              >

                🌱 {ingredient.seedType}
                {" "}
                x{ingredient.quantity}

              </p>

            )
          )
        }


      </div>




      {/* Action */}


      {
        onSelect && (

          <button

            onClick={() => onSelect(berry)}

            className="
              mt-5
              w-full
              bg-green-600
              text-white
              py-2
              rounded-lg
              hover:bg-green-700
            "

          >

            Select Berry

          </button>

        )
      }


    </div>

  );
}