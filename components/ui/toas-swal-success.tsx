// components/DeleteButton.tsx
"use client";

import { Trash } from "lucide-react";
import Swal from "sweetalert2";

type Props = {
    message: string;
};

export default function AppSwalToasSuccess({ message }: Props) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: `${message}`
    });
}