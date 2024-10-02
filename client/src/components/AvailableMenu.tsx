import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

const AvailableMenu = () => {
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menu
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
          <img
            src="https://i0.wp.com/blog.petpooja.com/wp-content/uploads/2021/10/indian.jpg?resize=696%2C385&ssl=1"
            alt=""
            className="w-full h-40 object-cover"
          />
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-300 dark:text-white">
              Tandoori Biryani
            </h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            <h3 className="text-lg font-semibold mt-4">
              Price: <span className="text-[#D19254]">80 Rs</span>
            </h3>
          </CardContent>
          <CardFooter className="p-4">
            <Button className="w-full bg-orange hover:bg-hoverOrange">
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AvailableMenu;
