import React, { useState } from "react";
import * as z from "zod";
import { ToDo } from "@/types/toDo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Controller } from "react-hook-form";
import { Calendar1Icon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Calendar } from "./ui/calendar";

const todoSchema = z.object({
  title: z.string().min(1, "Title is required!").max(100, "Title is too long!"),
  description: z
    .string()
    .min(1, "Description is required!")
    .max(500, "Title is too long!"),
  priority: z.enum(["low", "high", "medium"]),
  category: z.enum(["work", "school", "study"]),
  startDate: z.string().min(1, "Start date is required!"),
  endDate: z.string().min(1, "End date is required!"),
  comment: z.string().optional(),
});

type EditTodoProps = {
  todo: ToDo;
  open: boolean;
  onUpdate: (updatedTodo: ToDo) => void;
  onOpenChange: (open: boolean) => void;
};

const TodoEditDialog = ({ todo, onUpdate, onOpenChange }: EditTodoProps) => {
//   const parsedDate = (dateString: string | undefined) => {
//     return dateString && !isNaN(Date.parse(dateString))
//       ? new Date(dateString)
//       : undefined;
//   };

const parsedDate = (dateString: string | undefined) => {
    if(!dateString) return undefined;

    const date = new Date(dateString);
    return isNaN(date.getTime()) ? undefined : date;
}

const [startDate, setStartDate] = useState(parsedDate(todo.startDate));
const [endDate, setEndDate] = useState(parsedDate(todo.endDate));

const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      category: todo.category,
      startDate: todo.startDate,
      endDate: todo.endDate,
      comment: todo.comment,
    },
  });

  const onSubmit = (editedData: z.infer<typeof todoSchema>) => {
    if (!startDate || !endDate) {
      alert("Unesite pravilne datume");
      return;
    }

    const editedTodo: ToDo = {
      ...todo,
      ...editedData,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      // title: todo.title,
      // description: todo.description,
      // priority: todo.priority,
      // category: todo.category,
      // startDate: todo.startDate,
      // endDate: todo.endDate,
      // comment: todo.comment
    };

    onUpdate(editedTodo);
    onOpenChange(false);
    reset();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* <DialogTrigger asChild>
            <button className="hidden"></button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit todo</DialogTitle>
            <DialogDescription
              className="sm:max-w-[425px]"
              aria-describedby={undefined}
            >
              {/* Make changes to your profile here. Click save when you're done. */}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-[16px] gap-2">
              <Label htmlFor="title">Title:</Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input {...field} className="mt-[6px]" />
                    {errors.title && <p className="">{errors.title.message}</p>}
                  </div>
                )}
              ></Controller>
            </div>
            <div className="mt-[16px] gap-2">
              <Label htmlFor="description">Description:</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <div>
                    <Textarea {...field} className="mt-[6px]" />
                    {errors.description && (
                      <p className="">{errors.description.message}</p>
                    )}
                  </div>
                )}
              ></Controller>
            </div>
            <div className="mt-[16px] gap-2">
              <Label className="mb-[6px]" htmlFor="priority">
                Priority:
              </Label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-[6px]">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              ></Controller>
            </div>
            <div className="mt-[16px] gap-4">
              <Label className="mb-[6px]" htmlFor="category">
                Category:
              </Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-[6px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="school">School</SelectItem>
                        <SelectItem value="study">Study</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              ></Controller>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full mt-[16px]">
              <div className="flex flex-col gap-2">
                <Label className="mb-[6px]">Start date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="text-red">
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                      <Calendar1Icon></Calendar1Icon>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      
                      onSelect={(date) => {
                        if (date) {
                          setStartDate(date);
                          setValue(
                            "startDate",
                            date ? format(date, "yyy - MM - dd") : ""
                          );
                        } else {
                          setValue("startDate", "");
                        }
                      }}
                      initialFocus
                      className="rounded bg-white"
                    />
                  </PopoverContent>
                </Popover>
                {errors.startDate && (
                  <p className="text-red-500">{errors.startDate.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="mb-[6px]">End date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="text-red">
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                      <Calendar1Icon></Calendar1Icon>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      //onSelect={setEndDate}
                      onSelect={(date) => {
                        if (date) {
                          setEndDate(date);
                          setValue(
                            "endDate",
                            date ? format(date, "yyy - MM - dd") : ""
                          );
                        } else {
                          setValue("endDate", "");
                        }
                      }}
                      disabled={(date) => (startDate ? date < startDate : false)}
                      initialFocus
                      className="rounded bg-white"
                    />
                  </PopoverContent>
                </Popover>
                {errors.endDate && (
                  <p className="text-red-500">{errors.endDate.message}</p>
                )}
              </div>
            </div>
            <div className="mt-[16px] gap-2">
              <Label htmlFor="comment">Comment:</Label>
              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <div>
                    <Textarea {...field} className="mt-[6px]" />
                    {errors.comment && (
                      <p className="">{errors.comment?.message}</p>
                    )}
                  </div>
                )}
              ></Controller>
            </div>
            <DialogFooter>
              <Button type="submit" className="mt-[20px]">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoEditDialog;
