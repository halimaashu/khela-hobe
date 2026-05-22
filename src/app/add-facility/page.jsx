"use client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
const AddFacilityPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-facility`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(data);
    toast.success("Facility added successfully!");
    redirect("/all-facility");
  };

  return (
    <div className="md:w-1/2 mx-auto p-5 shadow-lg">
      <Image
        src={"/khela-hobe.png"}
        alt="Khela Hobe"
        width={100}
        height={100}
        className="mx-auto "
      />
      <h1 className="text-2xl font-bold text-center text-[#810B38] mb-5">
        Add a new Facility
      </h1>
      <Form className="flex mx-auto flex-col gap-4" onSubmit={onSubmit}>
        <TextField isRequired name="name" type="text">
          <Label>Facility Name</Label>
          <Input className={"w-full"} placeholder="Enter facility name" />

          <FieldError />
        </TextField>

        <Select name="facility_type" className="" placeholder="Select one">
          <Label>facility_type</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="florida" textValue="Football">
                Football
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="cricket" textValue="Cricket">
                Cricket
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="basketball" textValue="Basketball">
                Basketball
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="swimming" textValue="Swimming">
                Swimming
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="tennis" textValue="Tennis">
                Tennis
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="volleyball" textValue="Volleyball">
                Volleyball
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        <TextField isRequired minLength={8} name="location" type="text">
          <Label>Facility Location</Label>
          <Input placeholder="Enter facility location" />

          <FieldError />
        </TextField>

        <TextField isRequired name="price_per_hour" type="text">
          <Label>Price per Hour</Label>
          <Input placeholder="Enter price per hour" />

          <FieldError />
        </TextField>
        <TextField isRequired name="capacity" type="text">
          <Label className="">Total Capacity</Label>
          <Input placeholder="e.g., 22 players" />
          <FieldError className="text-red-500 text-sm" />
        </TextField>
        <TextField isRequired name="description" type="text">
          <Label>Deion</Label>
          <Input placeholder="Enter facility description" />

          <FieldError />
        </TextField>
        <TextField isRequired name="thumbnail" type="text">
          <Label>Thumbnail URL</Label>
          <Input placeholder="Enter thumbnail URL" />

          <FieldError />
        </TextField>
        <TextField isRequired name="available_slots" type="text">
          <Label className="">Available Slots (Commas separated)</Label>
          <Input placeholder="06:00-07:00, 16:00-17:00" />
          <FieldError className="text-red-500 text-sm" />
        </TextField>

        <TextField
          isRequired
          name="owner_email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button className={"bg-[#810B38]"} type="submit">
            <Check />
            Add Facility
          </Button>
          <Button className={"text-[#810B38]"} type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddFacilityPage;
