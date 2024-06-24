"use client";

import React, { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnswerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/theme-provider";
import { Button } from "../ui/button";
import Image from "next/image";
import { createAnswerAction } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";
import { toast } from "../ui/use-toast";

interface Props {
  question: string;
  questionId: string;
  authorId: string;
}

const AnswerComponent = ({ question, questionId, authorId }: Props) => {
  const pathname = usePathname();
  const { mode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmittingAI, setIsSubmittingAI] = useState<boolean>(false);
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);

    try {
      await createAnswerAction({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;

        editor.setContent("");
      }

      return toast({
        title: "Question is Answered successfully",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAIAnswer = async () => {
    if (!authorId) return;

    setIsSubmittingAI(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgbt`,
        {
          method: "POST",
          body: JSON.stringify({ question }),
        }
      );

      const aiAnswer = await response.json();
      console.log(aiAnswer.reply);

      // Generate AI Answer: it will not work cause i am not subscribed to openai but it work if subscribed:

      /*  const formatedAnswer = aiAnswer.reply;

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(formatedAnswer);
      }
      */

      // Toast
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmittingAI(false);
    }
  };

  return (
    <div>
      <div className="mt-2.5 flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your Answer here.
        </h4>
        {isSubmittingAI ? (
          <p className="paragraph-regular light-border-2 rounded-md border px-4 py-2.5 text-center text-primary-500 shadow-none dark:text-primary-500">
            Generating...
          </p>
        ) : (
          <>
            <Button
              onClick={generateAIAnswer}
              className="btn light-border-2 gap-2 rounded-md border px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
            >
              <Image
                src="/assets/icons/stars.svg"
                alt="star"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate an AI Answer
            </Button>
          </>
        )}
      </div>
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link, image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | alignleft aligncenter |" +
                        "alignright alignjustify | bullist numlist",
                      content_style:
                        "body { font-family:Inter,Arial,sans-serif; font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit font-semibold text-white"
              disabled={isSubmitting || !authorId}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerComponent;
