"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, LinkIcon } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  degree: z.string().min(1, { message: "Degree is required" }),
  school: z.string().min(1, { message: "School is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  startDate: z
    .string()
    .regex(/^\d{2}\/\d{4}$/, { message: "Date must be in MM/YYYY format" }),
  endDate: z
    .string()
    .regex(/^\d{2}\/\d{4}$/, { message: "Date must be in MM/YYYY format" }),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface EducationFormProps {
  onSubmit: (data: FormData) => void;
}

export default function EducationForm({ onSubmit }: EducationFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isCurrentDate, setIsCurrentDate] = useState(false);

  const handleCurrentDateChange = (checked: boolean) => {
    setIsCurrentDate(checked);
    if (checked) {
      const currentDate = new Date();
      const formattedDate = `${String(currentDate.getMonth() + 1).padStart(
        2,
        "0"
      )}/${currentDate.getFullYear()}`;
      setValue("endDate", formattedDate);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-1 bg-white p-2 rounded-lg shadow-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="degree" className="text-sm font-medium text-gray-700">
          Degree<span className="text-red-500">*</span>
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="degree"
            {...register("degree")}
            className="flex-grow border-gray-300"
            placeholder="Enter field of study"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="px-3 py-2 h-10 border-orange-300 text-orange-500 hover:bg-orange-50"
          >
            <LinkIcon className="h-4 w-4" />
            <span className="ml-2">View Link</span>
          </Button>
        </div>
        {errors.degree && (
          <p className="text-red-500 text-sm">{errors.degree.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="school" className="text-sm font-medium text-gray-700">
          School
        </Label>
        <Input
          id="school"
          {...register("school")}
          className="border-gray-300"
          placeholder="Enter school / university"
        />
        {errors.school && (
          <p className="text-red-500 text-sm">{errors.school.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium text-gray-700">
            City
          </Label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="country"
            className="text-sm font-medium text-gray-700"
          >
            Country
          </Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                  <SelectItem value="japan">Japan</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="startDate"
            className="text-sm font-medium text-gray-700"
          >
            Start Date
          </Label>
          <div className="relative">
            <Input
              id="startDate"
              {...register("startDate")}
              className="border-gray-300"
              placeholder="MM/YYYY"
            />
            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="endDate"
            className="text-sm font-medium text-gray-700"
          >
            End Date
          </Label>
          <div className="relative">
            <Input
              id="endDate"
              {...register("endDate")}
              className="border-gray-300"
              placeholder="MM/YYYY"
              disabled={isCurrentDate}
            />
            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate.message}</p>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="current"
              checked={isCurrentDate}
              onCheckedChange={handleCurrentDateChange}
              className="border-gray-300 text-orange-500"
            />
            <Label
              htmlFor="current"
              className="text-sm font-medium text-gray-700"
            >
              Present (Current)
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="text-sm font-medium text-gray-700"
        >
          Description
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          className="border-gray-300 h-24"
          placeholder="Type Here..."
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Save
        </Button>
      </div>
    </form>
  );
}
