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
import { DiGoogleDrive } from "react-icons/di";
import { toast } from "react-toastify";
const LogInPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { email, password, name } = data;
    const { data: user, error } = await authClient.signIn.email({
      email: email, // required
      password: password, // required
      rememberMe: true,
      callbackURL: "/",
    });
    if (user) {
      toast.success(`log in successful!well come MR.`);
    }
    if (error) {
      toast.error(`log in fail ${error.message}`);
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
      <h1 className="text-2xl font-bold  text-[#810B38] mb-5 text-center">
        Well come our new user back!2q
      </h1>
      <Form className="flex mx-auto flex-col gap-4" onSubmit={onSubmit}>
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
            Log In
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <div className="separet"></div>
          <p>Or</p>
          <div className="separet"></div>
        </div>
        <div className="">
          <Button
            onClick={handelGoogleLogin}
            variant="outline"
            className={"  w-full rounded-md flex place-items-center"}
          >
            <DiGoogleDrive /> Log In with google
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LogInPage;
