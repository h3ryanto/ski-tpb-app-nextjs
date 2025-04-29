import React from "react";
import { Button } from "@/components/ui/button";
import { Key, Mail, User } from "lucide-react";
import { z } from 'zod'
import bcrypt from 'bcryptjs';
import { createUser } from "@/lib/database/neon_postgresSql/user";
import { useToast } from "@/hooks/use-toast";

interface AppAddUsersProps {
  onUserAdded: () => void; // Callback function to reload data
}

export function AppAddUsers({ onUserAdded }: AppAddUsersProps) {
  const [open, setOpen] = React.useState(false);
  const [massageMatch, setMassageMatch] = React.useState<string>("");
  const { toast } = useToast()
  const formRef = React.useRef<HTMLFormElement>(null); // Tambahkan ref untuk form

  const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    password_confirmation: z.string().min(6),
  });

  const formAction = async (formData: FormData) => {
    // const message = formData.get('nama') as string

    const validatedFields = schema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation'),
    })

    if (!validatedFields.success) {
      displayValidationErrors(validatedFields.error);
    } else {
      const res = await createUser(validatedFields.data.email, validatedFields.data.name, bcrypt.hashSync(validatedFields.data.password)) as { message: string };
      if (res.message === "success") {
        onUserAdded();
        setMassageMatch("");
        if (formRef.current) {
          formRef.current.reset();
        }
        setOpen(!open);
        toast({
          title: "Tambah User Berhasil",
          description: "User Berhasil Ditambahkan",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Gagal Tambah User",
          description: "User Gagal Ditambahkan",
        })
      }

    }

  }

  const displayValidationErrors = (errors: z.ZodError) => {
    errors.errors.forEach((error) => {
      const field = document.getElementById(String(error.path[0])) as HTMLInputElement | null;
      if (field) {
        const errorSpan = document.createElement("span");
        errorSpan.className = "text-sm italic text-red-500";
        errorSpan.textContent = error.message;

        // Remove existing error message if present
        const existingError = field.parentElement?.querySelector(".text-red-500");
        if (existingError) {
          existingError.remove();
        }

        // Append the error message
        field.parentElement?.appendChild(errorSpan);
      }
    });
  };

  const clearValidationError = (fieldId: string) => {
    const field = document.getElementById(fieldId) as HTMLInputElement | null;
    if (field) {
      const existingError = field.parentElement?.querySelector(".text-red-500");
      if (existingError) {
        existingError.remove();
      }
    }
  };


  const passwordMatch = (term: string) => {
    const password = document.getElementById('password') as HTMLInputElement;
    const passwordConfirmation = document.getElementById('password_confirmation') as HTMLInputElement;

    if (password.value !== passwordConfirmation.value && term) {
      setMassageMatch("Password tidak sama");

    } else {
      setMassageMatch("");
    }

  }

  return (
    <>
      {/* Triger */}
      <div>
        <Button
          size={"sm"}
          onClick={() => {
            if (formRef.current) {
              formRef.current.reset();
            }
            setOpen(!open);
          }}
        >
          Tambah User
        </Button>
      </div>

      {/* Modal */}
      <div className={` justify-center w-screen h-screen bg-black bg-opacity-40 fixed top-0 left-0 z-50 ${!open ? "hidden" : "flex"}`}>
        {/* Header */}
        <div className="flex flex-col gap-2 bg-white rounded-md w-2/6 h-fit mt-[5%]">
          <div className="flex items-center h-10 bg-white relative p-3 my-1 border-b border-gray-200">
            Tambah User
          </div>
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              formAction(new FormData(e.currentTarget));

            }}>
            {/* Content */}
            <div className="flex flex-col gap-2 items-center h-auto bg-white relative p-3 my-1 border-b border-gray-200">

              <div className='relative w-full'>
                <label className="block">
                  <User className='absolute pointer-events-none stroke-slate-500 m-1.5' />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Full Name"
                    className="block w-full rounded-md border-0 py-1.5 pl-9 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                    onInput={() => clearValidationError("name")}
                  />
                </label>
              </div>

              <div className='relative w-full'>
                <label className="block">
                  <Mail className='absolute pointer-events-none stroke-slate-500 m-1.5' />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Email"
                    className="block w-full rounded-md border-0 py-1.5 pl-9 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                    onInput={() => clearValidationError("email")}
                  />
                </label>
              </div>

              <div className='relative w-full'>
                <label className="block">
                  <Key className='absolute pointer-events-none stroke-slate-500 m-1.5' />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="password"
                    placeholder="Password"
                    className="block w-full rounded-md border-0 py-1.5 pl-9 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                    onInput={() => clearValidationError("password")}
                  />
                </label>
              </div>

              <div className='relative w-full'>
                <label className="block">
                  <Key className='absolute pointer-events-none stroke-slate-500 m-1.5' />
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    required
                    onKeyUp={(e) => passwordMatch(e.currentTarget.value)}
                    autoComplete="password_confirmation"
                    placeholder="Password Confirmation"
                    className="block w-full rounded-md border-0 py-1.5 pl-9 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                    onInput={() => clearValidationError("password_confirmation")}
                  />
                </label>
                <span className="text-sm italic text-red-500">
                  {massageMatch && massageMatch}
                </span>
              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-4 h-10 p-2 bg-white relative">
              <Button
                type="submit"
                size={"sm"}

              >
                Save
              </Button>
              <Button
                type="reset"
                size={"sm"}
                onClick={() => {
                  setMassageMatch("");
                  setOpen(!open);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div >

    </>
  );
}
