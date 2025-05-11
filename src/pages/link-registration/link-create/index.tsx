import Button from "../../../components/button";
import Input from "../../../components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkSchema, type LinkFormData } from "./schemas/create-schema";
import { useForm } from "react-hook-form";

export default function LinkCreate() {
    const { handleSubmit, register, formState: { isSubmitting, errors } } = useForm({ resolver: zodResolver(linkSchema), mode: 'onChange', shouldFocusError: true })


    const onSubmit = (data: LinkFormData) => {
        console.log('Dados do formulário:', data)
    }

    const domain = window.location.host + '/';


    return (
        <div className="flex flex-col px-5 py-10 bg-white rounded-lg gap-5 h-min flex-auto  shadow-md lg:max-w-md min-[500px]:px-10">
            <h2>Novo Link</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <Input
                    id="originalUrl"
                    {...register('originalUrl')}
                    error={errors.originalUrl?.message}
                    label="LINK ORIGINAL"
                    placeholder="https://www.example.com"
                />
                <Input
                    id="shortUrl"
                    {...register('shortUrl')}
                    error={errors.shortUrl?.message}
                    label="LINK ENCURTADO"
                    placeholder="abc123"
                    prefix={domain}

                />
                <Button type="submit" loading={isSubmitting}>Salvar link</Button>
            </form>
        </div>
    )
}