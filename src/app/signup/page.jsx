"use client";
import { authClient } from "@/lib/auth-client";
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
import { DiGoogleDrive } from "react-icons/di";
import { toast } from "react-toastify";
const SignUpPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
   
    const { name, email, password, image } = data;
    const { data: user, error } = await authClient.signUp.email({
      name, // required
      email, // required
      password, // required
      image,
      callbackURL: "/",
    });

    if (user) {
      toast.success("sign up successful!");
      redirect("/");
    } else {
      toast.error(`sign up fail ${error.message}`);
    }
  };
  const handelGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
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
      <h1 className="text-2xl font-bold text-center text-[#810B38] mb-5 text-center">
        Well come our new user! please signup continue.
      </h1>
      <Form className="flex mx-auto flex-col gap-4" onSubmit={onSubmit}>
        <TextField isRequired name="name" type="text">
          <Label>Full Name</Label>
          <Input className={"w-full"} placeholder="Enter your full name" />

          <FieldError />
        </TextField>

        <TextField name="image" type="text">
          <Label>Image</Label>
          <Input placeholder="Enter Your image URL" />

          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="email"
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
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button className={"bg-[#810B38] w-full rounded-md"} type="submit">
            <Check />
            SIgn Up
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <div className="separet"></div>
          <p>Or</p>
          <div className="separet"></div>
        </div>
        <div className="">
          <Button
            variant="outline"
            className={"  w-full rounded-md flex place-items-center"}
            onClick={handelGoogleLogin}
          >
            <DiGoogleDrive /> Sign Up with google
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUpPage;
