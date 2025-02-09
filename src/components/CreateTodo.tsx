import { useState } from "react";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Calendar } from "./ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { ToDo, ToDoCategory, ToDoPriority } from "@/types/toDo";
import { Calendar1Icon } from "lucide-react";
import { format } from "date-fns";

const toDoSchema = z
  .object({
    title: z
      .string()
      .min(1, "This field is required!")
      .max(100, "Title is too long!"),
    description: z
      .string()
      .min(1, "This field is required!")
      .max(400, "Description is too long!"),
    priority: z.enum(["high", "medium", "low"]),
    category: z.enum(["work", "study", "school"]),
    comment: z.string(),
    startDate: z.string().min(1, "Start date is required!"),
    endDate: z.string().min(1, "End date is required!"),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (new Date(endDate) < new Date(startDate)) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "End date must be after or equal to the start date!",
      });
    }
  });

type CreateToDoProps = {
  onSubmit: (todo: Omit<ToDo, "id" | "status" | "createdAt">) => void;
  todo?: ToDo;
};

export function CreateTodoDialog({ onSubmit }: CreateToDoProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [open, setOpen] = useState<boolean>(false);

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(toDoSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium" as ToDoPriority,
      category: "work" as ToDoCategory,
      comment: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmitForm = (formData: z.infer<typeof toDoSchema>) => {
    if (!startDate || !endDate) {
      return;
    }

    const newToDo = {
      ...formData,
      startDate: startDate ? format(startDate, "yyyy-MM-dd") : "",
      endDate: endDate ? format(endDate, "yyyy-MM-dd") : "",
      comment: formData.comment || "",
    };

    onSubmit(newToDo);

    setOpen(false);
    setStartDate(undefined);
    setEndDate(undefined);
    reset();
    console.log(startDate, " i ", endDate);
    console.log(newToDo);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="black">Create To do</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Todo</DialogTitle>
          <DialogDescription
            className="sm:max-w-[425px]"
            aria-describedby={undefined}
          >
            Create your first todo
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)}>
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
                      setStartDate(date);
                      setValue(
                        "startDate",
                        date ? format(date, "yyy - MM - dd") : ""
                      );
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
                      setEndDate(date);
                      setValue(
                        "endDate",
                        date ? format(date, "yyy - MM - dd") : ""
                      );
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
  );
}
