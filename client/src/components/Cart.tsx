import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button variant={"link"}>Clear All</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-base">Items</TableHead>
            <TableHead className="text-base">Title</TableHead>
            <TableHead className="text-base">Price</TableHead>
            <TableHead className="text-base">Quantity</TableHead>
            <TableHead className="text-base">Total</TableHead>
            <TableHead className="text-base text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Avatar>
                <AvatarImage src="" alt="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>Biryani</TableCell>
            <TableCell>80 Rs</TableCell>
            <TableCell>
              <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                <Button
                  className="rounded-full bg-gray-200 dark:hover:text-white dark:text-gray-800 cursor-pointer"
                  variant={"outline"}
                  size={"icon"}
                >
                  <Minus size={15} />
                </Button>
                <Button
                  disabled
                  variant="outline"
                  size={"icon"}
                  className="font-bold border-none focus-visible:ring-0"
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  size={"icon"}
                  className="rounded-full bg-orange hover:bg-hoverOrange  dark:hover:text-white dark:text-gray-800 cursor-pointer"
                >
                  <Plus size={15} />
                </Button>
              </div>
            </TableCell>
            <TableCell>80 Rs</TableCell>
            <TableCell className="text-right">
              <Button className="p-4 rounded-lg bg-orange hover:bg-hoverOrange w-16 h-8">
                Remove
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">80 Rs</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => setOpen(true)}
          className="bg-orange hover:bg-hoverOrange"
        >
          Proceed To Checkout
        </Button>
      </div>
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
