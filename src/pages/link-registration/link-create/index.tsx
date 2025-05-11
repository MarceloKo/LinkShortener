import Button from "../../../components/button";
import Input from "../../../components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkSchema, type LinkFormData } from "./create-schema";
import { useForm } from "react-hook-form";

export default function LinkCreate() {
    const { handleSubmit, register, formState: { isSubmitting, errors } } = useForm({ resolver: zodResolver(linkSchema), shouldFocusError: true })


    const onSubmit = (data: LinkFormData) => {
        console.log('Dados do formulário:', data)
    }

    return (
        <div className="flex flex-col px-5 py-10 bg-white rounded-lg gap-5 h-min flex-auto  shadow-md md:max-w-md min-[430px]:px-10">
            <h2>Novo Link</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <Input  {...register('originalUrl')} error={errors.originalUrl?.message} label="LINK ORIGINAL" placeholder="https://www.example.com" />
                <Input {...register('shortUrl')} error={errors.shortUrl?.message} label="LINK ENCURTADO" placeholder="https://short.url/abc123" />
                <Button type="submit" loading={isSubmitting}>Salvar link</Button>
            </form>
        </div>
    )
}