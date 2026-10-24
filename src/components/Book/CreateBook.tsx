"use client";

import { bookFormSchema, BookFormType } from "@/lib/zodSchema";
import { createBook } from "@/server/createBook";
import { Book } from "@generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookPlusIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Button } from "../shadcnui/button";
import { CardContent, CardFooter } from "../shadcnui/card";
import { Field, FieldContent, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcnui/select";
import { Textarea } from "../shadcnui/textarea";
import { toast } from "../shadcnui/toast";

type CreateBookProps = {
  books: Book[];
};

const CreateBook = ({}: CreateBookProps) => {
  const [isFile, setIsFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      language: "",
      category: "",
      pages: "",
      price: "",
      isbn: "",
      publishedYear: "",
      description: "",
    },
    mode: "all",
  });

  const { openFilePicker, filesContent, plainFiles, clear } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",
    onFilesSuccessfullySelected: () => setIsFile(true),
    onClear: () => setIsFile(false),
    validators: [
      new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 /*5Mb*/ }),
    ],
  });

  const createBookHandler = async (cBook: BookFormType) => {
    setIsLoading(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    const { isSuccess, msg } = await createBook(cBook, plainFiles[0]);

    if (isSuccess) {
      toast.add({ title: msg, type: "success" });

      reset();
      clear();

      push("/book/all-books");
    } else {
      toast.add({ title: msg, type: "error" });
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(createBookHandler)}
      className="grid gap-4"
      noValidate>
      <CardContent className="grid grid-cols-2">
        <div className="col-span-2 flex gap-4">
          {!isFile && (
            <button
              type="button"
              onClick={openFilePicker}
              className="relative aspect-2/3 w-40 overflow-hidden rounded-md border">
              <Image
                src="https://placehold.co/400x600.jpeg"

                alt="Book cover"
                fill
                sizes="160px"
                priority
                className="object-cover"
              />
            </button>
          )}

          {filesContent.map(({ size, content }) => (
            <button
              key={size}
              type="button"
              onClick={openFilePicker}
              className="relative aspect-2/3 w-40 overflow-hidden rounded-md border">
              <Image
                src={content}

                alt="Book cover"
                fill
                sizes="160px"
                priority
                className="object-cover"
              />
            </button>
          ))}

          <div className="space-y-4">
            <div className="flex gap-7">
              {/* Book Name */}
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Book Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Book Name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Author Name */}
              <Controller
                name="author"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Author</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Author Name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="flex gap-7">
              {/* Language */}
              <Controller
                name="language"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Language</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Language"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/*Book Category*/}
              <Controller
                name="category"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel htmlFor="form-rhf-select-language">
                        Category
                      </FieldLabel>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}>
                      <SelectTrigger
                        id="form-rhf-select-language"
                        aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fiction">Fiction</SelectItem>
                        <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                        <SelectItem value="science-fiction">
                          Science Fiction
                        </SelectItem>
                        <SelectItem value="mystery">Mystery</SelectItem>
                        <SelectItem value="thriller">Thriller</SelectItem>
                        <SelectItem value="romance">Romance</SelectItem>
                        <SelectItem value="horror">Horror</SelectItem>
                        <SelectItem value="historical-fiction">
                          Historical Fiction
                        </SelectItem>
                        <SelectItem value="literary-fiction">
                          Literary Fiction
                        </SelectItem>
                        <SelectItem value="young-adult">Young Adult</SelectItem>

                        <SelectItem value="biography">Biography</SelectItem>
                        <SelectItem value="autobiography">
                          Autobiography & Memoir
                        </SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="philosophy">Philosophy</SelectItem>
                        <SelectItem value="psychology">Psychology</SelectItem>
                        <SelectItem value="self-help">Self-Help</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="economics">Economics</SelectItem>
                        <SelectItem value="finance">
                          Finance & Investing
                        </SelectItem>
                        <SelectItem value="politics">Politics</SelectItem>
                        <SelectItem value="religion">
                          Religion & Spirituality
                        </SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="health">Health & Fitness</SelectItem>
                        <SelectItem value="cooking">Cooking & Food</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="art">Art & Photography</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="poetry">Poetry</SelectItem>
                        <SelectItem value="drama">Drama & Plays</SelectItem>
                        <SelectItem value="comics">
                          Comics & Graphic Novels
                        </SelectItem>
                        <SelectItem value="manga">Manga</SelectItem>
                        <SelectItem value="humor">Humor</SelectItem>
                        <SelectItem value="true-crime">True Crime</SelectItem>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="classics">Classics</SelectItem>
                        <SelectItem value="nature">
                          Nature & Environment
                        </SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="parenting">
                          Parenting & Family
                        </SelectItem>
                        <SelectItem value="law">Law</SelectItem>
                        <SelectItem value="medicine">Medicine</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="reference">Reference</SelectItem>
                        <SelectItem value="language-learning">
                          Language Learning
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>
            <div className="flex gap-7">
              {/* Book Page */}
              <Controller
                name="pages"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Pages</FieldLabel>
                    <Input
                      {...field}
                      value={(field.value as number | string) ?? ""}
                      id={field.name}
                      type="number"
                      min={1}
                      aria-invalid={fieldState.invalid}
                      placeholder="Total pages"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Book Price*/}
              <Controller
                name="price"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                    <Input
                      {...field}
                      value={(field.value as number | string) ?? ""}
                      id={field.name}
                      type="number"
                      min={0}
                      step="0.01"
                      aria-invalid={fieldState.invalid}
                      placeholder="Price"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
        </div>

        {/* ISBN Number */}
        <Controller
          name="isbn"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>ISBN</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                inputMode="numeric"
                maxLength={13}
                aria-invalid={fieldState.invalid}
                placeholder="13 digit ISBN"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Published Year */}
        <Controller
          name="publishedYear"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Published Year</FieldLabel>
              <Input
                {...field}
                value={(field.value as number | string) ?? ""}
                id={field.name}
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="e.g. 2020"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* About Book */}
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              className="sm:col-span-2"
              data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                rows={4}
                aria-invalid={fieldState.invalid}
                placeholder="Write about the book"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>
      <CardFooter>
        <Button
          type="submit"

          className="w-full sm:col-span-2"
          size="lg"
          disabled={isSubmitting || !isFile}>
          {isLoading ?
            <>
              <Loader2Icon className="animate-spin" /> Creating Book...
            </>
          : <>
              <BookPlusIcon /> Create Book
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default CreateBook;
