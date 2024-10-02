import pizza from "@/assets/pizza.png";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Globe, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const RestroCard = () => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="relative">
        <AspectRatio ratio={16 / 6}>
          <img
            src={pizza}
            alt="imageCard"
            className="w-full h-full object-cover"
          />
        </AspectRatio>
        <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg py-1 px-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Featured
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dominos
        </h1>
        <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
          <MapPin size={16} />
          <p className="text-sm">
            City: <span className="font-medium">Delhi</span>
          </p>
        </div>
        <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
          <Globe size={16} />
          <p className="text-sm">
            Country: <span className="font-medium">India</span>
          </p>
        </div>
        <div className="flex gap-2 mt-4 flex-wrap">
          {["biryani", "momos", "jalebi"].map(
            (cuisine: string, idx: number) => {
              return (
                <Badge
                  className="font-medium px-2 py-1 rounded-full shadow-sm"
                  key={idx}
                >
                  {cuisine}
                </Badge>
              );
            }
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
        <Link to={`/restaurant/${123}`}>
          <Button className="bg-orange hover:bg-hoverOrange font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
            View Menu
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RestroCard;
