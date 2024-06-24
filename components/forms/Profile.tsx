"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { profileSchema } from "@/lib/validations";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.action";
import { toast } from "../ui/use-toast";

interface Params {
  clerkId: string;
  user: string;
}

const Profile = ({ clerkId, user }: Params) => {
  const parsedUser = JSON.parse(user);

  const router = useRouter();
  const pathname = usePathname();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: parsedUser.name || "",
      username: parsedUser.username || "",
      portfolioWebsite: parsedUser.portfolioWebsite || "",
      location: parsedUser.location || "",
      bio: parsedUser.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsSubmitting(true);

    try {
      // update user action:
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });

      router.back();
      return toast({
        title: "Profile updated successfully",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-9 flex w-full flex-col gap-9">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark300_light900">
                Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                  placeholder="Your Name"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark300_light900">
                Username <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                  placeholder="Your Username"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark300_light900">
                Portfolio Link
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                  placeholder="Your Portfolio Url"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark300_light900">Location</FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                  placeholder="Where are you from ?"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark300_light900">
                Bio <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                  placeholder="What's special about you?"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="mt-7 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit font-semibold text-light-800"
            disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Profile;
