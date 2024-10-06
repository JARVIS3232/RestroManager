import { useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import RestroCardSkeleton from "./RestroCardSkeleton";
import RestroCard from "./RestroCard";
import { X } from "lucide-react";
import { useRestaurantStore } from "@/store/useRestaurantStore";
const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { searchRestaurant, searchedRestaurant, appliedFilter } =
    useRestaurantStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    searchRestaurant(params.text!, searchQuery, appliedFilter);
    console.log(searchedRestaurant);
  }, [params.text!, appliedFilter]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by restaurant & cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="bg-orange hover:bg-hoverOrange">Search</Button>
          </div>
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1>(1) Search result found</h1>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {["biryani", "momos", "jalebi"].map(
                  (selectedFilter: string, idx: number) => {
                    return (
                      <div
                        className="relative inline-flex items-center max-w-full"
                        key={idx}
                      >
                        <Badge
                          className="text-[#D19254] pr-6 whitespace-nowrap rounded-md hover:cursor-pointer"
                          variant="outline"
                        >
                          {selectedFilter}
                        </Badge>
                        <X
                          size={16}
                          className="absolute text-[#D19254] right-1 hover:cursor-pointer"
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {isLoading ? <RestroCardSkeleton /> : <RestroCard />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
