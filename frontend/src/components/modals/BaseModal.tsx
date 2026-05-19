import * as React from "react";
import { Dialog, DialogContent, DialogHeader,
         DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface BaseModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    description?: string
    children: React.ReactNode
}

export default function BaseModal({ isOpen, onClose, title, description, children }: BaseModalProps) {
    return (
        <Dialog open = {isOpen} onOpenChange = {onClose}>
            <DialogContent className = "sm:max-w-lg max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:m-3.5 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-500">
                <DialogHeader className = "-mb-4">
                    <DialogTitle className = "font-bold">{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                <div className = "mt-4">{children}</div>
            </DialogContent>
        </Dialog>
    )
}

